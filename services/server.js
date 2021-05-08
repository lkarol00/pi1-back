const express = require('express');
const mqtt_connection = require('../controller/connection');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello from App Engine!');
  //mqtt_connection.connect('start', (response) => res.send(response));
});

app.post('/connect', (req, res) => {
  responseJson = req.query;
  console.log(req.query);
  res.send("Received");
  mqtt_connection.connect(responseJson, (response) => console.log(response));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});