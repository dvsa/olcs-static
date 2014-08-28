OLCS Frontend
=============

This is the UI framework for both the OLCS Selfserve and Internal applications

Installation
------------
Requires Node.js. Once installed, change into olcs-static directory and run:
~ npm install
~ [sudo] npm install -g grunt-cli
~ grunt compile:dev

Usage
-----
Set your 'asset_path' variable to '//olcs-static' inside your local.php override. You'll
need a vhost inside your VM mapping olcs-static in the same way as you have one for
olcs-internal, olcs-selfserve, etc.

Authors
------------
Sam Quayle Sam.Quayle@valtech.co.uk
Nick Payne Nick.Payne@valtech.co.uk
