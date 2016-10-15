var webSocketUrl = "wss://api.artik.cloud/v1.1/websocket?ack=true";
var device_id;
var device_token;

var WebSocket = require('ws');
var isWebSocketReady = false;
var ws = null;

var fs = require('fs');

var puts = require('sys').puts;

setInterval(function() {
    sendSensorValueToArtikCloud();
}, 2000);

function getTimeMillis(){
    return parseInt(Date.now().toString());
}

function start() {
    //Create the WebSocket connection
    isWebSocketReady = false;
    ws = new WebSocket(webSocketUrl);
    ws.on('open', function() {
        console.log("WebSocket connection is open ....");
        register();
    });
    ws.on('message', function(data) {
       console.log("Received message: " + data + '\n');
       handleRcvMsg(data);
    });
    ws.on('close', function() {
        console.log("WebSocket connection is closed ....");
        //exitClosePins();
    });
}

function register(){
    console.log("Registering device on the WebSocket connection");
    var device_data = fs.readFileSync('../data/device_info.json');
    var parsed_data = JSON.parse(device_data);
    device_id = parsed_data.did;
    device_token = parsed_data.token;
    console.log('Selected device :'+parsed_data.dname);
    try{
        var registerMessage =
           '{"type":"register", "sdid":"'+device_id+'", "Authorization":"bearer '+device_token+'", "cid":"'+getTimeMillis()+'"}';
        console.log('Sending register message ' + registerMessage + '\n');
        ws.send(registerMessage, {mask: true});
        isWebSocketReady = true;
    }
    catch (e) {
        console.error('Failed to register messages. Error in registering message: '
        + e.toString());
    }
}

function handleRcvMsg(msg){
    var msgObj = JSON.parse(msg);
    var msgData = msgObj.data;
    if (msgObj.type != "action") return; //Early return;

    var actions = msgObj.data.actions;
    var actionName = actions[0].name;
    console.log("The received action is " + actionName);
}

function sendSensorValueToArtikCloud(){
  try{
        ts = ', "ts": '+getTimeMillis();
        var humidity = Math.floor((Math.random() * 100) + 1);
        //file input
        var law_data = fs.readFileSync('../data/data.json');
        var data = JSON.parse(law_data);
        var payload = '{"sdid":"'+device_id+'"'+ts+', "data": '+JSON.stringify(data)+', "cid":"'+getTimeMillis()+'"}';
        console.log('Sending payload ' + payload + '\n');
        ws.send(payload, {mask: true});
    } catch (e) {
        console.error('Error in sending a message: ' + e.toString() +'\n');
    }
}

function exitClosePins() {
    console.log('Exit and destroy all pins!');
    process.exit();
}

start();
                 


