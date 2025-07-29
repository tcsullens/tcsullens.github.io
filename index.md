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
      <span class="prompt">tcsullens@portfolio:~$</span> <span class="command">mdcat readme.md</span>
    </div>
    <div class="output markdown-output">
      <h1>About</h1>
      
      <p>Senior Platform Engineer @ <strong>Wrapbook</strong><br>
      9+ years experience DevOps/Infra/Platform Engineering; based in Washington, DC</p>
      
      <p><a href="mailto:tcsullens@gmail.com">gmail</a> | <a href="https://github.com/tcsullens" target="_blank">github</a> | <a href="https://linkedin.com/in/tyler-sullens" target="_blank">linkedin</a></p>
      
      <h2>Experience</h2>
      
      <p>I've worked across a variety of organizations and technologies, primarily focused on building, managing, and scaling web applications.</p>
      
      <p>My experience ranges from managing physical servers to migrating and building on AWS and later Kubernetes, supporting developer tooling and infrastructure for large-scale engineering teams, evolving CI/CD systems from Jenkins+Bash to complex pipelines in multiple CI/CD platforms, and optimizing cost, performance and scalability of web applications.</p>

      <p>Check out resume for more details on my experience and expertise; browse the rest of the site for bits of content I've scribbled down over the years.</p>
      <br>
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
        <span class="date">Jul 28 21:02</span>
        <span class="name current">.</span>
      </div>
      <div class="directory-item" data-url="/" data-type="current">
        <span class="permissions">-rw-r--r--</span>
        <span class="links">1</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">945</span>
        <span class="date">Jul 28 21:03</span>
        <span class="name current">readme.md</span>
      </div>
      <div class="directory-item" data-url="/resume/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">2</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Jul 28 21:08</span>
        <span class="name">resume/</span>
      </div>
      <div class="directory-item" data-url="/writing/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">3</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Jul 28 21:19</span>
        <span class="name">writing/</span>
      </div>
      <div class="directory-item" data-url="/technical/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">4</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Jul 28 21:19</span>
        <span class="name">technical/</span>
      </div>
      <div class="directory-item" data-url="/resources/" data-type="directory">
        <span class="permissions">drwxr-xr-x</span>
        <span class="links">2</span>
        <span class="owner">tcsullens</span>
        <span class="group">staff</span>
        <span class="size">4096</span>
        <span class="date">Jul 28 21:19</span>
        <span class="name">resources/</span>
      </div>
    </div>
    
    <div class="terminal-line current-line">
      <span class="prompt">tcsullens@portfolio:~$</span> <span class="command-input">cd <span id="selected-directory">resume/</span></span><span class="cursor-line">_</span>
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
  const selectedDirectorySpan = document.getElementById('selected-directory');
  let selectedIndex = 0;
  
  // Add selection highlighting and update current directory display
  function updateSelection() {
    directoryItems.forEach((item, index) => {
      item.classList.toggle('selected', index === selectedIndex);
    });
    
    // Update the directory name in the current terminal line
    if (directoryItems[selectedIndex]) {
      const dirName = directoryItems[selectedIndex].querySelector('.name').textContent;
      selectedDirectorySpan.textContent = dirName;
    }
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
