# package.js

## Open your node apps for plugin developers

[![Build Status](http://img.shields.io/travis/s-a/package.js.svg?style=flat-square)](https://travis-ci.org/s-a/package.js)
[![Coverage Status](https://coveralls.io/repos/s-a/package.js/badge.svg)](https://coveralls.io/r/s-a/package.js)
[![Codacy Badge](https://www.codacy.com/project/badge/aa693627f7f2424db1fa0cc2871f1aa5)](https://www.codacy.com/app/stephanahlf/package-js)
[![NPM Version](http://img.shields.io/npm/v/package.js.svg?style=flat)](https://www.npmjs.org/package/package.js)
[![NPM Downloads](https://img.shields.io/npm/dm/package.js.svg?style=flat)](https://www.npmjs.org/package/package.js)

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

Check out the test suites for more detailed usage examples at [https://github.com/s-a/package.js/tree/master/test](https://github.com/s-a/package.js/tree/master/test).

## License

### The MIT License (MIT)
Copyright (C) 2015 Stephan Ahlf

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

### GPLv3

Copyright (C) 2015  Stephan Ahlf

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.