var mysql = require('mysql');
var config = require('../config')

/* var con = mysql.createConnection({
    host: "localhost",
    database: "DB_PI",
    user: "root",
    password: "password",
    port: "3307"
  }); */
  
/*con.connect(function(err) {
  if (err) throw err;
  con.query('SELECT * FROM Student', (err,rows) => {
    if(err) throw err;
  
    console.log('Data received from Db:');
    console.log(rows);
  });
});*/

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