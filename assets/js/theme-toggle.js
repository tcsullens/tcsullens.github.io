/**
 * Dark mode toggle functionality
 * Saves theme preference to localStorage and applies it on page load
 */

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);
});

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  
  // Update toggle button
  const toggleButton = document.querySelector('.theme-toggle');
  const themeIcon = toggleButton?.querySelector('.theme-icon');
  const themeText = toggleButton?.querySelector('.theme-text');
  
  if (theme === 'dark') {
    if (themeIcon) themeIcon.textContent = '☀️';
    if (themeText) themeText.textContent = 'Light';
    toggleButton?.setAttribute('aria-label', 'Switch to light mode');
  } else {
    if (themeIcon) themeIcon.textContent = '🌙';
    if (themeText) themeText.textContent = 'Dark';
    toggleButton?.setAttribute('aria-label', 'Switch to dark mode');
  }
}

// Respect system preference if no saved preference exists
function initializeTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (!savedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  } else {
    setTheme(savedTheme);
  }
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
  if (!localStorage.getItem('theme')) {
    setTheme(e.matches ? 'dark' : 'light');
  }
});

// Initialize theme immediately to prevent flash
initializeTheme();