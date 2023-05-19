var mysql = require('mysql');


//設定sql連線狀態


var connhelper = mysql.createConnection({
     host: 'localhost',
     port: '8889',
     user: 'root',
     password: 'root',
     database: 'buy2_database'

});


module.exports = connhelper;