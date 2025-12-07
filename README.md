# Portfolio & Blog - Static Site Generator

A beautiful, vanilla JavaScript portfolio and blog site with no framework dependencies. Built with modern CSS and responsive design principles.

## Features

✨ **Core Features**
- Responsive home page with hero section
- Projects portfolio with tag filtering
- Blog system with markdown support
- Music player component with persistence
- Dark/light mode toggle
- Client-side search functionality
- SEO-optimized with meta tags
- Accessible markup and keyboard navigation
- Smooth animations and transitions

## Live Demo

Visit your site at: https://yourusername.github.io/portfolio

## Local Setup

### Quick Start

1. Clone the repository
\`\`\`bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
\`\`\`

2. Start a local server

**Using Python 3:**
\`\`\`bash
python -m http.server 8000
\`\`\`

**Using Python 2:**
\`\`\`bash
python -m SimpleHTTPServer 8000
\`\`\`

**Using Node.js (with npx):**
\`\`\`bash
npx serve
\`\`\`

Then open http://localhost:8000 in your browser.

3. Edit files and refresh to see changes

## File Structure

\`\`\`
portfolio/
├── index.html              # Home page
├── projects.html           # Projects gallery
├── blog.html               # Blog index
├── post.html               # Blog post template
├── assets/
│   ├── css/
│   │   └── styles.css      # All styling
│   ├── js/
│   │   ├── main.js         # Shared functionality
│   │   ├── projects.js     # Projects logic
│   │   ├── blog.js         # Blog logic
│   │   ├── post.js         # Single post logic
│   │   ├── music-player.js # Music player
│   │   └── markdown-parser.js # Markdown support
│   └── images/
├── data/
│   ├── projects.json       # Projects data
│   └── posts.json          # Blog posts data
├── README.md               # This file
├── LICENSE                 # MIT License
└── docs/                   # GitHub Pages deployment folder
\`\`\`

## How to Add a Blog Post

1. Open `data/posts.json`

2. Add a new post object:

\`\`\`json
{
  "id": 4,
  "slug": "my-new-post",
  "title": "My Awesome Post",
  "date": "2025-01-20",
  "author": "Your Name",
  "excerpt": "A short summary of your post",
  "tags": ["web-design", "tutorial"],
  "content": "# My Awesome Post\n\nYour markdown content here...\n\n## Section\n\nMore content...",
}
\`\`\`

3. The post will automatically appear on the blog index page

### Markdown Support

Use these markdown features in your posts:

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet list
1. Numbered list

> Blockquote

\`\`\`javascript
code block with syntax highlighting
\`\`\`

[Link text](https://example.com)

\`inline code\`
\`\`\`

## How to Add a Project

1. Open `data/projects.json`

2. Add a new project:

\`\`\`json
{
  "id": 4,
  "title": "Project Name",
  "description": "Short description",
  "longDescription": "Longer description for detail page",
  "image": "/path/to/image.jpg",
  "tags": ["React", "CSS"],
  "tech": ["React", "Node.js", "MongoDB"],
  "liveLink": "https://demo.com",
  "repoLink": "https://github.com/user/repo"
}
\`\`\`

3. Project will appear on projects page with filtering

## Music Player

The music player saves the current track and playback state to localStorage. Update tracks in `assets/js/music-player.js`:

\`\`\`javascript
tracks: [
  { 
    name: "Track Name", 
    artist: "Artist Name", 
    duration: 240,  // seconds
    file: "/path/to/audio.mp3" 
  },
  // Add more tracks
]
\`\`\`

## Customization

### Colors

Edit the CSS variables in `assets/css/styles.css`:

\`\`\`css
:root {
  --color-cream: #f5f1ed;
  --color-taupe: #8b7d6b;
  --color-sage: #7a9584;
  --color-accent: #d4a574;
  /* ... more colors */
}
\`\`\`

### Typography

Update font families in the `:root` selector:

\`\`\`css
--font-serif: "Georgia", serif;
--font-sans: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
\`\`\`

### Metadata

Update site metadata in each HTML file:
- `<title>` - Page title
- `<meta name="description">` - Page description
- `<meta property="og:*">` - Open Graph tags

## Dark Mode

Dark mode preference is automatically saved to localStorage. Users can toggle with the theme button in the navigation.

## Accessibility

This site includes:
- Semantic HTML structure
- ARIA labels and landmarks
- Keyboard navigation support
- Color contrast compliance
- Screen reader friendly content

## SEO

Each page includes:
- Unique meta titles and descriptions
- Open Graph tags for social sharing
- Canonical links
- Proper heading hierarchy
- Alt text for images

## Deployment to GitHub Pages

### Option A: Deploy from `/docs` folder

1. Ensure the site files are in the root directory

2. In your repo, go to **Settings → Pages**

3. Set **Source** to `main` branch and `/docs` folder

4. Commit and push:
\`\`\`bash
mkdir -p docs
cp -r index.html projects.html blog.html post.html assets data README.md LICENSE docs/
git add .
git commit -m "Deploy site to GitHub Pages"
git push origin main
\`\`\`

5. Your site will be live at: `https://yourusername.github.io/portfolio`

### Option B: Deploy from `gh-pages` branch

1. Create and switch to gh-pages branch:
\`\`\`bash
git checkout --orphan gh-pages
git rm -rf .
\`\`\`

2. Copy site files to root:
\`\`\`bash
cp index.html projects.html blog.html post.html /path/to/repo/
cp -r assets data /path/to/repo/
\`\`\`

3. Commit and push:
\`\`\`bash
git add .
git commit -m "Initial GitHub Pages deployment"
git push origin gh-pages
\`\`\`

4. In repo **Settings → Pages**, set source to `gh-pages` branch

5. Your site will be live at: `https://yourusername.github.io`

### Custom Domain (Optional)

1. Add a `CNAME` file to the root with your domain:
\`\`\`
example.com
\`\`\`

2. Update DNS settings at your domain registrar to point to GitHub Pages

3. Commit and push

For more info: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site

## Performance Tips

- Images use srcset for responsive loading
- Lazy loading on project images
- Minimal dependencies (vanilla JS)
- CSS is well-organized and efficient
- JavaScript is modular and lightweight

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

MIT License - See LICENSE file for details

## Tips & Best Practices

1. **Keep posts organized** - Use clear, descriptive slugs
2. **Update metadata** - Ensure each page has unique meta tags
3. **Test locally** - Always test on multiple devices
4. **Backup often** - Version control is your friend
5. **Monitor performance** - Use Lighthouse for audits

## Contributing

Feel free to fork and customize! Some ideas:

- Add more music tracks
- Create additional page templates
- Enhance markdown parser
- Add comments system
- Implement RSS feed
- Add search highlighting

## Troubleshooting

### Posts not showing
- Check JSON syntax in `data/posts.json`
- Ensure all required fields are present
- Check browser console for errors

### Styling issues
- Clear browser cache (Cmd+Shift+R or Ctrl+Shift+R)
- Check CSS file is loading (inspect network tab)
- Verify no conflicting styles

### Dark mode not working
- Check if localStorage is enabled
- Ensure JavaScript is loading
- Check browser console for errors

## Contact & Support

- GitHub Issues: https://github.com/yourusername/portfolio/issues
- Email: hello@example.com
- Twitter: @yourhandle

---

Built with ❤️ using vanilla HTML, CSS, and JavaScript.
\`\`\`

```text file="LICENSE"
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE OR CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
