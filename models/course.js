const db = require('../services/db');

function getCourses(request, callback){
    db.query(`SELECT * FROM Course WHERE professorId=${request.personId}`, (response) => {  // Falta el estudiante
        console.log(response);
        return callback(response);
    });
}

module.exports = { getCourses }