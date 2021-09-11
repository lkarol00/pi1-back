var mysql = require('mysql');
var config = require('../config')

const pool = mysql.createPool(config.db);

async function query(sql, callback) {
  //pool.getConnection(function(err, connection) {
    pool.query(sql, (err, rows) => {
      if(err) throw err;
      return callback(rows);
    });
  //});
}

module.exports = {
  query
}