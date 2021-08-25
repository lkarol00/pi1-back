const moment = require('moment');

const convertDate = () =>{
    return moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
}

const convertSessionDate = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss');
}


module.exports = { convertDate, convertSessionDate };