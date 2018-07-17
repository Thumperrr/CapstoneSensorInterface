(function() {

	freeboard.addStyle('.fsw-button', 'width: 50%; height: 20px; text-align:center; magin: auto; vertical-align:middle')
	freeboard.addStyle('.fsw-text', 'width: 100%');
	var fsWidget = function(settings) {
		var self = this;
		var fs = require('fs');

		var logging = false;
		var buttonStopText = 'Stop';
		var buttonStartText = 'Start';
		var buttonText = buttonStartText;

		var fileStream = undefined;

		var currentSettings = settings;
		var button = document.createElement('button');
		var fileElement = document.createElement('button');
		fileElement.innerHTML = "Choose File";

		var fileText = document.createElement('div');
		fileText.class = 'fsw-text';

		var handleClick = function() {
			var file = fileText.innerHTML;
			if(file != '') {
				if(logging) {
					buttonText = buttonStartText;
					if(fileStream != undefined) {
						fileStream.end();
					}
				} else {
					buttonText = buttonStopText;
					fileStream = fs.createWriteStream(file, {flags: 'a'});
				}

				console.log(buttonText);
				button.innerHTML = buttonText;
				logging = !logging;

			} else {
				console.log('No file specified');
				freeboard.showDialog($('<p>No file specified</p>'), 'Data Log', 'Ok');
			}
		}

		button.onclick = function() {handleClick()};
		fileElement.onclick = function() {
			var elerem = require('electron').remote;
			var dialog = elerem.dialog;
			var path = require('path');
			var app = elerem.app;

			var toLocalPath = path.resolve(app.getPath("desktop"), path.basename(''));;
			var userChosenPath = dialog.showSaveDialog({ defaultPath: toLocalPath });

			if(userChosenPath){
				fileText.innerHTML = userChosenPath;
			}
		}

		this.render = function(element) {
			$(element).empty();

			button.innerHTML = buttonText;
			$(element)
				.append(fileElement)
				.append(button)
				.append(fileText);
		}

		this.onSettingsChanged = function(newSettings) {

		}

		this.onSizeChanged = function() {

		}

		this.onCalculatedValueChanged = function(settingName, newValue) {
			//console.log(newValue.toString());
			if(fileStream != undefined && logging) {
				//console.log('Writing to file');
				fileStream.write(newValue.toString() + '\n');
			}
		}

		this.onDispose = function() {
			fileStream.end();
		}

		this.getHeight = function() {
			return 1;
		}
	}

	freeboard.loadWidgetPlugin({
		type_name: "fs_widget",
		display_name: "File Save",
		settings: [
			{
				name: "values",
				display_name: "Values",
				type: "calculated",
				multi_input: "true"
			}
		],
		newInstance: function(settings, newInstanceCallback) {
			newInstanceCallback(new fsWidget(settings));
		}
	})

})();
