# package.js


## Usage:

```
var packageController = require("./../packages/package.js/");
```

The following code checks the given ```packageDirectories``` for your installed application packages and creates an instance by ```require```ing ```index.js``` if a ```package.json``` file was found in ```packageDirectories``` which contains the ```expectedPackageIdentifier```. In this case ```{pandaPackage : true}```.
package.js will pass the ```packageContstructorSettings``` to the ```new``` ```require```d node module.  
This implements an easy way to distribute packages akka addons or plugins for node application via NPM or other package distribution networks.  

```
var packageDirectories = [path.join(webRoot, "node_modules"), path.join(webRoot, "packages")];
packageController.autoload({"expectedPackageIdentifier": ["pandaPackage", true], "directories": packageDirectories, "packageContstructorSettings": {app:app}});
```


## Example package code:
```
var FileIcons = function(config) {
	 
	var getFileSystemItemIcon = function(fileSystemItem) {
		var result = "";
		if (fileSystemItem.stats.isDirectory()){
			result = "fa fa-folder";
		} else {
			result = "fa fa-file-o";
		}

		var ext = fileSystemItem.ext.toLowerCase();
		if (iconClasses[ext]){
			result = iconClasses[ext];
		}

		fileSystemItem.icon = result;
	};

	config.app.events.on("init-filesystem-item-icon", getFileSystemItemIcon);

	return this;
};

module.exports = FileIcons;
```

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