var express=require('express');
var app =express();
var bodyParser = require('body-parser'); 
var routers = require('./router/index')
var jwt = require('jsonwebtoken');

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
 app.use(function (req, res, next) {
    // 我这里把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
    if (req.url != '/api/login' && req.url != '/api/register') {
        let token = req.headers.token;
        let secret = 'cky'
        jwt.verify(token, secret, function (err) {
            if (err){
                res.send({ code: 403, message: '登录已过期,请重新登录'});
            } else {
                next();
            }
        })
    } else {
        next();
    }
});

app.use('/api', routers);
//配置服务端口
var server = app.listen(3001, function () {

    var host = server.address().address;

     var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
})