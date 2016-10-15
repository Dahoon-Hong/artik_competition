var webSocketUrl = "wss://api.artik.cloud/v1.1/websocket?ack=true";
var device_id = "370baa4d466844a6a6c52ad5add9e031";
var device_token = "194dec9b4e374fdeb7481675dbdd4d4e";

var WebSocket = require('ws');
var isWebSocketReady = false;
var ws = null;

var fs = require('fs');

var puts = require('sys').puts;

setInterval(function() {
}, 1000);

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
//       console.log("Received message: " + data + '\n');
       handleRcvMsg(data);
    });
    ws.on('close', function() {
        console.log("WebSocket connection is closed ....");
	//exitClosePins();
    });
}

function register(){
    console.log("Registering device on the WebSocket connection");
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
    
    if (actionName.toLowerCase() == "give_water") 
    { 
	fs.writeFile('./data/water','1','utf8',function(err){console.log('give_water'); });
    }

    else if (actionName.toLowerCase() == "give_humid") 
    {
	fs.writeFile('./data/humid','1','utf8',function(err){console.log('give_humid'); });
    }
 
    else if (actionName.toLowerCase() == "give_heat") 
    {
	fs.writeFile('./data/heat','1','utf8',function(err){console.log('give_heat'); });
     }
    else if (actionName.toLowerCase() == "give_light") 
    { 
 	fs.writeFile('./data/light','1','utf8',function(err){console.log('give_light'); });

    }
    else {
        console.log('Do nothing since receiving unrecognized action ' + actionName);
    }
}

function sendSensorValueToArtikCloud(){
    try{
        ts = ', "ts": '+getTimeMillis();
        //file input
        var law_data = '{"state" : true}';
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
