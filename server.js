var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '09701540325',       
  port: '3306',                   
  database: 'cky', 
}); 
 
connection.connect();
// 新建表
// connection.query("CREATE TABLE users(id int,user varchar(255),password varchar(255),PRIMARY KEY (id))", function(err,result){
//     if(err){
//         throw err
//     }
//     else{
//         console.log("创建表成功")
//     }
// });

 // 插入
var  addSql = 'INSERT INTO users VALUES(2,"admin","123456")';
// var  addSqlParams = ['菜鸟工具', 'https://c.runoob.com','23453', 'CN'];
//增
connection.query(addSql,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log('INSERT ID:',result);        
       console.log('-----------------------------------------------------------------\n\n');  
});

// 查询
// let sql = 'select * from MyClass'
// connection.query(sql,function (err, result) {
//     if(err){
//       console.log('[SELECT ERROR] - ',err.message);
//       return;
//     }

//    console.log('--------------------------SELECT----------------------------');
//    console.log(result);
//    console.log('------------------------------------------------------------\n\n');  
// });
 
// // 更新
// let UpdataSql = 'UPDATE MyClass SET name = "aa" where name = "Tom"';
// // let UpdataSqlParams = ['菜鸟移动站', 'Tom'];
// //改
// connection.query(UpdataSql,function (err, result) {
//    if(err){
//          console.log('[UPDATE ERROR] - ',err.message);
//          return;
//    }        
//   console.log('--------------------------UPDATE----------------------------');
//   console.log('UPDATE affectedRows',result.affectedRows);
//   console.log('-----------------------------------------------------------------\n\n');
// });

// // 删除
// var delSql = 'DELETE FROM MyClass where name="tome2"';
// connection.query(delSql,function (err, result) {
//         if(err){
//           console.log('[DELETE ERROR] - ',err.message);
//           return;
//         }        
 
//        console.log('--------------------------DELETE----------------------------');
//        console.log('DELETE affectedRows',result.affectedRows);
//        console.log('-----------------------------------------------------------------\n\n');  
// });
connection.end();