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

[pandoc]: http://pandoc.org/
[github-pages]: https://pages.github.com/
