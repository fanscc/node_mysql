
var mysql  = require('mysql');  

var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '09701540325',       
  port: '3306',                   
  database: 'playstore', 
}); 
var multiparty = require('multiparty');
var fs = require('fs');
connection.connect();

function upload(req, res, next) {
    var form = new multiparty.Form({uploadDir: './nginx/nginx/www/images'});
    var user = req.headers.user;
    form.parse(req, function(err, fields, files) {
        if(err){
            res.send({
                code: 1,
                message: '上传失败'
            })
            next()
        } else {
        var inputFile = files.file[0];
        var uploadedPath = inputFile.path;
        var dstPath = './nginx/nginx/www/images/img' + inputFile.originalFilename;
            //重命名为真实文件名
        fs.rename(uploadedPath, dstPath, function(err) {
        if(err){
                    console.log('rename error: ' + err);
                } else {
                    // 存储到收据库
                    let sql = `update users set headImg='images/img${inputFile.originalFilename}' where user='${user}'`
                    connection.query(sql,function (err, result) {
                        if (err) {
                            res.send({
                                code: 1,
                                message: err
                            })
                        }else {
                            res.send({
                                code: 0,
                                data: {
                                    headerImg: `images/img${inputFile.originalFilename}`
                                },
                                message: '上传成功'
                            })
                        }
                    })
                }
            });
        }
    });
}

function deleteImg(req, res, next) {
    debugger
    let name = './upload_file/img/img'+ req.body.name
    fs.exists(name, function( exists ){
        if (exists) {
            fs.unlink(name, function(){
                res.send({
                    code: 0,
                    fileName: req.body.name,
                    message: '删除成功'
                });
            })
        } else {
            res.send({
                code: 1,
                fileName: req.body.name,
                message: '没有此文件'
            });
        }
     })
}

module.exports = {
    upload,
    deleteImg
}