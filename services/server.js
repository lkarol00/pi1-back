const express = require('express');
const mqtt_connection = require('../controller/connection');

const studentModel = require('../models/student');
const courseModel = require('../models/course');
const sessionModel = require('../models/session');
const loginModel = require('../models/login');

const app = express();
const cors = require('cors');

app.use(cors({origin: 'http://localhost:4200'}));

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
});

app.get('/students/course/', (req, res) => {
  studentModel.getStudentsByCourse(req.query, (response) => res.send(response));
});

app.get('/students', (req, res) => {
  studentModel.getStudents(req.query, (response) => res.send(response));
});

app.get('/courses', (req, res) => {
  courseModel.getCourses(req.query, (response) => res.send(response));
});

app.get('/connect', (req, res) => {
  mqtt_connection.connect(req.query, (response) => res.send(response));
});

app.get('/session', (req, res) => {
  sessionModel.getSessionsByStudent(req.query, (response) => res.send(response));
});

app.post('/signin', (req, res) => {
  if (req.query.email && req.query.password){
    loginModel.userExist(req.query, (response) => {
      if (response.length == 0) res.send("The email doesn't exist");
      else {
        loginModel.verifyUser(req.query, (resp) => {
          if (resp.length == 0) res.send("Wrong email or password!");
          else res.send(resp);
        });
      }
    });
  } else res.send("It's missing email or password!");
}); 

// use it before all route definitions


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});