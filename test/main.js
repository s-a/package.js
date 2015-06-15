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
		path.join(__dirname,"..", "node_modules"), 
		path.join(__dirname, "..", "test-packages")
	];

	// wrong usage
	it('should throw expectedPackageIdentifier as obsolete.', function(){
		(function(){
			packageController.autoload({
				debug: !coverageMode,
				expectedPackageIdentifier: ["pandaPackage", true],
				directories: packageDirectories,
				packageContstructorSettings: {app:customApp}
			});
		}).should.throw();
	});

	it('should throw missing identify method error.', function(){
		(function(){
			packageController.autoload({
				debug: !coverageMode,
				directories: packageDirectories,
				packageContstructorSettings: {app:customApp}
			});
		}).should.throw();
	});



	// correct usage
	packageController.autoload({
		debug: !coverageMode,
		directoryScanLevel: 2,
		// expectedPackageIdentifier: ["pandaPackage", true], obsolete. Use identify instead.
		identify : function() {
			// console.log("testing", this.meta.name, "...");
			return !!this.meta.pandaPackage;
		},
		directories: packageDirectories,
		packageContstructorSettings: {app:customApp}
	});
});


describe('load installed application packages', function(){

	it('should fire subscribed events of package 1', function(){
		var item0 = {_id:0};
		customApp.events.emit("custom-event-0", item0);
		item0.foo.should.equal("bar");
	});

	it('should fire subscribed events of package 3', function(){
		var item = {_id:0};
		customApp.events.emit("custom-event", item);
		item.foo.should.equal("bar");
	});

	it('should respect directory scan level of autloader config', function(){
		for (var i = 0; i < packageController.loadedPlugins.length; i++) {
			var plugin = packageController.loadedPlugins[i];
			plugin.meta.name.should.not.equal("test-package-2")
		}
	});

	it('should load only two packages', function(){
		packageController.loadedPlugins.length.should.equal(2);
	});
});