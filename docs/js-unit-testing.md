# JavaScript Unit Testing

Please ensure you have a recent version of [Node.js](http://nodejs.org/) installed as this
is required to run [karma](http://karma-runner.github.io/0.12/index.html), our test runner
of choice. The installation process will also fetch Mocha, our test framework (which
is very similar to Jasmine, but has slightly better asynchronous support).

## Mocha

This is the actual test framework, responsible for setting up, running
through and asserting expectations on your tests with behaviour driven semantics
(this differs to more traditional TDD frameworks like PHPUnit which lack the grammar
to describe tests in quite the same way). Once the other components are installed
and set up, it's Mocha you'll use to write your tests.

Standalone, Mocha can obviously *run* your tests as well as let you write them.
However, manually adding source and test `<script>` tags into an html document
soon gets tiresome and doesn't lend itself to rapid, repeated or automated
testing, which is where we need...

## Karma

Karma is a test runner which simplifies actually running your tests when you change
your code (or your actual tests). Once installed and configured per-project, our
standard usage of it will run your entire test suite on save. It can run tests in
any number of real 'captured' browsers, or start up browsers at run time. This last
mechanism is particularly useful when combined with using PhantomJS as it enables
constant on-save testing in a realistic browser without interrupting development.
Karma can also easily be run under CI and can output cobertura coverage reports
compatible with Jenkins.

# Running tests

We use the standard `karma.conf.js` file path for our unit tests, so running tests
should be as simple as executing:

`./node_modules/karma/bin/karma start`

We don't specify any browsers to capture in the configuration file as this has the
irritating effect of opening up each browser in the foreground which can be
distracting. Instead, this will start karma and let you know where it's running.
Something like:

```
INFO [karma]: Karma server started at http://localhost:9876/
```

Simply navigate any browsers you wish to capture to that URL and they'll
automatically run the test suite. The configuration we have set up means
that whenever any of the source files under test change - or the test files
themselves change - the test suite will be re-run in its entirety on every
captured browser. This means you'll need to leave karma running in a terminal
session somewhere.

## Global karma installation

Having to remember the path to the local karma binary can be tiresome. To make
it globally executable simply run:

```
npm install -g karma-cli
```

This will ensure you can run `karma` from anywhere; but be sure to always run
it in the same directory as the relevant `karma.conf.js` so it picks up the
correct config file.

## Headless browsers

Running your test suite against real browsers is important, but keeping several
browsers open, and remembering to keep the relevant karma tab open, isn't always
viable. As an alternative the test suite can instead be run headlessly by
'capturing' PhantomJS, providing a robust, rapid, distraction free way of smoke-testing
the test suite.

You'll need to install PhantomJS first and make sure it's in your $PATH so karma can
find it. If you're unsure how to do this just ask, but the end result should be that
you can type `phantomjs` anywhere in a terminal session to invoke the binary.

Once set up you simply need to specify the list of browsers karma should attempt to
use on start up:

```
karma start --browsers PhantomJS
```

You may find initially PhantomJS is a little slow to launch (in the context of the karma
terminal output) and connect, but once connected you'll find in all likelihood it runs
the test suite faster than a connected 'real' browser. Having real browsers connected
too is a good idea but as a baseline PhantomJS is a fantastic starter. It won't
guarantee your code doesn't fall foul of any particular browser quirks but will
assert that its overall behaviour matches your expecations.

# Writing tests

## Folder and Filename conventions

All unit tests should be housed under `test/*`. From this level downwards the folder
structure should mirror that of your publicly accessible JavaScript files
(usually `public/static/js/*`) less the top level `public` folder. Test files
should be named after the file which they're
testing, simply replacing the .js extension with .test.js. This is more than
just a convention; our karma configuration will only look for test files
ending \*.test.js.

## General test guidelines

Mocha comes with several 'interfaces', the default (and most commonly used) of which is BDD.
Therefore as far as possible tests should be written in a behavioural manner. The most
important rule is that one test file should only be testing one object or behaviour,
which in turn should reflect your source code: you should only be creating one object
per source file which naturally results in one test file covering that object. With
that in mind, the following sweeping generalisations apply:

1. Every test file starts with one outer `describe()` block under which any number of
`describe()`, `beforeEach()` and `it()` blocks are nested
2. If you're testing a single object (you probably should be) the string you pass to
the outer describe should be the name of the object
3. Only very basic assertions should be made inside the top-level describe block,
such as whether the object has the expected API or default values
4. Each public method should start a new nested describe block and the string passed
to it should exactly match the name of the method you're testing
5. As much setup code as possible should be pushed into `beforeEach` blocks at the
start of a new describe section. This means your `it` blocks are only ever asserting
outcomes on setup work done in the corresponding `beforeEach`. Try and avoid running
any logic in your it blocks (except for idempotent getters) and never have any code
which changes state inside them. This makes the intention of your assertions a lot
clearer and keeps your setup DRYer
6. If a method relies on another one being called to make any sense, or at least test
a different branch of its execution, it should be added as a nested describe within
the outer method's describe block. A (contrived) example of this would be testing
the logic of a 'disconnect' method once a preceding call to 'connect' has been
invoked
7. Try to avoid coupling your `it` descriptions too closely to the code they're making
assertions over. It's tempting (and too easy) to make your it statement a reflection
of the expect(s) within it, but doing so isn't particularly behavioural. Not the end
of the world either way, but worth bearing in mind
8. The suite uses Sinon.js to provide spies and stubs - don't be afraid to use them!

## Asynchronous tests

One of Mocha's huge advantages over similar runners (such as Jasmine) is its
fantastic built-in support for running asynchronous tests. See
[http://visionmedia.github.io/mocha/#asynchronous-code](the docs) for information
on how to accomplish this.

That said, it is always worth considering if the code under test really *needs* to
be asynchronous, or whether you can stub it and make it synchronous. Related to
this consideration is whether the asynchronous behaviour should even exist under
test, or whether it's a sign that your tests are leaking into layers which don't
concern them at the level you're testing.

A classic scenario to illustrate this point would be making an AJAX request
somewhere within your component; you may be tempted (naturally) to make an
asynchronous test so you can wait for it to invoke a callback. However, this is
almost always wrong, since:

1. It introduces an external dependency on the endpoint receiving the AJAX call
2. It will slow down your suite and make it more brittle
3. You most likely aren't interested in the mechanics of the request, but rather
verifying that when it returns with X your component does Y (similarly when it
returns with A or throws an error, your code handles that, too).

To that end, it's **far** better to stub the AJAX call and synchronously
trigger however many responses you need in order to validate your
component's behaviour. In BDD terminology, you want to establish a scenario
such as:

"Given the AJAX request responds with foo / an error, assert X / Y / Z"

Phrasing the test in this manner makes it clearer what you're testing and
therefore which parts of the scenario you can stub out safely.

# Code coverage

The test suite is set up to create human-friendly code coverage reports. Due to the
fact Istanbul can't guarantee all browsers executed all JS equally, a per-browser
report will be created inside
`test/coverage/[browser]-[version]-[OS]/lcov-report`. The simplest
approach is to pick a standard browser to test in and keep an eye on its
`index.html` file as you write your tests.

A Junit-compatible xml file is also generated, suitable for generating
test reports with Jenkins CI. This resides at `test/reports/results.xml`.
