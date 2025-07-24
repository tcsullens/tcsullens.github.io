---
layout: post
title: "Elasticsearch Operations Guide"
date: 2024-07-23
categories: elasticsearch search devops
---

# Elasticsearch Operations Guide

*Practical troubleshooting and maintenance guide for Elasticsearch clusters, developed through managing production search infrastructure and data platforms.*

## Quick Diagnostics

### Essential Health Checks

```bash
export ESHOST="http://localhost:9200"

# Cluster health overview
curl "$ESHOST/_cluster/health?pretty"

# Node status and resource usage
curl "$ESHOST/_cat/nodes?v&h=name,node.role,master,heap.percent,ram.percent,cpu,disk.used"

# Index health summary
curl "$ESHOST/_cat/indices?v&h=i,pri,rep,pri.store.size,store.size,health,status"
```

### The CAT APIs - Your Best Friend

**List all available CAT endpoints:**
```bash
curl "$ESHOST/_cat"
```

**Most useful CAT APIs for operations:**
```bash
# Shard allocation and status
curl "$ESHOST/_cat/shards?v"

# Master node identification
curl "$ESHOST/_cat/master?v"

# Detailed node information
curl "$ESHOST/_cat/nodes?help"  # Shows all available columns

# Custom node view with specific metrics
curl "$ESHOST/_cat/nodes?h=id,ip,port,heap.percent,ram.percent&s=heap.percent"
```

## Common Production Issues

### Red Cluster Status

**Symptoms:** Kibana shows red, some indices unavailable

**Diagnostic steps:**
```bash
# 1. Check overall cluster health
curl "$ESHOST/_cluster/health?pretty"

# 2. If unassigned_shards > 0, investigate specific shards
curl "$ESHOST/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason" | grep UNASSIGNED

# 3. Get detailed explanation for unassigned shards
curl "$ESHOST/_cluster/allocation/explain?pretty"
```

**Real-world example response:**
```json
{
  "index": "logstash-2024.01.15",
  "shard": 2,
  "primary": true,
  "current_state": "unassigned",
  "unassigned_info": {
    "reason": "NODE_LEFT",
    "at": "2024-01-15T10:30:00.000Z"
  },
  "can_allocate": "no",
  "allocate_explanation": "cannot allocate because allocation is disabled"
}
```

### High Memory Usage / OOM Issues

**Diagnostic commands:**
```bash
# Check heap usage across nodes
curl "$ESHOST/_cat/nodes?v&h=name,heap.percent,heap.current,heap.max,ram.percent"

# Check if field data cache is consuming memory
curl "$ESHOST/_nodes/stats/indices/fielddata?pretty"

# Check segment memory usage
curl "$ESHOST/_cat/segments?v&h=index,shard,segment,size,size.memory"
```

**Common causes and solutions:**

1. **Field data cache bloat** (often from text field aggregations):
   ```bash
   # Clear field data cache
   curl -X POST "$ESHOST/_cache/clear?fielddata=true"
   ```

2. **Too many segments** (insufficient merging):
   ```bash
   # Force merge indices (use carefully in production)
   curl -X POST "$ESHOST/old-index-*/_forcemerge?max_num_segments=1"
   ```

3. **Heap too small for workload** - Increase JVM heap size (recommended: 50% of available RAM, max 32GB)

### Slow Queries / High CPU

**Identify problematic queries:**
```bash
# Check currently running tasks
curl "$ESHOST/_tasks?pretty&detailed=true&actions=*search*"

# Get slow query logs (if enabled)
curl "$ESHOST/_nodes/stats/indices/search?pretty"
```

**Real production example - long-running search:**
```json
{
  "node_id": "ABC123",
  "type": "transport",
  "action": "indices:data/read/search",
  "description": "indices[large-index-*], types[], search_type[QUERY_THEN_FETCH]",
  "start_time_in_millis": 1642234567890,
  "running_time_in_nanos": 45000000000,
  "cancellable": true
}
```

**Cancel problematic queries:**
```bash
# Cancel specific task
curl -X POST "$ESHOST/_tasks/ABC123:12345/_cancel"

# Cancel all search tasks on specific node
curl -X POST "$ESHOST/_tasks/_cancel?nodes=ABC123&actions=*search*"
```

## Cluster Maintenance

### Planned Maintenance Workflow

**Before node maintenance:**
```bash
# 1. Disable shard allocation (prevents rebalancing during restarts)
curl -X PUT "$ESHOST/_cluster/settings" -H 'Content-Type: application/json' -d '{
  "persistent": {
    "cluster.routing.allocation.enable": "primaries"
  }
}'

# 2. Perform synced flush
curl -X POST "$ESHOST/_flush/synced"
```

**After maintenance:**
```bash
# Re-enable shard allocation
curl -X PUT "$ESHOST/_cluster/settings" -H 'Content-Type: application/json' -d '{
  "persistent": {
    "cluster.routing.allocation.enable": "all"
  }
}'
```

### Index Management

**Common index operations:**
```bash
# Check index settings
curl "$ESHOST/my-index/_settings?pretty"

# Update replica count (common for cost optimization)
curl -X PUT "$ESHOST/my-index/_settings" -H 'Content-Type: application/json' -d '{
  "index": {
    "number_of_replicas": 1
  }
}'

# Close index to save resources (makes it read-only)
curl -X POST "$ESHOST/old-index/_close"

# Reopen closed index
curl -X POST "$ESHOST/old-index/_open"

# Delete old indices (use with extreme caution)
curl -X DELETE "$ESHOST/old-index-2023.*"
```

**Real-world index lifecycle example:**
```bash
# Daily log indices pattern I've used in production
# Keep current day + 7 days with 1 replica
# Keep next 23 days with 0 replicas  
# Delete after 30 days

# Reduce replicas for indices older than 7 days
curl -X PUT "$ESHOST/logstash-2024.01.*/_settings" -H 'Content-Type: application/json' -d '{
  "index": {"number_of_replicas": 0}
}'
```

## Performance Optimization

### Shard Recovery Speed

**When cluster is rebalancing slowly:**
```bash
# Check current recovery settings
curl "$ESHOST/_cluster/settings?include_defaults=true&pretty" | grep recovery

# Temporarily increase recovery speed (use cautiously)
curl -X PUT "$ESHOST/_cluster/settings" -H 'Content-Type: application/json' -d '{
  "transient": {
    "cluster.routing.allocation.node_concurrent_recoveries": 6,
    "indices.recovery.max_bytes_per_sec": "200mb"
  }
}'

# Monitor recovery progress
curl "$ESHOST/_cat/recovery?v&h=index,shard,time,type,stage,source_node,target_node,bytes_percent"
```

**Reset to defaults after recovery:**
```bash
curl -X PUT "$ESHOST/_cluster/settings" -H 'Content-Type: application/json' -d '{
  "transient": {
    "cluster.routing.allocation.node_concurrent_recoveries": null,
    "indices.recovery.max_bytes_per_sec": null
  }
}'
```

### Search Performance Tuning

**Common optimizations I've implemented:**

1. **Use filters instead of queries when possible** (cached and faster):
   ```json
   {
     "query": {
       "bool": {
         "filter": [
           {"term": {"status": "active"}},
           {"range": {"timestamp": {"gte": "now-1d"}}}
         ]
       }
     }
   }
   ```

2. **Limit result size and use search_after for pagination**:
   ```json
   {
     "size": 100,
     "sort": [{"timestamp": "desc"}],
     "search_after": [1642234567890]
   }
   ```

3. **Use index patterns with date-based routing**:
   ```bash
   # Search only today's index instead of all indices
   curl "$ESHOST/logs-2024.01.15/_search" # Good
   curl "$ESHOST/logs-*/_search"          # Avoid for time-range queries
   ```

## Monitoring & Alerting

### Key Metrics to Monitor

**Cluster-level metrics:**
- Cluster status (green/yellow/red)
- Number of unassigned shards
- Search latency (95th percentile)
- Indexing rate and latency

**Node-level metrics:**
- Heap usage (alert at 85%)
- CPU usage (sustained >80%)
- Disk usage (alert at 80%)
- GC frequency and duration

**Useful monitoring queries:**
```bash
# Get search performance stats
curl "$ESHOST/_nodes/stats/indices/search?pretty" | jq '.nodes[].indices.search'

# Get indexing performance stats  
curl "$ESHOST/_nodes/stats/indices/indexing?pretty" | jq '.nodes[].indices.indexing'

# Check JVM garbage collection stats
curl "$ESHOST/_nodes/stats/jvm?pretty" | jq '.nodes[].jvm.gc'
```

## Emergency Procedures

### Force Shard Allocation

**When automatic allocation fails:**
```bash
# Move specific shard to a node
curl -X POST "$ESHOST/_cluster/reroute" -H 'Content-Type: application/json' -d '{
  "commands": [{
    "move": {
      "index": "problematic-index",
      "shard": 0,
      "from_node": "node-1",
      "to_node": "node-2"
    }
  }]
}'

# Allocate unassigned replica
curl -X POST "$ESHOST/_cluster/reroute" -H 'Content-Type: application/json' -d '{
  "commands": [{
    "allocate_replica": {
      "index": "my-index",
      "shard": 1,
      "node": "node-3"
    }
  }]
}'
```

### Split-Brain Recovery

**When cluster has split-brain (multiple masters):**
```bash
# Identify all master-eligible nodes
curl "$ESHOST/_cat/nodes?h=name,master,node.role"

# Check discovery settings
curl "$ESHOST/_cluster/settings?pretty" | grep discovery

# May need to restart nodes with proper discovery.seed_hosts configuration
```

## Useful Scripts and Aliases

**Bash aliases I use daily:**
```bash
# Add to ~/.bashrc or ~/.zshrc
alias es-health='curl -s $ESHOST/_cluster/health | jq .'
alias es-nodes='curl -s "$ESHOST/_cat/nodes?v&h=name,heap.percent,ram.percent,cpu,load_1m"'
alias es-indices='curl -s "$ESHOST/_cat/indices?v&h=index,health,status,pri,rep,store.size" | sort'
alias es-shards='curl -s "$ESHOST/_cat/shards?v" | grep -E "(UNASSIGNED|RELOCATING|INITIALIZING)"'
```

**Quick health check script:**
```bash
#!/bin/bash
# es-check.sh - Quick cluster health overview

ESHOST=${ESHOST:-"http://localhost:9200"}

echo "=== Cluster Health ==="
curl -s "$ESHOST/_cluster/health?pretty" | jq '{status, number_of_nodes, active_primary_shards, unassigned_shards}'

echo -e "\n=== Node Resource Usage ==="
curl -s "$ESHOST/_cat/nodes?h=name,heap.percent,ram.percent,cpu&format=json" | jq -r '.[] | "\(.name): Heap \(.["heap.percent"])%, RAM \(.["ram.percent"])%, CPU \(.cpu)"'

echo -e "\n=== Problematic Shards ==="
curl -s "$ESHOST/_cat/shards?format=json" | jq -r '.[] | select(.state != "STARTED") | "\(.index) shard \(.shard) (\(.prirep)): \(.state)"'
```

## References

- [Elasticsearch Official Documentation](https://www.elastic.co/guide/en/elasticsearch/reference/current/)
- [Datadog's Guide to Elasticsearch Unassigned Shards](https://www.datadoghq.com/blog/elasticsearch-unassigned-shards/)
- [Elastic's Performance Tuning Guide](https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-search-speed.html)

---

*This guide is based on managing Elasticsearch clusters at FiscalNote and Axios, handling everything from daily operations to emergency recovery scenarios. The focus is on practical, production-tested solutions.*

**Last updated**: July 2024