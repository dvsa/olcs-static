OLCS Static
===========

This is repo contains the styleguides, prototypes and static assets for both the internal application and external service.

Installation
------------
Requires Node.js. Once installed, change into olcs-static directory and run:
* npm install
* gem install sass (need v3.3.x or later)
* [sudo] npm install -g grunt-cli
* grunt compile:dev

Usage
-----
Set your 'asset_path' variable to '//olcs-static' inside your local.php override. You'll
need a vhost inside your VM mapping olcs-static in the same way as you have one for
olcs-internal, olcs-selfserve, etc.

Authors
-------
Edmund Reed Edmund.Reed@valtech.co.uk
Sam Quayle  Sam.Quayle@valtech.co.uk
Nick Payne  Nick.Payne@valtech.co.uk