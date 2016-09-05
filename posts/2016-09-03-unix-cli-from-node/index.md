# Using Unix Commands from Node

First step write .md file

Second step, run pandoc on the file, and capture output

Step three, use jquery to load the template. Will need to add jquery to server with

```sh
npm install jquery -D
```

Step four, insert pandoc output into the corresponding position of the template

Step five, write to disk

```js
var exec = require('child_process').exec;
```
