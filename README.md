#OLCS Static

This repo contains the styleguides, prototypes and static assets for both the OLCS internal application and external service.

## Requirements

* Sass >= 3.3.x (`gem install sass`)
* Node.js >= v0.1
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

## Usage

To view the compiled assets as well as continuously compile the assets as files are changes, you can run `grunt serve` (or simply `grunt`) to compile the assets and styleguides, run the `watch` task, and set up a local server.

Access the compiled styleguides: 

* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/selfserve/)
* [http://localhost:7001/styleguides/selfserve/](http://localhost:7001/styleguides/internal/)

## Authors

* Edmund Reed Edmund.Reed@valtech.co.uk
* Sam Quayle  Sam.Quayle@valtech.co.uk
* Nick Payne  Nick.Payne@valtech.co.uk