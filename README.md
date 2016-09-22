# aryzing.net
Personal website

# Workflow

This repo contains my personal site as well as tools to build pages for blog posts from markdown files. For the build process to work, you must have [pandoc][pandoc] installed on your system.

The build tool looks for an `index.md` file in each post directory under the `posts` directory. Post directories are expected to be named `YYYY-MM-DD-some-description`.

The build tool uses the post directory name to obtain the post date and the first header in the index file to obtain the post title. Currently, the description in the name of a post directory is not used.

The command

```sh
npm run build
```

will create an HTML page for each post found, and will insert a link to each in `index.html`. The created files are stored under `client/posts`. Since this project is intended to be used with [GitHub Pages][github-pages], the compiled HTML post files must be necessarily committed. Suggestions to avoid this are appreciated. Note that as a result of the building process, `index.html` contains both written and compiled content. The compiled code is contained within `<div class=out>`.

# Organization

Notable files in the project root are `index.html` and `build.js`. GitHub Pages requires the index page to be at the root of the project. `build.js` is the script that creates post pages and links to them.

The posts (in markdown) are each within their own folder under `posts`. Each of these directories must contain an `index.md` file. Other files in the directory are ignored.

Files destined for the client as well as other files such as templates are in `client`. The compiled posts are in `client/posts`.

# Styling

## Code snippets and inline code

Currently using highlight.js for the code snippets. It only highlights `<code>` snippets contained in `<pre>` tags. Inline code snippets in Markdown are not enclosed in `<pre>` tags when converted to HTML, so highlight.js ignores them and does not style them. To give the page a more consisten feel, the inline snippets are colored with the same background as the currently used highlight.js theme, Atom One Light.

```css
p > code {
  background-color: #fafafa;
  padding-left: 0.3em;
  padding-right: 0.3em
}
```

## Aligning homepage title and post title

The title for the homepage is part of the template,

```html
<h1 class=title>Blog</h1>
```

yet the title for each post is generated dynamically from the first header in the markdown file. To give the site a more consistent look, the same styles have been applied to both elements.

```css
.title, .content h1:first-of-type {
  text-align: center;
  font: normal normal 700 2rem/2.8rem 'Open Sans', sans-serif;
}
```




[pandoc]: http://pandoc.org/
[github-pages]: https://pages.github.com/
