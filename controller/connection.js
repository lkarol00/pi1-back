var mqtt = require('mqtt');
var config = require('../config');

const students = require('../models/student');
const sessions = require('../models/session');

var client = mqtt.connect('mqtt://broker.hivemq.com', config.mqtt_options); //localhost:1883 mqtt://broker.hivemq.com

const connect = (request, callback) => {
  client.on('connect', () => {console.log("Hola")});
  client.subscribe('estudiantesUdeAsot1', err => { if(err) console.log(err)});
  let activate = `{"courseId": ${request.courseId}, "message": "ACTIVATE"}`;
  students.getStudentsIdsByCourse(request, (response) => {
    let studentIds = response;
    studentIds.forEach(row => {
      client.publish(`/estudiante/${row.studentId}`, activate);
    });
  });
  // client.publish(`/estudiante/${request.studentId}`, activate); // This is for one student

  return callback("CONNECTED");
}

client.subscribe('estudiantesUdeAsot1', err => { if(err) console.log(err)});
 
client.on('message', (topic, message) => {
  if (topic == "estudiantesUdeAsot1"){
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