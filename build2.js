#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
var jquery = require('jquery');
const jsdom = require("jsdom");

const templatePath = path.resolve(__dirname, 'client', 'template.html');
const template = fs.readFileSync(templatePath, 'utf8');
const postsPath = path.resolve(__dirname, 'posts');

// returns array of directory names in path `p`.
var dirs = p => fs.readdirSync(p).filter(
	f => fs.statSync(p + '/' + f).isDirectory()
);
var posts = dirs(postsPath);
var titles = [];
var dates = [];

posts.forEach(post => {
	jsdom.env(template, function(err, window) {
		if (err !== null) {
			console.error(err);
			return;
		}

		// var $ = require("jquery")(window);
		// $ = $(window);
		var $ = jquery(window);

		var index = path.resolve(postsPath, post, 'index.md');
		var out = path.resolve(__dirname, 'build', post + '.html');

		var command = `pandoc ${index} --from markdown_github --to html`;
		exec(command, (error, stdout, stderr) => {
			if (error !== null) {
				console.error(error);
				return;
			}

			

			$('.pandoc-content').html('\n' + stdout);
			fs.mkdir('build', () => {
				fs.writeFileSync(out, jsdom.serializeDocument(window.document));
			});
		});
	});
});
