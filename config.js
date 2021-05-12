var mqtt = require('mqtt');
const env = process.env;

const config = {
  db: { 
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || 'password',
    database: env.DB_NAME || 'DB_PI',
    port: env.DB_PORT  || '3307',
    timezone: "America/Bogota" 
  },
  mqtt_options:{
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
  }
};

//listPerPage: env.LIST_PER_PAGE || 10,

module.exports = config;