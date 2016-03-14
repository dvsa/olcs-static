#OLCS Static

This repo contains the styleguides, prototypes and static assets for both the OLCS internal application and external service.

## Requirements

* Sass >= 3.3.x (gem install sass)
* Node.js 0.1.x (Use https://github.com/creationix/nvm to run multiple Node versions on your machine)
* Grunt (npm install -g grunt-cli)

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

* To view the compiled assets, you can run `grunt serve` to compile the assets and styleguides
* Access the compiled styleguides http://localhost:7001/styleguides/selfserve/ || http://localhost:7001/styleguides/internal/

## Authors

Edmund Reed Edmund.Reed@valtech.co.uk
Sam Quayle  Sam.Quayle@valtech.co.uk
Nick Payne  Nick.Payne@valtech.co.uk