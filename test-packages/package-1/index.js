var Package = function(config) {
	 
	var getFileSystemItemIcon = function(fileSystemItem) {
		var result = "";
		if (fileSystemItem._id === 0){
			result = "fa fa-folder";
		} else {
			result = "fa fa-file-o";
		}
		fileSystemItem.icon = result;
	};

	config.app.events.on("init-filesystem-item-icon", getFileSystemItemIcon);

	return this;
};

module.exports = Package;