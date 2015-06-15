var fs = require("fs");
var path = require("path");

var PackageController = function  (setup) {
	this.loadedPlugins = [];
	this.setup = setup || {};

	return this;
}


PackageController.prototype.getInstalledPackages = function(root, dir, files_) {
	var relativePath = path.normalize(dir.toLowerCase()).replace(path.normalize(root.toLowerCase()), "");
	var currentDirectoryLevel = relativePath.split(path.sep).length;
	//console.log(path.sep, "@", currentDirectoryLevel, relativePath);

	files_ = files_ || [];
	var files = fs.readdirSync(dir);
	for (var i = 0; i < files.length; i++) {
		var name = path.join(dir, files[i]);
		if (fs.statSync(name).isDirectory()){
			if (currentDirectoryLevel <= this.config.directoryScanLevel){
				this.getInstalledPackages(root, name, files_);
			}
		} else {
			if (path.basename(name).toLowerCase() === "package.json"){
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
		this.getInstalledPackages(this.config.directories[i], this.config.directories[i], packages);
	}

	for (i = 0; i < packages.length; i++) {
		var plugin = {
			dir: path.dirname(packages[i]),
			meta: require(packages[i])
		}

		// TODO: test if plugin was already loaded
		if (this.config.identify.bind(plugin)()){
			var pluginFileName = null;
			if (plugin.meta.main){
				pluginFileName = path.join(path.dirname(packages[i]), plugin.meta.main);
			} else {
				pluginFileName = path.join(path.dirname(packages[i]), "index.js");
			}
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