# Creating a browser live reloader

During development, it can be extremely useful to have your browser reload the page when new changes are made. To implement this functionality, we must understand that the browser has no way of knowing when files representing the content it is currently displaying have changed.

To implement this behavior, we can use a script that continuously polls the server and executes a whole page reload when the server signals that a modification has taken place. To reload the page, we can use `document.location.reload()`.

Note that this is a programmatic approach to page reloading. An alternative with only pure HTML is to use

```html
<meta http-equiv=refresh content=5 />
```

which refreshes the page with a period of the specified length in seconds.

To contact the server, we may choose to use AJAX or websockets. With AJAX, we can query the server at regular intervals, and execute a full page reload when the server signals that a change has occurred. With websockets, we could reload the page when the broadcaster signals a change.

Let's explore these two options.

## AJAX

We will use `fetch` to send requests to the server. The server will be set up to respond to these requests with the date of the last build.

If the date returned by the server is different to the previously returned date, a page reload will be triggered. We will need to set up a dedicated route on the server to process these requests.

```js
function liveReload(last) {
  fetch('/live-reload', {
    method: 'get'
  }).then(function(response) {
    return response.json();
  }).then(function(j) {
    if (last < j.last) {
      document.location.reload();
    } else {
      setTimeout(() => liveReload(j.last), 1000);
    }
  }).catch(function(err) {
    // handle error
    setTimeout(() => liveReload(last), 1000);
  });
}
```

This script continually performs a request one second after the previous request has been handled. The route on the server handling these requests is `/livereload`.

The script can be added to the HTML header like so

```html
<script defer src="liveReload.js"></script>
```

To handle the requests to `/liveReload`, we will include this route in a Node and Express server.

```js
var now = Date.now();
app.get('/live-reload', (req, res) => {
  res.json({last: now});
});
```

The full runnable code for this example can be found [here][4]. Remember to run `npm i`.

## WebSockets

Coming soon!

## Snippets and Links

[SO Programatically Refresh Browser][1]

[Socket IO][2]

[DWB fetch][3]

[1]: http://stackoverflow.com/questions/13376048/how-do-i-programmatically-refresh-a-browser
[2]: http://socket.io/
[3]: https://davidwalsh.name/fetch
[4]: link_to_github
