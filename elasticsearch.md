# This page covers some basic Elasticsearch troubleshooting steps. 

## The Elasticsearch CAT APIs

The _cat APIs available on the cluster are extremely useful in inspecting the “state” of the cluster: nodes, indices, shards, tasks, etc.These APIs will be used in any troubleshooting or information gathering exercise. I’m pointing out a few useful endpoints here to get started.

#### List the available _cat APIs

```
export ESHOST="http://localhost:9200"
curl $ESHOST/_cat?
=^.^=
/_cat/allocation
/_cat/shards
/_cat/shards/{index}
/_cat/master
/_cat/nodes
...
```
#### _cat API Columns

This is helpful to show the the available columns that you can specify with h= when calling a of the _cat APIs.
```
GET _cat/${API}?help

GET _cat/nodes?help
id                           | id,nodeId                      | unique node id                                                                                                   
pid                          | p                              | process id                                                                                                       
ip                           | i                              | ip address                                                                                                       
port                         | po                             | bound transport port      
...

GET _cat/nodes?h=id,ip,port&s=id
```
https://feryn.eu/blog/the-elasticsearch-cat-apis/

#### Cluster/Kibana Showing RED

Generally we can inspect/troubleshoot the cluster via the ES API. It’s probably that with our infrastructure setup you’ll have to run these commands from a node in the cluster i.e. SSH in and curl against the local node. If Kibana is operational you can use the Kibana dev tools feature to run these API commands.

##### Check the Cluster Health
```
export ESHOST="http://localhost:9200"
curl $ESHOST/_cluster/health?pretty=true
{
  "cluster_name" : "esevents-dev",
  "status" : "green",
  "timed_out" : false,
  "number_of_nodes" : 5,
  "number_of_data_nodes" : 2,
  "active_primary_shards" : 1841,
  "active_shards" : 3682,
  "relocating_shards" : 0,
  "initializing_shards" : 0,
  "unassigned_shards" : 0,
  "delayed_unassigned_shards" : 0,
  "number_of_pending_tasks" : 0,
  "number_of_in_flight_fetch" : 0,
  "task_max_waiting_in_queue_millis" : 0,
  "active_shards_percent_as_number" : 100.0
}
```
If the status is showing red, then it could be because of unassigned_shards. This could happen if a node has gone down or after a node restart. Usually you just need to let the cluster re-balance and be on it’s way.

##### Check the Cluster Nodes

If unassigned_shards is 0, then the cluster might have a different issue - typically I will also look at the nodes endpoint:
```
curl "$ESHOST/_cat/nodes?v&h=name,node.role,master,heap.percent,ram.percent,cpu,disk.used"
name                                 node.role master heap.percent ram.percent cpu disk.used
fn-esevents-data-d02-elasticsearch   di        -                97          98  67   389.9gb
fn-esevents-client-d01-elasticsearch mi        -                65          92   0     7.2gb
fn-esevents-master-d02-elasticsearch mi        -                15          91   0     2.6gb
fn-esevents-data-d01-elasticsearch   di        -                98          97  56   389.9gb
fn-esevents-master-d01-elasticsearch mi        *                45          89   0       3gb
```
This may take a little while to return, but it should return eventually. If it doesn’t, i.e. it times out, then there’s probably an issue with one or more nodes not responding within the cluster. If a node is down generally the cluster is aware of it, however there are situations where a node is able to respond to certain cluster requests (e.g. a heartbeat) and not others, and this could be that situation. Most of the time here you have to try to find the node that is unresponsive and restart Elasticsearch on it. Look for nodes that are using a lot of system memory and/or CPU and start there first. Never restart more than one node at a time (unless you really know what you are doing ), and make sure each node has fully come back online in the cluster before moving on. 

You can utilize the maintenance suggestions here as well.

##### Check Index/Shard Health

Sometimes we can have unassigned shards that are causing the cluster to be red:
```
curl -s -XGET "$ESHOST/_cat/shards?v&h=index,shard,prirep,state,unassigned.reason"
webapp-filebeat-6.6.2-2019.12.21   3     r      STARTED
webapp-filebeat-6.6.2-2019.12.21   3     p      STARTED
webapp-filebeat-6.6.2-2019.12.21   1     r      STARTED
webapp-filebeat-6.6.2-2019.12.21   1     p      STARTED
webapp-filebeat-6.6.2-2019.12.21   4     p      STARTED
webapp-filebeat-6.6.2-2019.12.21   4     r      STARTED
webapp-filebeat-6.6.2-2019.12.21   2     p      STARTED
webapp-filebeat-6.6.2-2019.12.21   2     r      STARTED
webapp-filebeat-6.6.2-2019.12.21   0     r      STARTED
webapp-filebeat-6.6.2-2019.12.21   0     p      STARTED
...
```

If there are unassigned shards, we can use the Allocation Explain API to get more information as to why:

```
curl -s -XGET "$ESHOST/_cluster/allocation/explain?pretty"
```
https://www.datadoghq.com/blog/elasticsearch-unassigned-shards/ has some more detailed information on unassigned shards.

## General Cluster Info

```
GET _cat/indices?v&h=i,pri,rep,pri.store.size,store.size,health,status
```

```
GET ${INDEX}/_settings
```

Update index replicas

```
PUT ${INDEX}/_settings
{
  "index" : {
    "number_of_replicas" : 2
  }
}
```

## Cluster Performance

Suppose the cluster is running with high CPU usage/load, or response times are up, etc. The _tasks API can give us insight to what’s going on:
```
curl -s -XGET "$ESHOST/_tasks?pretty"
```

The above will give us the total overview of all running and pending tasks on the cluster. Things like searches, index writes, shard allocations, etc are listed here, grouped by node.We can filter/limit our response by node or task type:

```
curl -s -XGET "$ESHOST/_tasks?nodes=nodeId_1,nodeId_2"
curl -s -XGET "$ESHOST/_tasks?actions=*bulk"
curl -s -XGET "$ESHOST/_tasks?actions=*search"
```

Node Ids are not the node name. They’re a hash and look something like S_6ufvcORB2teQuIoiMw8w; they can be found in the _tasks API response and some other API responses.

Tasks can be canceled, by task id or even by type or node:
```
curl -s -XPOST "$ESHOST/_tasks/taskId/_cancel"
curl -s -XPOST "$ESHOST/_tasks/_cancel?nodes=nodeId_1,nodeId_2&actions=*reindex"
```

You should generally be careful playing with the _tasks API and use it primarily for getting insight into what’s happening across the cluster.

https://www.elastic.co/guide/en/elasticsearch/reference/current/tune-for-search-speed.html

## Maintenance

If we’re doing controlled maintenance on ES e.g. rolling node restarts, it’s a good idea to do a few things first: https://www.elastic.co/guide/en/elasticsearch/reference/current/rolling-upgrades.html: 

Disable cluster shard allocation:
```
curl -XPUT $ESHOST/_cluster/settings
{
  "persistent": {
    "cluster.routing.allocation.enable": "primaries"
  }
}
```
Don’t forget to re-enable when you’re done!

Viewing all fo the cluster settings can be done with:
```
curl -XGET $ESHOST/_cluster/settings?include_defaults=true
```

Flush:

```
curl -XPOST $ESHOST/_flush/synced
```

Re-Assigning Unassigned Shards

If we’ve resolved an underlying issue with why a shard(s) is unassigned, the shard may still be in a state where Elasticsearch is not actively trying to re-assign it due to too many previous attempts. We can get Elasticsearch to try to reassign the shard by
```
curl -XPOST $ESHOST/_cluster/reroute?retry_failed=true
```

This will attempt to re-assign the shard in a “nice” way.We can also force the shard to be reassigned, especially if we want to force it to a particular node:

```
POST /_cluster/reroute
{
  "commands" : [{
        "move" : {
            "index" : "test", 
            "shard" : 0,
            "from_node" : "node1", 
            "to_node" : "node2"
        }
    }]
}

- or -

POST /_cluster/reroute 
{
  "commands": [{
        "allocate_replica": {
            "index": "test",
            "shard": 1,
            "node": "node03",
        }
    }]
}

- or -

POST /_cluster/reroute 
{
  "commands": [{
        "allocate": {
            "index": "test",
            "shard": 2,
            "node": "node03",
        }
    }]
}
```

All examples of the cluster-reroute API.

Speeding Up Shard (Re-)Allocation

We can tweak some cluster settings to speed up recovery operations. The two primary settings would be node_concurrent_recoveries and recovery.max_bytes_per_sec. Be gradual and careful when upping these settings. Gradually increase each and pay attention to CPU, network, and disk i/o across the cluster as you increase them - you’re likely to find a bottleneck somewhere and you don’t want to cause more problems for yourself at this point.
```
PUT _cluster/settings
{
  "transient": {
    "cluster.routing.allocation.node_concurrent_recoveries": 6
  }
}
PUT _cluster/settings
{
  "transient": {
    "indices.recovery.max_bytes_per_sec": "120mb"
  }
}
```

Clear the transient settings:

```
PUT _cluster/settings
{
  "transient": {
    "cluster.routing.allocation.node_concurrent_recoveries": null
  }
}
PUT _cluster/settings
{
  "transient": {
    "indices.recovery.max_bytes_per_sec": null
  }
}
```

Check the docs for more information on these and additional settings.
