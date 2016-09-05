#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const $ = require('jquery');
const jsdom = require("jsdom");

const template = fs.readFileSync('template.html', 'utf8');
const postsPath = path.resolve(__dirname, '/posts');

// returns array of directory names in path `p`.
var dirs = p => fs.readdirSync(p).filter(f => fs.statSync(p+"/"+f).isDirectory());
var posts = dirs(postsPath);

posts.forEach(post => {
	jsdom.env(template, function(err, window) {
		if (err !== null) {
			console.error(err);
			return;
		}

		var $ = require("jquery")(window);

		var index = path.resolve(postsPath, post, 'index.md');
		var out = path.resolve(__dirname, '/build');

		var command = `pandoc ${index} --from markdown_github --to html`;
		exec(command, (error, stdout, stderr) => {
			if (error !== null) {
				console.error(error);
				return;
			}

			$('.pandoc-output').html('\n' + stdout);
			console.log(jsdom.serializeDocument(window.document));
		});
	});
});
