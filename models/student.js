const db = require('../services/db');

function getStudentsByCourse(request, callback) {
    db.query(`SELECT DISTINCT Student.id, Student.name FROM Session RIGHT JOIN Student ON Session.studentId=Student.id WHERE courseId=${request.courseId} `, (response) => {
        console.log(response);
        console.log(request);
        return callback(response);
    });
}

function getStudents(request, callback) {
    db.query(`SELECT * FROM Student`, (response) => {
        console.log(response);
        return callback(response);
    });
}

function getStudent(request, callback) {
    db.query(`SELECT * FROM Student WHERE id=${request.studentId}`, (response) => {
        console.log(response);
        return callback(response);
    });
}

module.exports = { getStudents, getStudentsByCourse, getStudent }