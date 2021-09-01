var pool = require('./db');

function query(query,callback){
    pool.query(query, (err, rows) => {
        if(err) throw err;
        return callback(rows);
    });
    /*pool.getConnection(function(err,connection){
        if (err) {
        connection.release();
        throw err;
        }   
        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                callback(null, {rows: rows});
            }           
        });
        connection.on('error', function(err) {      
            throw err;
            return;     
        });
    });*/
}

module.exports = {
    query
}