---
layout: fullscreen
---

<div class="interactive-terminal">
  <div class="terminal-header">
    <div class="terminal-buttons">
      <div class="terminal-button close"></div>
      <div class="terminal-button minimize"></div>
      <div class="terminal-button maximize"></div>
    </div>
    <div class="terminal-title">tcsullens@portfolio:~$ — zsh — 120×30</div>
  </div>
  <div class="terminal-session">
    
    <div class="terminal-line">
      <span class="prompt">tcsullens@portfolio:~$</span> <span class="command">cat readme.md</span>
    </div>
    <div class="output">
      <p># About Me<br>
      <br>
      Senior Platform Engineer @ Wrapbook<br>
      9+ years experience DevOps/Infra/Platform Engineeering, based in Washington, DC<br>
      <br>
      [gmail](<a href="mailto:tcsullens@gmail.com">mailto:tcsullens@gmail.com</a>) | [github](<a href="https://github.com/tcsullens" target="_blank">https://github.com/tcsullens</a>) | [linkedin](<a href="https://linkedin.com/in/tyler-sullens" target="_blank">https://linkedin.com/in/tyler-sullens</a>)<br>
      <br>
      ## Experience<br>
      <br>
      I've worked across a variety of organizations and technologies, primarily focused on building, managing, and scaling web applications.<br>  
      My experience ranges from managing physical servers to migrating and building on AWS and later Kubernetes, supporting developer tooling and infrastructure for large-scale engineering teams, evolving CI/CD systems from Jenkins+Bash to complex pipelines in multiple CI/CD platforms, and optimizing cost, performance and scalability of web applications.<br>
      <br>
      ## Tech<br>
      Infrastructure: AWS, Kubernetes, Docker, Terraform, Networking, CDNs, CI/CD<br>
      Data Platform: Redshift, Airflow, DBT, Looker<br>
      Programming: Python, Go, Node.js, Ruby, Bash<br>
      O11y: Prometheus, Grafana, DataDog, OpenTelemetry<br>
      <br>
      See my full [resume](./resume.md) for more details.<br>
      </p>
    </div>
    
    <div class="terminal-line">
      <span class="prompt">tcsullens@portfolio:~$</span> <span class="command">ls -la</span>
    </div>
    <div class="output directory-listing">
      <div class="listing-header">total 6</div>
      <div class="directory-item" data-url="/" data-type="current">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">2</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Nov 28 10:30</span>
        <span class="name current">.</span>
      </div>
      <div class="directory-item" data-url="/" data-type="file">
        <span class="permissions">drw-r-xr-x</span>
        <span class="links">1</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">3945</span>
        <span class="date">Nov 28 10:30</span>
        <span class="name current">readme.md</span>
      </div>
      <div class="directory-item" data-url="/resume/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">2</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Nov 28 10:25</span>
        <span class="name">resume/</span>
      </div>
      <div class="directory-item" data-url="/writing/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">3</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Nov 28 10:20</span>
        <span class="name">writing/</span>
      </div>
      <div class="directory-item" data-url="/technical/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">4</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Nov 28 10:15</span>
        <span class="name">technical/</span>
      </div>
      <div class="directory-item" data-url="/resources/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">2</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Nov 28 10:10</span>
        <span class="name">resources/</span>
      </div>
    </div>
    
    <div class="terminal-line current-line">
      <span class="prompt">tcsullens@portfolio:~$</span> <span class="cursor-line">_</span>
    </div>
    
    <div class="help-text">
      <div class="help-line">Use ↑↓ arrow keys to navigate directories, press Enter to open</div>
      <div class="help-line">Or click on any directory name to navigate</div>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  const directoryItems = document.querySelectorAll('.directory-item[data-type="directory"]');
  let selectedIndex = 0;
  
  // Add selection highlighting
  function updateSelection() {
    directoryItems.forEach((item, index) => {
      item.classList.toggle('selected', index === selectedIndex);
    });
  }
  
  // Initialize selection
  updateSelection();
  
  // Navigate to selected directory
  function navigateToSelected() {
    if (directoryItems[selectedIndex]) {
      const url = directoryItems[selectedIndex].getAttribute('data-url');
      window.location.href = url;
    }
  }
  
  // Keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'j') {
      e.preventDefault();
      selectedIndex = (selectedIndex + 1) % directoryItems.length;
      updateSelection();
    } else if (e.key === 'ArrowUp' || e.key === 'k') {
      e.preventDefault();
      selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : directoryItems.length - 1;
      updateSelection();
    } else if (e.key === 'Enter') {
      e.preventDefault();
      navigateToSelected();
    }
  });
  
  // Click navigation
  directoryItems.forEach((item, index) => {
    item.addEventListener('click', function() {
      selectedIndex = index;
      updateSelection();
      navigateToSelected();
    });
  });
});
</script>
