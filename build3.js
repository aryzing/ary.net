#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
var jquery = require('jquery');
const jsdom = require("jsdom");

const postTemplatePath = path.resolve(__dirname, 'client/assets/html/post-template.html');
const postTemplateHtml = fs.readFileSync(postTemplatePath, 'utf8');
const postsPath = path.resolve(__dirname, 'posts');
const indexTemplatePath = path.resolve(__dirname, 'client/assets/html/index-template.html');
const indexTemplateHtml = fs.readFileSync(indexTemplatePath, 'utf8');
const outDirRel = 'post';
const outDirAbs = path.resolve(__dirname, outDirRel);

// returns array of directory names in path `p`.
var dirs = p => fs.readdirSync(p).filter(
	f => fs.statSync(p + '/' + f).isDirectory()
);
var posts = dirs(postsPath);
var descriptors = [];

posts.forEach(post => {
	jsdom.env(postTemplateHtml, function(err, window) {
		if (err !== null) {
			console.error(err);
			return;
		}

		var $ = jquery(window);

		var indexPath = path.resolve(postsPath, post, 'index.md');
		var outPath = path.resolve(__dirname, outDirRel, post + '.html');

		var command = `pandoc ${indexPath} --from markdown_github --to html`;
		exec(command, (error, stdout, stderr) => {
			if (error !== null) {
				console.error(error);
				return;
			}

			var descriptor = {};
			descriptor.date = post.slice(0, 10);
			descriptor.title = $(`<div>${stdout}</div>`).find('h1').text();
      descriptor.post = post;
			descriptors.push(descriptor);

			$('.pandoc-out').html('\n' + stdout);
			fs.mkdir(outDirAbs, () => {
				fs.writeFileSync(outPath, jsdom.serializeDocument(window.document));

				// check to see if all posts have been processed
				if (descriptors.length === posts.length) {
          // sort by date (newest first) and insert into index
					descriptors.sort((a, b) => a.date < b.date ? 1 : -1);
					// make new window from index document
          jsdom.env(indexTemplateHtml, function(err, window) {
        		if (err !== null) {
        			console.error(err);
        			return;
        		}

            var $ = jquery(window);
            var posts = $('<div></div>');
            for (var i = 0; i < descriptors.length; i++) {
              var post = $(`
								<a href=${outDirRel}/${descriptors[i].post}.html>
								  <div class=post>
								    <div class=title>${descriptors[i].title}</div>
								  	<div class=date>${descriptors[i].date}</div>
								  </div>
								</a>
              `);
							posts.append(post);
            }
						$('.out').append(posts);
						fs.writeFileSync('index.html', jsdom.serializeDocument(window.document));
          });
				}
			});
		});
	});
});
