var should = require('should');
var fs = require('fs');
var path = require('path');
var events = require('events');


var coverageMode = fs.existsSync("./../lib-cov/index.js");
var packageController;

try {
	packageController = require("./../lib-cov/index.js");
} catch(e){
 	packageController = require("./../lib/index.js");
}

if (coverageMode){
	console.log("coverage mode...", coverageMode);
}

/*
if (process.env.TRAVIS && process.env.NODE_ENV === "test" && process.env.COVERAGE === "1" ){
} else {
}
*/


var CustomApp = function  () {
	this.events = new events.EventEmitter();
	return this;
}



var customApp;

before(function  () {
	customApp = new CustomApp();

	var packageDirectories = [
		//path.join(__dirname,"..", "node_modules"), 
		path.join(__dirname, "..", "test-packages")
	];
	packageController.autoload({
	    "debug": true,
	    "directoryScanLevel": 1,
	    "expectedPackageIdentifier": ["pandaPackage", true],
	    "directories": packageDirectories,
	    "packageContstructorSettings": {app:customApp}
	});

	//console.log(packageController);
});


describe('load installed application packages', function(){

	it('should fire subscribed events of package 1', function(){
		var fileSystemItem = {_id:0};
		customApp.events.emit("init-filesystem-item-icons", fileSystemItem);
		fileSystemItem.icon.should.equal("fa fa-folder");
	});

	it('should respect directory scan level of autloader config', function(){
		for (var i = 0; i < packageController.loadedPlugins.length; i++) {
			var plugin = packageController.loadedPlugins[i];
			plugin.meta.name.should.not.equal("test-package-2")
		}
	});
});