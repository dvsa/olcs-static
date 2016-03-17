#OLCS Static

This repo contains the styleguides, prototypes and static assets for both the OLCS internal application and external service.

## Requirements

* Sass >= 3.3.x (`gem install sass`)
* Node.js v0.10.x (Use [Node Version Manager](https://github.com/creationix/nvm) to run old versions)
* Grunt (`npm install -g grunt-cli`)

## Installation

##### Clone the repo:

```
git clone https://github.com/OLCS/olcs-static.git
```

##### Install node modules:

```
npm install
```

##### Compile assets:

```
grunt compile:dev
```

If running this task complains about libsass bindings (i.e. "The `libsass` binding was not found"), it likely means you are using an incorrect Node version. To rectify, install [Node Version Manager](https://github.com/creationix/nvm) and run `nvm use` inside your project to switch to the correct Node version (v0.10.33).

## Usage

To view the compiled assets as well as continuously compile the assets as files are changes, you can run `grunt serve` to compile the assets and styleguides, run the `watch` task, and set up a local server.

Access the compiled styleguides: 

* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/selfserve/)
* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/internal/)

## Authors

* Edmund Reed Edmund.Reed@valtech.co.uk
* Sam Quayle  Sam.Quayle@valtech.co.uk
* Nick Payne  Nick.Payne@valtech.co.uk