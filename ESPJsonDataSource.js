(function() {

	var ESPJsonDataSource = function (settings, updateCallback) {
		var self = this;
		var conn = require('./ESPConnection.js');

		var currentSettings = settings;

		conn.onData(updateCallback);
		conn.connect(settings.ip_address, settings.port);

		this.onSettingsChanged = function (newSettings)  {
			console.log('settings changed');
			this.currentSettings = newSettings;
//			conn.connect(newSettings.ip_address, newSettings.port);
		}

		this.onDispose = function() {

		}

		this.updateNow = function() {
		}
	}

	freeboard.loadDatasourcePlugin({
		type_name: "espjsondata",
		display_name: "ESP8266 Json Data",
		"external_scripts": [
			"ESPJsonDataSource.js"
		],
		settings: [
			{
				name: "ip_address",
				display_name: "IP Address",
				type: "text",
				description: "IP Address to ESP data source"
			},
			{
				name: "port",
				display_name: "Port",
				type: "text",
				description: "Port to connect on",
			}
		],
		newInstance: function (settings, newInstanceCallback, updateCallback) {
			newInstanceCallback(new ESPJsonDataSource(settings, updateCallback));
		}
	});
}());
