# aryzing.net
Personal website

# Workflow

This repo contains my personal site as well as tools to build pages for blog posts from markdown files. For the build process to work, you must have [pandoc][pandoc] installed on your system.

The build tool looks for `index.md` markdown files in the post directories under `posts`. Post directories are expected to be named `YYYY-MM-DD-some-description`.

The build tool uses the post directory name to extract the post date and the first header in the index file to extract the post title. Currently, the description in the name of a post directory is not used.

Runnig

```sh
npm build
```

will create an HTML page for each post found, and will insert HTML code into `index.html` that links to it. The created files are stored under `client/posts`. Since I am currently using GitHub's static page server, this means that these files must be necessarily committed despite being compiled output. Suggestions to avoid this are appreciated.

# Organization

The files destined for the client are only those in `client/assets/css`. They are CSS files.

The building process

[pandoc]: http://pandoc.org/
