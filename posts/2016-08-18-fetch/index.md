# fetch

`fetch` can be called in one of two ways
* using two arguments, url (required) and an options object, or
* by passing a single `Request` object argument.

`fetch` handles async execution by means of promises. On success, it will provide a `Response` object.

```js
fetch('http://aryzing.net/', {
  method: 'get'
}).then(function(response) {
  //... promise resolves to `Response` object
}).catch(function(err) {
  //... process error :(
});
```
