var Package = function(config) {
	 
	var myCustomEventHandler = function(item) {
		item.foo = "bar";
	};

	config.app.events.on("custom-event", myCustomEventHandler);

	return this;
};

module.exports = Package;