import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

// Get __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Blog configuration
const BLOG_CONFIG = {
  title: 'john',
  description: 'thoughts & writings',
  author: 'john',
  email: 'jjmose2409@gmail.com',
  linkedin: 'https://www.linkedin.com/in/john-mose-a7a575210/',
  mutt: 'https://mutt-inc.com/'
};

// HTML template for blog posts
const POST_TEMPLATE = (title, date, content) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${BLOG_CONFIG.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: white;
      color: black;
      line-height: 1.6;
    }
    
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 2rem;
    }
    
    .back-link {
      margin-bottom: 2rem;
    }
    
    .back-link a {
      color: #666;
      text-decoration: underline;
      transition: color 0.2s ease;
    }
    
    .back-link a:hover {
      color: black;
    }
    
    .post-header {
      margin-bottom: 3rem;
      text-align: center;
    }
    
    .post-title {
      font-family: Georgia, serif;
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .post-meta {
      color: #666;
      font-size: 1rem;
    }
    
    .post-content {
      font-size: 1.1rem;
      line-height: 1.8;
    }
    
    .post-content h2 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 2rem 0 1rem 0;
      color: #333;
    }
    
    .post-content h3 {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 1.5rem 0 0.8rem 0;
      color: #333;
    }
    
    .post-content p {
      margin-bottom: 1.2rem;
    }
    
    .post-content ul, .post-content ol {
      margin-bottom: 1.2rem;
      padding-left: 2rem;
    }
    
    .post-content li {
      margin-bottom: 0.5rem;
    }
    
    .post-content blockquote {
      border-left: 4px solid #ddd;
      padding-left: 1.5rem;
      margin: 1.5rem 0;
      font-style: italic;
      color: #555;
    }
    
    .post-content code {
      background-color: #f5f5f5;
      padding: 0.2rem 0.4rem;
      border-radius: 3px;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.9rem;
    }
    
    .post-content pre {
      background-color: #f5f5f5;
      padding: 1rem;
      border-radius: 5px;
      overflow-x: auto;
      margin: 1.5rem 0;
    }
    
    .post-content pre code {
      background: none;
      padding: 0;
    }
    
    .social-links {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      text-align: left;
    }
    
    .social-links a {
      display: block;
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      transition: color 0.2s ease;
    }
    
    .social-links a:hover {
      color: black;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="back-link">
      <a href="../index.html">← back to home</a>
    </div>
    
    <div class="post-header">
      <h1 class="post-title">${title}</h1>
      <div class="post-meta">${date}</div>
    </div>
    
    <div class="post-content">
      ${content}
    </div>
    
    <div class="social-links">
      <a href="${BLOG_CONFIG.mutt}" target="_blank" rel="noopener noreferrer">mutt.</a>
      <a href="${BLOG_CONFIG.linkedin}" target="_blank" rel="noopener noreferrer">linkedin</a>
      <a href="mailto:${BLOG_CONFIG.email}">email</a>
    </div>
  </div>
</body>
</html>`;

// HTML template for blog listing
const BLOG_LISTING_TEMPLATE = (posts) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>blog - ${BLOG_CONFIG.title}</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background-color: white;
      color: black;
      line-height: 1.6;
    }
    
    .container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      text-align: center;
      max-width: 500px;
      margin: 0 auto;
    }
    
    .back-link {
      align-self: flex-start;
      margin-bottom: 3rem;
    }
    
    .back-link a {
      color: #666;
      text-decoration: underline;
      transition: color 0.2s ease;
    }
    
    .back-link a:hover {
      color: black;
    }
    
    .blog-header {
      margin-bottom: 4rem;
    }
    
    .blog-title {
      font-family: Georgia, serif;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
    
    .blog-subtitle {
      color: #666;
      font-size: 1.1rem;
    }
    
    .blog-posts {
      text-align: left;
      width: 100%;
    }
    
    .post {
      border-bottom: 1px solid #eee;
      padding-bottom: 1.5rem;
      margin-bottom: 1.5rem;
    }
    
    .post:last-child {
      border-bottom: none;
    }
    
    .post-title {
      font-size: 1.3rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .post-title a {
      color: black;
      text-decoration: none;
      transition: color 0.2s ease;
    }
    
    .post-title a:hover {
      color: #666;
    }
    
    .post-excerpt {
      color: #666;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
    }
    
    .post-date {
      color: #999;
      font-size: 0.8rem;
    }
    
    .social-links {
      position: absolute;
      bottom: 2rem;
      left: 2rem;
      text-align: left;
    }
    
    .social-links a {
      display: block;
      color: #666;
      text-decoration: none;
      font-size: 0.9rem;
      margin-bottom: 0.5rem;
      transition: color 0.2s ease;
    }
    
    .social-links a:hover {
      color: black;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="back-link">
      <a href="index.html">← back</a>
    </div>
    
    <div class="blog-header">
      <h1 class="blog-title">blog</h1>
      <p class="blog-subtitle">${BLOG_CONFIG.description}</p>
    </div>
    
    <div class="blog-posts">
      ${posts.map(post => `
        <div class="post">
          <h2 class="post-title">
            <a href="blog/${post.filename}">${post.title}</a>
          </h2>
          <p class="post-excerpt">${post.excerpt}</p>
          <div class="post-date">${post.date}</div>
        </div>
      `).join('')}
    </div>
    
    <div class="social-links">
      <a href="${BLOG_CONFIG.mutt}" target="_blank" rel="noopener noreferrer">mutt.</a>
      <a href="${BLOG_CONFIG.linkedin}" target="_blank" rel="noopener noreferrer">linkedin</a>
      <a href="mailto:${BLOG_CONFIG.email}">email</a>
    </div>
  </div>
</body>
</html>`;

// Function to extract title from first heading in Markdown
function extractTitleFromMarkdown(content) {
  const lines = content.split('\n');
  for (const line of lines) {
    if (line.startsWith('# ')) {
      return line.substring(2).trim();
    }
  }
  return null;
}

// Function to extract metadata from Markdown frontmatter
function extractMetadata(markdown) {
  const lines = markdown.split('\n');
  const metadata = {};
  let contentStart = 0;
  let frontmatterEnd = -1;
  
  // Check if file starts with frontmatter (---)
  if (lines[0].trim() === '---') {
    // Find the end of frontmatter (second ---)
    for (let i = 1; i < lines.length; i++) {
      if (lines[i].trim() === '---') {
        frontmatterEnd = i;
        contentStart = i + 1;
        break;
      }
    }
    
    // Extract metadata from frontmatter lines
    for (let i = 1; i < frontmatterEnd; i++) {
      const line = lines[i];
      if (line.includes(':')) {
        const colonIndex = line.indexOf(':');
        const key = line.substring(0, colonIndex).trim();
        const value = line.substring(colonIndex + 1).trim();
        metadata[key] = value;
      }
    }
  } else {
    // No frontmatter, use entire content
    contentStart = 0;
  }
  
  // Get content after frontmatter (or entire content if no frontmatter)
  const content = lines.slice(contentStart).join('\n');
  return { metadata, content };
}

// Function to generate excerpt from content
function generateExcerpt(content, maxLength = 150) {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > maxLength 
    ? plainText.substring(0, maxLength) + '...'
    : plainText;
}

// Function to build a specific blog post
function buildSpecificPost(filename) {
  const markdownDir = path.join(__dirname, 'markdown');
  const blogDir = path.join(__dirname, 'blog');
  
  const markdownPath = path.join(markdownDir, filename);
  
  if (!fs.existsSync(markdownPath)) {
    console.log(`❌ File ${filename} not found in markdown/ folder`);
    return;
  }
  
  console.log(`📝 Building ${filename}...`);
  
  const markdownContent = fs.readFileSync(markdownPath, 'utf8');
  const { metadata, content } = extractMetadata(markdownContent);
  
  // Extract title from first heading (this is the main source)
  let title = extractTitleFromMarkdown(content);
  
  // Fallback to frontmatter title if no heading found
  if (!title) {
    title = metadata.title;
  }
  
  // Final fallback to filename if no title found anywhere
  if (!title) {
    title = filename.replace('.md', '').replace(/-/g, ' ');
  }
  
  const date = metadata.date || new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const htmlContent = marked.parse(content);
  const htmlFilename = filename.replace('.md', '.html');
  const htmlPath = path.join(blogDir, htmlFilename);
  const finalHtmlContent = POST_TEMPLATE(title, date, htmlContent);
  
  fs.writeFileSync(htmlPath, finalHtmlContent);
  console.log(`✅ Created blog/${htmlFilename} with title: "${title}"`);
}

// Main build function
function buildBlog() {
  console.log(' Building blog...');
  
  // Create directories if they don't exist
  const markdownDir = path.join(__dirname, 'markdown');
  const blogDir = path.join(__dirname, 'blog');
  
  if (!fs.existsSync(markdownDir)) {
    fs.mkdirSync(markdownDir, { recursive: true });
    console.log('📁 Created markdown/ directory');
  }
  
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
    console.log('📁 Created blog/ directory');
  }
  
  // Find all Markdown files in the markdown directory
  const markdownFiles = fs.readdirSync(markdownDir)
    .filter(file => file.endsWith('.md'))
    .filter(file => file !== 'README.md');
  
  if (markdownFiles.length === 0) {
    console.log('📝 No Markdown files found in markdown/ folder.');
    console.log(' Create some .md files in the markdown/ folder to get started!');
    return;
  }
  
  const posts = [];
  
  // Process each Markdown file
  markdownFiles.forEach(file => {
    console.log(`📝 Processing ${file}...`);
    
    const markdownPath = path.join(markdownDir, file);
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Extract metadata and content
    const { metadata, content } = extractMetadata(markdownContent);
    
    // Extract title from first heading (this is the main source)
    let title = extractTitleFromMarkdown(content);
    
    // Fallback to frontmatter title if no heading found
    if (!title) {
      title = metadata.title;
    }
    
    // Final fallback to filename if no title found anywhere
    if (!title) {
      title = file.replace('.md', '').replace(/-/g, ' ');
    }
    
    const date = metadata.date || new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    // Convert Markdown to HTML
    const htmlContent = marked.parse(content);
    
    // Generate filename (same as markdown file, just .html extension)
    const filename = file.replace('.md', '.html');
    
    // Create HTML file in blog directory
    const htmlPath = path.join(blogDir, filename);
    const finalHtmlContent = POST_TEMPLATE(title, date, htmlContent);
    fs.writeFileSync(htmlPath, finalHtmlContent);
    
    // Add to posts list
    posts.push({
      title,
      date,
      excerpt: generateExcerpt(content),
      filename
    });
    
    console.log(`✅ Created blog/${filename} with title: "${title}"`);
  });
  
  // Sort posts by date (newest first)
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate blog listing page
  // Blog posts are now linked directly from index.html
  const blogListingContent = BLOG_LISTING_TEMPLATE(posts);
  fs.writeFileSync(blogListingPath, blogListingContent);
  
  console.log(`✅ Blog posts are linked directly from index.html`);
  console.log('🎉 Blog build complete!');
  console.log(` Your HTML files are in the blog/ folder`);
  console.log(`📝 Your Markdown source files are in the markdown/ folder`);
}

// Check command line arguments
const args = process.argv.slice(2);

if (args.length > 0) {
  // Build specific file
  const filename = args[0].endsWith('.md') ? args[0] : `${args[0]}.md`;
  buildSpecificPost(filename);
} else {
  // Build all files
  buildBlog();
}