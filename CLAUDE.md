# Claude Development Context

This file provides context and preferences for AI assistants working on this Jekyll-powered personal website.

## Project Overview

Jekyll site for Tyler Sullens showcasing technical expertise, engineering leadership insights, and curated resources. Built for GitHub Pages deployment with modern features including dark mode support.

## Technology Stack

- **Jekyll 4.3+** - Static site generator
- **Ruby 3.2** - Managed by mise
- **Minima theme** - Base theme with extensive customizations
- **Sass/SCSS** - For styling with CSS custom properties
- **JavaScript** - Vanilla JS for dark mode functionality
- **GitHub Pages** - Deployment platform

## Site Structure

```
├── _config.yml           # Jekyll configuration
├── _layouts/
│   ├── default.html      # Base layout with header/footer
│   ├── home.html         # Homepage layout
│   ├── page.html         # Static page layout
│   └── post.html         # Blog post layout
├── _includes/
│   └── header.html       # Custom header with dark mode toggle
├── _sass/
│   └── custom.scss       # Custom SCSS styling with dark mode
├── _writing/             # Blog posts about leadership & communication
├── _technical/           # Technical documentation and guides
├── assets/
│   ├── js/
│   │   └── theme-toggle.js  # Dark mode functionality
│   └── main.scss         # Main stylesheet
├── writing/              # Writing section index
├── technical/            # Technical section index
├── index.md              # Homepage
├── resume.md             # Resume page
├── resources.md          # Curated resources
└── CLAUDE.md             # This file
```

## Development Preferences

### Code Style
- **No comments** in code unless specifically requested
- **Professional, minimal aesthetic** - GitHub-inspired design
- **Responsive design** - Mobile-first approach
- **Accessibility** - Proper ARIA labels, semantic HTML
- **Performance** - Optimized loading, minimal JavaScript

### Content Guidelines
- **Technical accuracy** - All code examples should be production-ready
- **Real-world focus** - Examples based on actual experience, not theoretical
- **Professional tone** - Suitable for potential employers and collaborators
- **Concise writing** - Clear, direct communication

### Dark Mode Implementation
- Uses CSS custom properties for theming
- Respects system preference by default
- Saves user preference to localStorage
- Smooth transitions (0.3s ease)
- GitHub-inspired color scheme

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

### Writing Section
- **Leadership** - Engineering team management philosophy
- **Communication** - Technical team communication practices

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
- CSS custom properties for theming (`--bg-color`, `--text-color`, etc.)
- Mobile-first responsive design
- `!important` declarations used sparingly, mainly for theme overrides
- Smooth transitions for better UX

### Color Scheme
```scss
// Light mode
--bg-color: #ffffff
--text-color: #24292e  
--accent-color: #0366d6

// Dark mode  
--bg-color: #0d1117
--text-color: #c9d1d9
--accent-color: #58a6ff
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

- All pages should render correctly in both light and dark modes
- Mobile responsiveness is essential
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
- Dark mode requires JavaScript enabled (graceful degradation to light mode)
- GitHub Pages has limited plugin support (stick to supported gems)

---

*This file helps maintain consistency and context for future development work on the site.*
