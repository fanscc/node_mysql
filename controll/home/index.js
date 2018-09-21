
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '09701540325',       
  port: '3306',                   
  database: 'playstore', 
}); 

connection.connect();

function homes(req, res, next) {
    let sql = 'select * from nideshop_ad'
    connection.query(sql,function (err, result) {
        if(err){
            return next(err);
        } else {
            res.json({
                code: 0,
                data: {
                    result:result 
                },
                message: '成功'
            })
        }             
    });
}
module.exports = {
    homes
}