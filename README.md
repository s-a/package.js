# package.js
[![Build Status](http://img.shields.io/travis/s-a/package.js.svg)](https://travis-ci.org/s-a/package.js) 
[![Coverage Status](https://coveralls.io/repos/s-a/package.js/badge.svg)](https://coveralls.io/r/s-a/package.js) 
[![Codacy Badge](https://www.codacy.com/project/badge/aa693627f7f2424db1fa0cc2871f1aa5)](https://www.codacy.com/app/stephanahlf/package-js) 
[![NPM Version](http://img.shields.io/npm/v/package.js.svg?style=flat)](https://www.npmjs.org/package/package.js) 
[![NPM Downloads](https://img.shields.io/npm/dm/package.js.svg)](https://www.npmjs.org/package/package.js)  

[![Dependencies](https://img.shields.io/david/s-a/package.js.svg)](https://www.npmjs.org/package/package.js)
[![Development Dependencies](https://img.shields.io/david/dev/s-a/package.js.svg)](https://www.npmjs.org/package/package.js)

## Open your node apps for plugin developers
package.js scans the given ```packageDirectories``` for your installed application packages and creates an instance by ```require```ing the main JavasScript file if a ```package.json``` file was found which contains expected package identifier(s). In the example case let us say ```{pandaPackage : true}```.
package.js will pass the ```packageContstructorSettings``` to the ```new``` ```require```d node module.  
This implements an easy way to distribute packages akka addons or plugins for node applications via NPM or other package distribution networks.  


## Installation
```npm install package.js --save;```  

## Example
```
var path = require('path');
var events = require('events');
var packageController = require("package.js");

var CustomApp = function  () {
	this.events = new events.EventEmitter();
	return this;
};

var customApp = new CustomApp();

packageController.autoload({
	debug: true,
	identify: function() {
		return this.pandaPackage = true;
	},
	directories: [path.join(__dirname, "node_modules")],
	packageContstructorSettings: {app:customApp}
});
```
To identify all application packages the method ```autoload``` expects a custom method called ```identify``` which will be executed for each package with the context  of the package itself. So far you have access there to the following properties: 
 - ```this.dir``` - The package directory.
 - ```this.meta``` - The package meta data fetched from its ```package.json```.  
A package is marked as identified if ```identify()``` returns ```true (boolean)```.  
A detailed demo of usage can be found in the [library tests](/test/main.js). 

## Application Packages 
Each package must contain a file called [```package.json```](/test-packages/package-1/package.json) which is normaly used by NPM but maybe with an extra field to identify you application plugins.  
[Full example package](/test-packages/package-1/)

## [Contributing](/CONTRIBUTING.md)

## [License](/LICENSE.md)
Copyright (c) 2015 Stephan Ahlf <stephan.ahlf@gmail.com>  
This software is dual licensed under MIT and GNU GENERAL PUBLIC LICENSE Version 3.  

[<img src="https://s-a.github.io/license/img/mit.svg" />](/LICENSE.md#mit "Massachusetts Institute of Technology (MIT)") 
[<img src="https://s-a.github.io/license/img/gpl-3.0.svg" />](/LICENSE.md#gpl-30 "GNU GENERAL PUBLIC LICENSE Version 3")