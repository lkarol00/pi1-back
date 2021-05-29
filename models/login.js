const db = require('../services/db');

function verifyUser(request, callback){
    db.query(`SELECT * FROM Professor WHERE email="${request.email}" AND password="${request.password}"`, (response) => {  
        console.log(response);
        return callback(response);
    });
}

function userExist(request, callback){
    db.query(`SELECT * FROM Professor WHERE email="${request.email}"`, (response) => {  
        console.log(response);
        return callback(response);
    });
}

module.exports = { verifyUser, userExist }