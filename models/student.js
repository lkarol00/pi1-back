const db = require('../services/db');

function getStudents(course){
    return db.query(
        `SELECT student_id, course_id FROM Session WHERE course_id=${course}`
    );
}

module.exports = { getStudents }