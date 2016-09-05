#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const $ = require('jquery');
const jsdom = require("jsdom");

const command = 'pandoc test.md --from markdown_github --to html';
const template = fs.readFileSync('template.html', 'utf8');

jsdom.env(template, function(err, window) {
	if (err !== null) {
		console.error(err);
		return;
	}

	var $ = require("jquery")(window);

  exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.error(error);
      return;
    }

    $('.pandoc-output').html('\n' + stdout);
    console.log(jsdom.serializeDocument(window.document));
  });
});
