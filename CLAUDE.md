# Claude Development Context

This file provides context and preferences for AI assistants working on this Jekyll-powered personal website.

## Project Overview

Jekyll site for Tyler Sullens showcasing technical expertise, engineering leadership insights, and curated resources. Built for GitHub Pages deployment with terminal-inspired theme and interactive homepage.

## Technology Stack

- **Jekyll 4.3+** - Static site generator
- **Ruby 3.2** - Managed by mise
- **Minima theme** - Base theme with extensive terminal-style customizations
- **Sass/SCSS** - For styling with CSS custom properties and terminal color scheme
- **JavaScript** - Vanilla JS for interactive terminal homepage navigation
- **GitHub Pages** - Deployment platform

## Site Structure

```
├── _config.yml           # Jekyll configuration
├── _layouts/
│   ├── default.html      # Base layout with header/footer
│   ├── fullscreen.html   # Fullscreen terminal layout for homepage
│   ├── page.html         # Static page layout
│   └── post.html         # Blog post layout
├── _includes/
│   ├── head.html         # HTML head with SEO and stylesheet links
│   ├── header.html       # Custom header with terminal-style navigation
│   └── footer.html       # Site footer
├── _sass/
│   └── custom.scss       # Custom SCSS styling with dark mode
├── _notes/               # Blog posts about leadership & communication
├── _technical/           # Technical documentation and guides
├── assets/
│   ├── js/
│   └── js/               # JavaScript assets (if any)
│   └── main.scss         # Main stylesheet
├── notes/                # Notes section index with dynamic post listing
├── technical/            # Technical section index
├── index.md              # Homepage
├── resume.md             # Resume page
├── resources.md          # Curated resources
└── CLAUDE.md             # This file
```

## Development Preferences

### Code Style
- **No comments** in code unless specifically requested
- **Terminal aesthetic** - Dark theme with terminal-inspired styling
- **Responsive design** - Mobile-first approach with terminal adaptations
- **Accessibility** - Proper ARIA labels, semantic HTML, keyboard navigation
- **Performance** - Optimized loading, minimal JavaScript

### Content Guidelines
- **Technical accuracy** - All code examples should be production-ready
- **Real-world focus** - Examples based on actual experience, not theoretical
- **Professional tone** - Suitable for potential employers and collaborators
- **Concise writing** - Clear, direct communication

### Terminal Theme Implementation
- Fixed dark terminal theme (no light mode toggle)
- Uses CSS custom properties for consistent theming
- Terminal-style colors and typography (Verdana font)
- Interactive homepage with keyboard navigation
- Smooth transitions (0.3s ease) for UI elements

## Common Commands

```bash
# Local development
mise install                    # Install Ruby via mise
bundle install                  # Install dependencies
bundle exec jekyll serve        # Serve locally with live reload
bundle exec jekyll build        # Build site

# Testing
bundle exec jekyll build        # Verify build works
bundle exec jekyll serve --host 0.0.0.0  # Test on network
```

## Content Organization

### Notes Section
- **Leadership** - Engineering team management philosophy
- **Communication** - Technical team communication practices
- **Dynamic listing** - Automatically generates post index from _notes collection

### Technical Section  
- **Git** - Comprehensive workflows and commands with real examples
- **Elasticsearch** - Operations and troubleshooting guide

### Resources
- **Technical** - Infrastructure, data engineering, systems design articles
- **Engineering Process** - Code review, documentation, technical changes
- **Leadership & Management** - Technical leadership resources
- **Communication** - Team building and collaboration resources

## Styling Notes

### CSS Architecture
- CSS custom properties for terminal theming (`--bg-color`, `--text-color`, `--terminal-*`, etc.)
- Comprehensive variable system for typography and spacing
- Mobile-first responsive design with terminal adaptations
- Consolidated CSS with eliminated duplications
- Smooth transitions for better UX

### Terminal Color Scheme
```scss
// Terminal theme (fixed dark)
--bg-color: #1e1e1e
--bg-secondary: #2d2d2d
--text-color: #d4d4d4
--text-secondary: #8e8e93
--terminal-prompt: #4ec9b0
--terminal-command: #569cd6
--terminal-name: #ffbc4b
--terminal-highlight: #4fc1ff
```

## Deployment

- **Automatic deployment** via GitHub Pages on push to `main`
- **Build warnings** about Sass deprecations are expected (from minima theme)
- **GitHub Pages compatible** - no custom plugins required

## Git Workflow

- Clean, descriptive commit messages
- Squash related changes when appropriate
- Include "Generated with Claude Code" attribution when applicable

## File Naming Conventions

- **Markdown files** - lowercase with hyphens (`git-workflows.md`)
- **SCSS files** - descriptive names (`custom.scss`)
- **JavaScript files** - kebab-case (`theme-toggle.js`)
- **Images/assets** - descriptive, web-optimized names

## Quality Standards

- All pages should render correctly with terminal theme
- Interactive homepage should support both keyboard and mouse navigation
- Mobile responsiveness is essential with adapted terminal styling
- Fast loading times - minimize external dependencies
- Clean, semantic HTML structure
- Professional appearance suitable for career purposes

## AI Assistant Guidelines

When working on this project:

1. **Test builds** with `bundle exec jekyll build` before major changes
2. **Maintain existing structure** - don't restructure without explicit request
3. **Use existing patterns** - follow established CSS and content organization
4. **Focus on functionality** - prioritize working features over extensive documentation
5. **Preserve professional tone** - this is a career-focused website

## Known Issues & Considerations

- Sass deprecation warnings from minima theme (cosmetic, doesn't affect functionality)
- Interactive homepage requires JavaScript enabled for keyboard navigation
- GitHub Pages has limited plugin support (stick to supported gems)
- Terminal theme is fixed dark - no light mode available

---

*This file helps maintain consistency and context for future development work on the site.*
