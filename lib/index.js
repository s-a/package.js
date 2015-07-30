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

PackageController.prototype.validateSettings = function() {
	if (!this.config.directoryScanLevel){
		this.config.directoryScanLevel = 1;
	}

	if (this.config.expectedPackageIdentifier){
		throw "expectedPackageIdentifier is obsolete. Please use method \"identfiy\" instead.";
	}

	if (!this.config.identify){
		throw "Please declare a method to identify packages in form of \"identify: function(){}\". ";
	}
};

PackageController.prototype.getPackageMainLibraryFile = function(lib) {
	var result = null;
	if (lib.meta.main) {
		result = path.join(lib.dir, lib.meta.main);
	} else {
		result = path.join(lib.dir, "index.js");
	}

	return result;
};

PackageController.prototype.autoload = function(config) {
	this.config = config;
	if (this.config.debug){
		console.log("scanning", config.directories);
	}
	this.validateSettings();


	var libPackageJSONFiles = [];

	for (var i = 0; i < this.config.directories.length; i++) {
		this.getInstalledPackages(this.config.directories[i], this.config.directories[i], libPackageJSONFiles);
	}

	for (i = 0; i < libPackageJSONFiles.length; i++) {
		var libPackageJSONFile = libPackageJSONFiles[i];
		var plugin = {}
		try{
			plugin.dir = path.dirname(libPackageJSONFile);
			plugin.meta = require(libPackageJSONFile);
		} catch(e){
			plugin.meta = null;
		}

		// TODO: test if plugin was already loaded
		if (this.config.identify.bind(plugin)()){
			var pluginFileName = this.getPackageMainLibraryFile(plugin);

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