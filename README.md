# John M24 Personal Blog

A simple, minimalist personal blog built with static HTML and automated Markdown conversion.

## Project Structure

john-m24.github.io/
├── markdown/ ← Your Markdown source files
│ ├── first-post.md
│ ├── learning-react.md
│ └── my-thoughts.md
├── blog/ ← Generated HTML files (auto-generated)
│ ├── first-post.html
│ ├── learning-react.html
│ └── my-thoughts.html
├── index.html ← Home page
├── blog.html ← Blog listing page (auto-generated)
├── build-blog.js ← Build script
├── package.json ← Dependencies
└── README.md ← This file

## Quick Start

### Prerequisites
- Node.js installed on your system
- Git for version control

### Setup
1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create your first blog post:**
   ```bash
   mkdir markdown
   touch markdown/my-first-post.md
   ```

3. **Build your blog:**
   ```bash
   node build-blog.js
   ```

4. **View locally:**
   - Open `index.html` in your browser
   - Or use Live Server in VS Code

## Writing Blog Posts

### Option 1: Simple Markdown (Recommended)
Create a file in the `markdown/` folder:

```markdown
# My Amazing Blog Post

This is the content of my blog post. You can use:

## Headings
- **Bold text**
- *Italic text*
- `Code snippets`

## Lists
1. Numbered lists
2. Work great
3. For step-by-step content

> Blockquotes are perfect for highlighting important points.

## Code Blocks
```javascript
function helloWorld() {
  console.log("Hello, World!");
}
```

The script will automatically:
- Extract the first heading as the title
- Use the current date
- Generate an excerpt
- Create the HTML file
```

### Option 2: With Frontmatter
For more control, add metadata at the top:

```markdown
---
title: My Custom Title
date: January 20, 2024
---

# My Amazing Blog Post

[Your content here...]
```

## Workflow: Google Docs → Blog Post

1. **Write in Google Docs** (or any editor)
2. **Copy your content**
3. **Convert to Markdown:**
   - Use [Markdown to HTML Converter](https://www.markdowntohtml.com/)
   - Or [StackEdit](https://stackedit.io/)
   - Or [Dillinger](https://dillinger.io/)
4. **Save as `.md` file** in the `markdown/` folder
5. **Run the build script:**
   ```bash
   node build-blog.js
   ```
6. **Your HTML appears** in the `blog/` folder
7. **Blog listing updates** automatically

## Build Script

### What It Does
- Scans the `markdown/` folder for `.md` files
- Converts Markdown to HTML using the `marked` library
- Applies consistent styling to all posts
- Generates individual blog post pages
- Updates the main blog listing page
- Maintains proper navigation between pages

### Running the Script
```bash
# Build all blog posts
node build-blog.js

# The script will show you:
# �� Building blog...
# 📝 Processing first-post.md...
# ✅ Created blog/first-post.html
# ✅ Updated blog.html with 1 posts
# 🎉 Blog build complete!
```

## Customization

### Styling
Edit the CSS in `build-blog.js` within the `POST_TEMPLATE` function to change:
- Fonts and colors
- Layout and spacing
- Typography and sizing

### Configuration
Update the `BLOG_CONFIG` object in `build-blog.js`:
```javascript
const BLOG_CONFIG = {
  title: 'Your Name',
  description: 'Your tagline',
  author: 'Your Name',
  email: 'your@email.com',
  linkedin: 'https://linkedin.com/in/yourprofile'
};
```

## Troubleshooting

### Common Issues

**"marked is not defined"**
```bash
npm install marked
```

**"module not found"**
```bash
npm install
```

**Content getting cut off**
- Make sure your Markdown file doesn't start with `---` unless you want frontmatter
- Check that the file is saved with UTF-8 encoding

**Build script not working**
- Ensure you're in the correct directory
- Check that `build-blog.js` exists
- Verify Node.js is installed: `node --version`

## Markdown Reference

### Basic Syntax
```markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text**
*Italic text*
`Inline code`

- Bullet point
- Another point

1. Numbered list
2. Second item

> Blockquote

[Link text](url)

![Alt text](image-url)
```

### Code Blocks
````markdown
```javascript
function example() {
  return "Hello World";
}
```
````

## Deployment

### GitHub Pages
1. **Commit your changes:**
   ```bash
   git add .
   git commit -m "Add new blog post: My Amazing Post"
   git push
   ```

2. **GitHub Pages automatically** serves your site from the main branch

### Other Hosting
- Upload all files to any web server
- Works with Netlify, Vercel, or any static hosting
- No server-side processing required

---

**Happy blogging! 🎉**

Your content will be automatically converted to beautiful, responsive HTML that works perfectly on all devices.
```

Now the README should display properly with clean formatting and all the essential information!