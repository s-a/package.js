# package.js

## Open your node apps for plugin developers

[![Build Status](http://img.shields.io/travis/s-a/package.js.svg?style=flat-square)](https://travis-ci.org/s-a/package.js)
[![Coverage Status](https://coveralls.io/repos/s-a/package.js/badge.svg)](https://coveralls.io/r/s-a/package.js)
[![Codacy Badge](https://www.codacy.com/project/badge/aa693627f7f2424db1fa0cc2871f1aa5)](https://www.codacy.com/app/stephanahlf/package-js)
[![NPM Version](http://img.shields.io/npm/v/package.js.svg?style=flat)](https://www.npmjs.org/package/package.js)
[![NPM Downloads](https://img.shields.io/npm/dm/package.js.svg?style=flat)](https://www.npmjs.org/package/package.js)  

[![Dependencies](https://img.shields.io/david/s-a/package.js.svg)](#)
[![Development Dependencies](https://img.shields.io/david/dev/s-a/package.js.svg)](#)

## Install
```npm install package.js```  

## Usage

```
var packageController = require("./../packages/package.js/");
```

The following code scans the given ```packageDirectories``` for your installed application packages and creates an instance by ```require```ing ```index.js``` if a ```package.json``` file was found in ```packageDirectories``` which contains the ```expectedPackageIdentifier```. In this case ```{pandaPackage : true}```.
package.js will pass the ```packageContstructorSettings``` to the ```new``` ```require```d node module.  
This implements an easy way to distribute packages akka addons or plugins for node applications via NPM or other package distribution networks.  

```
var packageDirectories = [path.join(webRoot, "node_modules"), path.join(webRoot, "packages")];  
packageController.autoload({  
	"expectedPackageIdentifier": ["pandaPackage", true],  
	"directories": packageDirectories,  
	"packageContstructorSettings": {app:app}  
});
```

Each package must contain a package json which is normaly used by NPM but with an extra field.  

## Package.json example
```
{
	"name": "flying-panda-file-icons",
	"pandaPackage" : true
}
```

## Example package code
```
var FileIcons = function(config) {
	 
	var getFileSystemItemIcon = function(fileSystemItem) {
		var result = "";
		if (fileSystemItem.stats.isDirectory()){
			result = "fa fa-folder";
		} else {
			result = "fa fa-file-o";
		}

		fileSystemItem.icon = result;
	};

	config.app.events.on("init-filesystem-item-icon", getFileSystemItemIcon);

	return this;
};

module.exports = FileIcons;
```

Check out the test suites and example text package for a more detailed usage:
 - [tests](/test/main.js)
 - [example package](/test-packages/package-1/index.js)

## License

[<img src="https://s-a.github.io/license/img/mit.svg" />](https://s-a.github.io/license/?license=mit&fullname=Stephan%20Ahlf&year=2015&profile=https://github.com/s-a&projectUrl=https://github.com/s-a/package.js&projectName=package.js "") 
[<img src="https://s-a.github.io/license/img/gpl-3.0.svg" />](https://s-a.github.io/license/?license=gpl-3.0&fullname=Stephan%20Ahlf&year=2015&profile=https://github.com/s-a&projectUrl=https://github.com/s-a/package.js&projectName=package.js "")