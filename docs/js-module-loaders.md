# JavaScript module loading considerations

The JavaScript requirements across OLCS are minimal and as such an overly-complex
module loading process may not be required. This document attemps to explore the
suitability of an AMD loader versus no special treatment (e.g. using simple
`<script>` tags).

## RequireJS (AMD)

### Pros

* strong focus on modularisation; less risk of polluting global scope
* clear, explicit dependencies as part of module declaration
* built-in production optimiser

### Cons

* non-zero overhead, even in production (two requests)
* small learning curve
* harder to bootstrap unit tests
* may require shims for third-party libraries
* requires potentially verbose configuration
* tricky to mock dependencies when testing
* small amount of boilerplate per module

## No module loader (script tags)

### Pros

* no extra learning curve
* no overhead, no extra scripts
* flat, ordered dependencies via `<script></script>` tags

### Cons

* no explicit declaration of a module's dependencies
* requires manual namespacing and opt-in to this convention
* requires a manual build process

## Browserify (CommonJS)

### Pros

* strong focus on modularisation; less risk of polluting global scope
* flourishing ecosystem (e.g. npm)
* built-in production optimiser
* built-in debug tools via source maps
* synchronous nature of require() statements is easier to understand
* no boilerplate per module

### Cons

* small learning curve
* increased reliance on Node.js (tenuous...)
