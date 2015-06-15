var Package = function(config) {
	 
	var customEventHandler = function(item) {
		item.foo = "bar";
	};

	config.app.events.on("custom-event-0", customEventHandler);

	return this;
};

module.exports = Package;