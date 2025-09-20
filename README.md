# John M24 Personal Blog

A minimalist static blog generator that converts Markdown to clean HTML.

## Quick Start

1. **Write** your post in `markdown/your-post-name.md` (start with `# Your Title`)
2. **Build** with `node build-blog.js`
3. **View** `index.html` in browser

## Commands

```bash
# Build all posts
node build-blog.js

# Build specific post
node build-blog.js your-post-name

# Install dependencies (first time)
npm install
```

## How It Works

- **Source**: Write in `markdown/` folder
- **Output**: HTML files generated in `blog/` folder
- **Title**: Extracted from first `# heading` in your markdown
- **Date**: Auto-generated (current date) or add to frontmatter
- **Listing**: `blog.html` automatically updated with all posts

## File Structure

```
markdown/          # Your source files (.md)
blog/             # Generated HTML files
index.html        # Homepage
blog.html         # Blog listing (auto-generated)
build-blog.js     # Build script
```

## Tips

- Use `# Your Title` as the first line for automatic title extraction
- Add frontmatter for custom dates: `---\ndate: January 1, 2025\n---`
- Posts are sorted by date (newest first)
- Excerpts are auto-generated from content
