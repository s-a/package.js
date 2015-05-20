var fs = require("fs");
var path = require("path");
var PackageController = function  () {
	this.loadedPlugins = [];
	console.log("init PackageController...");
	return this;
}


PackageController.prototype.getInstalledPackages = function(dir, files_) {
	/*//var p = path.dirname(dir.toLowerCase()).replace(/\\/g, "/");
	if (	// ignore myself
		p === __dirname
	){
		return files_;
	}*/

    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            this.getInstalledPackages(name, files_);
        } else {
    		if (path.basename(name).toLowerCase() === "package.json"){
    			var package = require(name);
    			// identify app package;
				if (package[this.config.expectedPackageIdentifier[0]] && package[this.config.expectedPackageIdentifier[0]] === this.config.expectedPackageIdentifier[1]){
    				files_.push(name);
				}
    		}
        }
    }
    return files_;
};


PackageController.prototype.autoload = function(config) {
	this.config = config;
	var packages = [];
	console.log(config.directories);
	for (var i = 0; i < this.config.directories.length; i++) {
		this.getInstalledPackages(this.config.directories[i], packages);
	}
	for (i = 0; i < packages.length; i++) {
		var meta = require(packages[i]);
		// TODO: test if plugin was already loaded
		var pluginFileName = path.join(path.dirname(packages[i]), "index.js");
		console.log("loading " + meta.name + " from " + pluginFileName);
		var Plugin = require(pluginFileName);
		this.loadedPlugins.push({
			dir: path.dirname(packages[i]),
			meta: meta,
			instance: new Plugin(config.packageContstructorSettings)
		});
	}
};

module.exports = new PackageController();