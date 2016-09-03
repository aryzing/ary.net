# Comparing script restart using node, nodemon, and forever

A common practice when working on server-side code is restarting the server after making changes, or after a server crash. Using `node` to restart the server manually can become tedious. To help out with this process, we can use `nodemon` or `forever`. Lets take a look at how these tools work. Specifically, we are interested on how they deal with finite vs infinite execution time scripts, what happens when changes are made to the script file, and what happens when there is an error.

## Infinite loop scripts

Lets start analyzing infinite loop scripts.

```js
// index-infinite.js
while (1) {
  console.log('Running...');
}
```

With this simple script, the outputs with each of the different commands are

```sh
$ node index-infinite.js
Running...
Running...
Running...
^C
```

```sh
$ nodemon index-infinite.js
[nodemon] 1.9.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index-infinite-mock-output.js`
Running...
Running...
Running...
^C
```

```sh
$ forever index-infinite.js
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
Running...
Running...
Running...
^C
```

All three have identical behavior. They run indefinitely. However, what happens when an error occurs? Lets take a look. The script used for this test is

```js
// index-infinite-error.js
while (1) {
  console.log('Running...');
  if (Math.random() > 0.8) {
    throw '20% chance of failing';
  }
}
```

The outputs for each of the commands are

```sh
$ node index-infinite-error.js
Running...
Running...
Running...

/path/index-infinite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
```

Using `node`, when the error is encountered, execution stops and the terminal prompt is shown.

```sh
$ nodemon index-infinite-error.js
[nodemon] 1.9.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index-infinite-error.js`
Running...
Running...
Running...

/path/index-infinite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
[nodemon] app crashed - waiting for file changes before starting...
```

Using `nodemon`, a similar output is shown. However, the prompt is not returned to the user on error, and it waits for file changes to be made. If file changes are made, the script will re-run.

```sh
forever --spinSleepTime 3000 index-infinite-error.js
warn:    --minUptime not set. Defaulting to: 1000ms
Running...
Running...
Running...
Running...
Running...

/path/index-infinite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
error: Forever detected script exited with code: 1
error: Script restart attempt #1
Running...
Running...

/path/index-infinite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
error: Forever detected script exited with code: 1
error: Script restart attempt #2
Running...
Running...
Running...
Running...
Running...
Running...
Running...

/path/index-infinite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing

#etc...
```

Whenver the script errors out, forever will re-run it. If the script fails shortly after restarting, specifically, less than the specified `minUptime` value, it will wait `spinSleepTime` amount of miliseconds before restarting. It can be convenient to set these values to avoid overloading your computer. The defaults are both 1 second.

## Finite length scripts

Now lets analyze what happens when a finite execution time script is run with each of these commands. The script we will use is

```javascript
// index-finite.js
for (var i = 0; i < 10; i++) {
  console.log('Running...');
}
```

When run with `node`, it prints `Running...` ten times to the console as expected.

With nodemon it runs once, and waits for file changes before running it again.

```sh
$ nodemon index-finite.js
[nodemon] 1.9.2
[nodemon] to restart at any time, enter `rs`
[nodemon] watching: *.*
[nodemon] starting `node index-finite.js`
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
[nodemon] clean exit - waiting for changes before restart
```

So nodemon's attitude towards execution is something along the lines of "run indefinitely until error or script end, and then wait for file changes".

Forever, on the other hand, does not seem to play nice with finite length scripts. Upon completion, it will just sit there, without returning the prompt to the user.

```sh
$ forever index-finite.js
warn:    --minUptime not set. Defaulting to: 1000ms
warn:    --spinSleepTime not set. Your script will exit if it does not stay up for at least 1000ms
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
Running...
error: Forever detected script exited with code: 0
# prompt not returned to user
# must exit with ^C
^C
```

Modifying the file does not trigger forever to restart execution either. It just sits there... forever.

However, what would happen if forever is run on a finite length script that throws an error before exiting cleanly? Will the error trigger the script to restart? Lets find out with the following script.

```javascript
// index-finite-error.js
for (var i = 0; i < 10; i++) {
  console.log('Running...');
  if (Math.random() > 0.8) {
    throw '20% chance of failing';
  }
}
```

The console output was

```sh
$ forever --spinSleepTime 3000 index-finite-error.js
warn:    --minUptime not set. Defaulting to: 1000ms
Running...
Running...

/path/index-finite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
error: Forever detected script exited with code: 1
error: Script restart attempt #1
Running...

/path/index-finite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
error: Forever detected script exited with code: 1
error: Script restart attempt #2
Running...
Running...
Running...
Running...

/path/index-finite-error.js:4
    throw '20% chance of failing';
    ^
20% chance of failing
# etc...
^C
```

Exiting with an error does trigger the script to be restarted.

## Conclusion

When running an infinite loop script, all three will run indefinitely as long as there are no errors. When an error is encountered, node will exit, nodemon will wait for file changes, and forever will restart immediately or after an `spinSleepTime` amount of time.

With finite execution time scripts, node will eventually exit, with or without errors. Nodemon will always wait for file changes before runing the script again regardless of the exit status, and forever will hang on a clean exit, but will succesfully restart on error.


## Useful snippets and links
```sh
npm install -g nodemon
```

```sh
npm install -g forever
```

```sh
# wait 3 secons before restarting if script is spinning
forever --spinSleepTime 3000 index.js
```

[SO Spinning and uptime][1]

[MDN throw][2]

Disable automatic scrolling: Edit > Profile Preferences > Scrolling > Scroll on keystroke

[1]: http://stackoverflow.com/questions/18390870/what-is-the-minuptime
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw
