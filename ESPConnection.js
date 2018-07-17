
var net = require('net')
var client = new net.Socket();

var ip = '127.0.0.1';
var port = 80;
var reconnectTimer = null;
var dataCallback = function() {};

var f = freeboard;

var chunk = '';

client.on('connect', function() {
    console.log('Connected to ' + ip + ":" + port);
    f.showLoadingIndicator(false);
    if(reconnectTimer) {
        clearInterval(reconnectTimer);
        reconnectTimer = null;
    }
});

var connect = function() {
    f.showLoadingIndicator(true);
    console.log('Attempting to connect...');
    client.connect(port, ip);
}

/*var reconnect = function() {
    if(!reconnectTimer) {
        console.log('creating connection timer');
        reconnectTimer = setInterval(function() {
            connect();
        }, 5000);
    }
}*/

client.on('data', function(data) {
    //dataCallback(data);
    chunk += data.toString('utf8');
    d_index = chunk.indexOf(';');
    while (d_index > -1) {
        try {
            string = chunk.substring(0,d_index); // Create string up until the delimiter
            //console.log("Received: " + string);
            json = JSON.parse(string); // Parse the current string
            dataCallback(json); // Function that does something with the current chunk of valid json.
        } catch(e) {}
        chunk = chunk.substring(d_index+1); // Cuts off the processed chunk
        d_index = chunk.indexOf(';'); // Find the new delimiter
    }
});

client.on('close', function() {
    console.log("Connection closed");
    // reconnect();
    f.showLoadingIndicator(true)
    client.setTimeout(2500, function() {
        console.log('Attempting connection');
        client.connect(port, ip);
    })
});

client.on('error', function(err) {
    console.log(err);
    client.destroy();
});

module.exports = {
    connect: function(IPAddress, Port) {
        ip = IPAddress;
        port = Port;
        connect();
    },

    onData: function(callback) {
        dataCallback = callback
    },

    send: function(jsonData) {
        client.write(jsonData);
    }
};
