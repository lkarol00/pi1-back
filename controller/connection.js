var mqtt = require('mqtt')
const students = require('../models/student');
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

var client = mqtt.connect('ws://localhost:1883', options);

function connect(request, callback) {
  //client.on('connect', () => {
    client.subscribe('/data', err => { if(err) console.log(err)});
    /*db.query("SELECT * FROM Student", (response) => {
      //console.log(response);
      return callback(response);
    });*/
    
    //let idStudents = [1, 2, 3];
    
    let activate = `{"courseId": ${request.courseId}, "message": "ACTIVATE"}`
    client.publish(`/estudiante/${request.studentId}`, activate);
    /*idStudents.forEach((id) => {
      client.publish(`/estudiante/${id}`, activate);
    });*/
  //});
}

 
client.on('message', (topic, message) => {
  if (topic == "/data"){
    let resultJson = JSON.parse(message);  //2021-05-05 02:22:24
    db.query(`INSERT INTO Session (date, studentId, courseId, temperature, movement, noise) VALUES ('2021-05-05 02:22:25', '${resultJson.studentId}', '${resultJson.courseId}', '${resultJson.temperature}', '${resultJson.movement}', '${resultJson.noise}') `);
    console.log(resultJson);  
  }
  
});

// client.end()
module.exports = { connect }