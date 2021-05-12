var mysql = require('mysql');
var config = require('../config')

async function query(sql, callback) {
  const connection = await mysql.createConnection(config.db);
  connection.query(sql, (err, rows) => {
    if(err) throw err;
    return callback(rows);
  });
}

module.exports = {
  query
}