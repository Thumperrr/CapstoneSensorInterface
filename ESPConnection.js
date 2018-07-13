
var net = require('net')
var client = new net.Socket();

var ip = '127.0.0.1';
var port = 80;
var reconnectTimer = null;
var dataCallback = function() {};

var chunk = '';

var connect = function() {
    client.connect(port, ip, function() {
        console.log('Connected to ' + ip + ":" + port);
        if(reconnectTimer) {
            clearInterval(reconnectTimer);
            reconnectTimer = null;
        }
    });
}

var reconnect = function() {
    if(!reconnectTimer) {
        reconnectTimer = setInterval(function() {
            connect();
        }, 5000);
    }
}

client.on('data', function(data) {
    //dataCallback(data);
    chunk += data.toString('utf8');
    d_index = chunk.indexOf(';');
    while (d_index > -1) {
        try {
            string = chunk.substring(0,d_index); // Create string up until the delimiter
            console.log("Received: " + string);
            json = JSON.parse(string); // Parse the current string
            dataCallback(json); // Function that does something with the current chunk of valid json.
        } catch(e) {}
        chunk = chunk.substring(d_index+1); // Cuts off the processed chunk
        d_index = chunk.indexOf(';'); // Find the new delimiter
    }
});

client.on('close', function() {
    console.log("Connection closed");
    reconnect();
});

client.on('error', function(err) {
    console.log(err);
    reconnect();
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

    emit: function(jsonData) {

    }
};
