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

## Quick reference
* Two ways of calling `fetch`.
*
* The url and request are required
*


fetch

two ways of calling fetch

way 1

called (has no name, is way1)
signature

way 2

called (has no name, it way2)
signature


... -> from: way 1

first argument required, string, url
second argument optional, object, options

## More than fetch: TDL (Test Driven Learning)

* Making note of the atomic units of knowledge
* The order/precedence/relationship between them
* Asking the right questions to the right facts
* Levels of questions and memorization: knowing answers to questions, knowing the questions themselves.
