var fs = require("fs");
var path = require("path");
var currentDirectoryLevel;

var PackageController = function  (setup) {
	this.loadedPlugins = [];
	this.setup = setup || {};

	return this;
}


PackageController.prototype.getInstalledPackages = function(dir, files_) {
	files_ = files_ || [];
	var files = fs.readdirSync(dir);
	for (var i = 0; i < files.length; i++) {
		var name = dir + '/' + files[i];
		if (fs.statSync(name).isDirectory()){
			if (currentDirectoryLevel <= this.config.directoryScanLevel){
				currentDirectoryLevel++;
				this.getInstalledPackages(name, files_);
			}
		} else {
			if (path.basename(name).toLowerCase() === "package.json"){
				// var package = require(name);
				// identify app package;
				// if (package[this.config.expectedPackageIdentifier[0]] && package[this.config.expectedPackageIdentifier[0]] === this.config.expectedPackageIdentifier[1]){
				// }
				files_.push(name);
			}
		}
	}
	return files_;
};


PackageController.prototype.autoload = function(config) {
	this.config = config;

	if (!this.config.directoryScanLevel){
		this.config.directoryScanLevel = 1;
	}

	if (config.expectedPackageIdentifier){
		throw "expectedPackageIdentifier is obsolete. Please use method \"identfiy\" instead.";
	}

	if (!config.identify){
		throw "Please declare a method to identify packages in form of \"identify: function(){}\". ";
	}

	var packages = [];
	if (this.config.debug){
		console.log("scanning", config.directories);
	}

	for (var i = 0; i < this.config.directories.length; i++) {
		currentDirectoryLevel = 1;
		this.getInstalledPackages(this.config.directories[i], packages);
	}

	for (i = 0; i < packages.length; i++) {
		var plugin = {
			dir: path.dirname(packages[i]),
			meta: require(packages[i])
		}

		// TODO: test if plugin was already loaded
		if (this.config.identify.bind(plugin)()){
			var pluginFileName = path.join(path.dirname(packages[i]), "index.js");
			if (this.config.debug){
				console.log("loading " + plugin.meta.name + " from " + pluginFileName);
			}
			var Plugin = require(pluginFileName);
			plugin.instance = new Plugin(config.packageContstructorSettings);
			this.loadedPlugins.push(plugin);
		}
	}
};

module.exports = new PackageController();