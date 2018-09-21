var express=require('express');
var app =express();
var router = express.Router();
var bodyParser = require('body-parser'); 
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '09701540325',       
  port: '3306',                   
  database: 'cky', 
}); 
 
connection.connect();
//引用bodyParser 这个不要忘了写
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });


/* GET home page. */
router.get('/123', function(req, res, next) {
    let sql = 'select * from users where id = ?'
    connection.query(sql,1,function (err, result) {
        if(err){
            return next(err);
        } else {
            res.json(result)
        }             
    });
});
app.use('/api', router);

//写个接口123
// app.get('/123',function(req,res){
//         let sql = 'select * from users'
//         connection.query(sql,function (err, result) {
//             if(err){
//                 console.log('[SELECT ERROR] - ',err.message);
//                 return;
//             } else {
//                 res.json(result)
//             }             
//         });
//     });
app.post('/api/login',function(req,res){
    console.log(req)
    const id = req.body.id
    console.log(id)
    const sqlStr = 'select * from users where id=?'
    connection.query(sqlStr, id, (err, results) => {
        if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
        res.json({ err_code: 200, message: results})
    })
})    
//配置服务端口
var server = app.listen(3001, function () {

    var host = server.address().address;

     var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})