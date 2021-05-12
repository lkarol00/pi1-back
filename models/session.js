const db = require('../services/db');
const convertDate = require('../services/utils/date');

function postSession(request, callback){
    let date = convertDate();
    db.query(`INSERT INTO Session (date, studentId, courseId, temperature, luminosity, noise) VALUES ('${date}','${request.studentId}', '${request.courseId}', '${request.temperature}', '${request.luminosity}', '${request.noise}')`, (response) => {
        return callback(response);
    });
}

function getSessionsByStudent(request, callback){
    console.log(request);
    db.query(`SELECT * FROM Session WHERE studentId=${request.studentId} AND courseId=${request.courseId}`, (response) => {
        return callback(response);
    });
}

module.exports = { postSession, getSessionsByStudent }
