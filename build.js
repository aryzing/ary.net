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
var postNames = dirs(postsPath);
var posts = [];

postNames.forEach(postName => {
	jsdom.env(postTemplateHtml, function(err, window) {
		if (err !== null) {
			console.error(err);
			return;
		}

		var $ = jquery(window);

		var indexPath = path.resolve(postsPath, postName, 'index.md');
		var outPath = path.resolve(__dirname, outDirRel, postName + '.html');

		var command = `pandoc ${indexPath} --from markdown_github --to html`;
		exec(command, (error, stdout, stderr) => {
			if (error !== null) {
				console.error(error);
				return;
			}

			var post = {};
			post.date = postName.slice(0, 10);
			post.title = $(`<div>${stdout}</div>`).find('h1').text();
      post.name = postName;
			posts.push(post);

			$('.pandoc-out').html('\n' + stdout);
			fs.mkdir(outDirAbs, () => {
				fs.writeFileSync(outPath, jsdom.serializeDocument(window.document));

				// check to see if all posts have been processed
				if (posts.length === posts.length) {
          // sort by date (newest first)
					posts.sort((a, b) => a.date < b.date ? 1 : -1);
					// make new window from index document
          jsdom.env(indexTemplateHtml, function(err, window) {
        		if (err !== null) {
        			console.error(err);
        			return;
        		}

						// connect index template's window to jquery
            var $ = jquery(window);
            var postsDOM = $('<div></div>');
            for (var i = 0; i < posts.length; i++) {
              var postDOM = $(`
								<a href=${outDirRel}/${posts[i].name}.html>
								  <div class=post>
								    <div class=title>${posts[i].title}</div>
								  	<div class=date>${posts[i].date}</div>
								  </div>
								</a>
              `);
							postsDOM.append(postDOM);
            }
						// insert into index
						$('.out').append(postsDOM);
						fs.writeFileSync('index.html', jsdom.serializeDocument(window.document));
          });
				}
			});
		});
	});
});
