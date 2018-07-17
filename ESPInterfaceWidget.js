(function() {

	freeboard.addStyle('.espint-text', 'width: 5px; position:absolute; height:10px;')
	freeboard.addStyle('.espint-label', 'width: 20%;')
	var ESPInterfaceWidget = function(settings) {

		var self = this;
		var conn = require('./ESPConnection.js');


		var onTimeLabel = document.createElement('label');
		onTimeLabel.class = 'espint-label';
		onTimeLabel.innerHTML = 'On Time (s)';

		var onTimeLine = document.createElement('input');
		onTimeLine.class = 'espint-text';
		onTimeLine.type = 'text';

		var offTimeLabel = document.createElement('label');
		offTimeLabel.class = 'espint-label';
		offTimeLabel.innerHTML = 'Off Time (s)';

		var offTimeLine = document.createElement('input');
		offTimeLine.class = 'espint-text';
		offTimeLine.type = 'text';

		var speedLabel = document.createElement('label');
		speedLabel.class = 'espint-label';
		speedLabel.innerHTML = 'Speed (%)';

		var speedLine = document.createElement('input');
		speedLine.class = 'espint-text';
		speedLine.type = 'text';

		var pollPeriodLabel = document.createElement('label');
		pollPeriodLabel.class = 'espint-label';
		pollPeriodLabel.innerHTML = 'Poll Period (ms)';

		var pollPeriodLine = document.createElement('input');
		pollPeriodLine.class = 'espint-text';
		pollPeriodLine.type = 'text';

		var setButton = document.createElement('button');
		setButton.innerHTML = 'Apply Settings';

		var applySettings = function() {
			var obj = {
				ontime: parseInt(onTimeLine.value),
				offtime: parseInt(offTimeLine.value),
				speed: parseFloat(speedLine.value),
				poll_period: parseInt(pollPeriodLine.value)
			}

			console.log(JSON.stringify(obj));
			conn.send(JSON.stringify(obj) + ';');
		}

		setButton.onclick = function() {applySettings()};

		this.render = function(element) {
			$(element).empty();

			$(element)
				.append(onTimeLabel)
				.append($('</br>'))
				.append(onTimeLine)
				.append($('</br>'))
				.append(offTimeLabel)
				.append($('</br>'))
				.append(offTimeLine)
				.append($('</br>'))
				.append(speedLabel)
				.append($('</br>'))
				.append(speedLine)
				.append($('</br>'))
				.append(pollPeriodLabel)
				.append($('</br>'))
				.append(pollPeriodLine)
				.append($('</br>'))
				.append(setButton);
		}

		this.onSettingsChanged = function(newSettings) {

		}

		this.onSizeChanged = function() {

		}

		this.onCalculatedValueChanged = function(setting, newValue) {

		}

		this.onDispose = function() {

		}

		this.getHeight = function() {
			return 3.5;
		}
	}

	freeboard.loadWidgetPlugin({
		type_name: "espinterface_widget",
		display_name: "Esp Interface",
		settings: [
			{

			}
		],
		newInstance: function(settings, newInstanceCallback) {
			newInstanceCallback(new ESPInterfaceWidget(settings));
		}
	});

})();
