# Miscellaneous OLCS JavaScript Best Practices

## Don't initialise a component in the same file it is declared

I.e. no `$(function() {});` stuff

* Should be left to context to decide when / how to init
* Impossible to decouple declaration from instantiation
* Particularly problematic under test; we need control over invocation

## Don't tightly couple selectors or context-sensitive variables to a component

I.e. inject `#foo` into an options param or similar instead of hardcoding

* Decouples component from any particular markup
* Makes component reusable across pages with identical behaviour but different HTML
* However, if related elements are *always* part of a component, no need to make them injectable

## Don't overuse jQuery et al

* Makes unit testing much harder
* When used, try and keep distinct from business logic

## Do create a new component if you need one

* Keep components small, robust, testable, reusable
* "Minimise the exported interface"
 * smaller surface area -> smaller public contract
 * smaller public contract -> much easier to refactor internals

## Do follow existing file and folder organisation

Put things in the right place, and name them accordingly.

## Always inject global dependencies using an IIFE

* Eliminates unnecessary scope lookups
* Improves compression
* Allows dependencies to be swapped in one place (per module)

For example:

```
var OLCS.module = (function(document, $) {
  // code goes here
}(document, window.jQuery));
```

## Don't check against `undefined` unless you **know** it's safe

I.e. use:

```
if (typeof foo === "undefined") {}
```

Or specify `undefined` as a function parameter but never provide
it with a value:

```
var OLCS.module = (function(undefined) {
  if (foo === undefined) {
      // handle undefined value
  }
}());
```

## NEVER manipulate base object prototypes

* Operate on the principle of least surprise
* Don't break other people's code

I.e. none of this!

```
Array.prototype.slice = function() { alert('surprise!'); }
```
