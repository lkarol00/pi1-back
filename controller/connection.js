var mqtt = require('mqtt');
var config = require('../config');

const students = require('../models/student');
const sessions = require('../models/session');

const db = require('../services/db');

const options = {
  clientId: 'node_client',
  username: mqtt.username,
  password: mqtt.password,
  useSSL: false,
  //onSuccess: onAction,
  //onFailure: onAction,
  protocolId: 'MQTT',
  protocolVersion: 5,
  rejectUnauthorized: false,
  clean: true,
  //reconnectPeriod: 0,
  //connectTimeout: 30 * 1000,
  protocol: 'mqtt',
  keepalive: 60,
};

var client = mqtt.connect('ws://localhost:1883', config.mqtt_options);

const connect = (request, callback) => {
  //client.on('connect', () => {});
  client.subscribe('/data', err => { if(err) console.log(err)});
  let activate = `{"courseId": ${request.courseId}, "message": "ACTIVATE"}`
  client.publish(`/estudiante/${request.studentId}`, activate);
  return callback("CONNECTED");
}

client.subscribe('/data', err => { if(err) console.log(err)});
 
client.on('message', (topic, message) => {
  if (topic == "/data"){
    try {
      let resultJson = JSON.parse(message); 
      sessions.postSession(resultJson, (res) => console.log(resultJson));
    } catch (SyntaxError) {
      console.log("Incorrect data format")
    }
  }
});

// client.end()
module.exports = { connect }