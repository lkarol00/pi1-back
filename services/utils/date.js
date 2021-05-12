const moment = require('moment');

const convertDate = () =>{
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}

module.exports = convertDate;