
var mysql  = require('mysql');  
 
var connection = mysql.createConnection({     
  host     : 'localhost',       
  user     : 'root',              
  password : '09701540325',       
  port: '3306',                   
  database: 'playstore', 
}); 

function limitgoods(req, res, next) {
  return new Promise((resolve, reject) => {
    let Sizes = parseInt(req.query.pageSize)
    let page = (parseInt(req.query.page)-1)*Sizes
    let searchQuery = req.query.searchQuery
    let sql = `select id,category_id,name,goods_brief,retail_price,list_pic_url from nideshop_goods order by id desc limit ${page},${Sizes}` 
    if (searchQuery) {
      sql = `select id,category_id,name,goods_brief,retail_price,list_pic_url from nideshop_goods where name LIKE '%${searchQuery}%' limit ${page},${Sizes}` 
    }
    connection.query(sql, function (err, result) {
          if (err) {
            resolve({code: 1, err: err});
          } else {
            resolve({code: 0, result: result});
          }
        })  
  })
}
function tatalgoods(req, res, next) {
  return new Promise((resolve, reject) => {
    let searchQuery = req.query.searchQuery
    let sql = `select count(*) as tatal from nideshop_goods`
    if (searchQuery) {
      sql = `select count(*) as tatal from nideshop_goods where name LIKE '%${searchQuery}%'`
    }
    connection.query(sql, function (err, result) {
      if (err) {
        resolve({code: 1, err: err});
      } else {
        resolve({code: 0, result: result});
      }
    })  
  })
}
connection.connect();
async function goods(req, res, next) {
  let data  = await limitgoods(req, res, next)
  let tataldata  = await tatalgoods(req, res, next)
  if (data.code === 0 && tataldata.code === 0) {
    res.json({
        code: 0,
        data:{ 
            result: data.result,
            tatal: tataldata.result[0].tatal       
        },
        message: '成功'
    })
  } else {
    if (data.code !== 0) {
      return next(data.err);
    } else {
      return next(tataldata.err);
    }
  }
}

function MaxId(req, res, next) {
  return new Promise((resolve, reject) => {
    let sql = 'select max(id) as maxId from nideshop_goods'
    connection.query(sql, function (err, result) {
      if (err) {
        return next(err)
      } else {
        resolve({code: 0, maxId: result[0].maxId});
      }
    })  
  })
}

async function addGood(req, res, next) {
  debugger
  let name = req.body.name
  let {maxId} = await MaxId(req, res, next);
  maxId++
  let category_id = req.body.category_id
  let goods_brief = req.body.goods_brief
  let list_pic_url = req.body.list_pic_url
  let retail_price = req.body.retail_price
  let sql = `insert into nideshop_goods (id,category_id,name,goods_brief,list_pic_url,retail_price) values (${maxId},${category_id},'${name}','${goods_brief}','${list_pic_url}','${retail_price}')`
  connection.query(sql, function (err, result) {
    if (err) {
      return next(err); 
    } else {
      res.json({
          code: 0,
          data:{ 
            result: result              
          },
          message: '新增成功'
      })
    }
  })  
}

function detailGood(req, res, next) {
  let id = req.query.id
  let sql = `select * from nideshop_goods where id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      return next(err); 
    } else {
      res.json({
          code: 0,
          data:{ 
            result: result              
          },
          message: '查询成功'
      })
    }
  })  
}

function updatedGood(req, res, next) {
  let id = req.body.goodId
  let name = req.body.name
  let goods_brief = req.body.goods_brief
  let list_pic_url = req.body.list_pic_url
  let retail_price = req.body.retail_price
  let sql = `update nideshop_goods set name='${name}',goods_brief='${goods_brief}',list_pic_url='${list_pic_url}',retail_price='${retail_price}' where id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      return next(err); 
    } else {
      res.json({
          code: 0,
          data:{ 
            result: result              
          },
          message: '更新数据成功'
      })
    }
  })  
}

function deleteGood(req, res, next) {
  let id = req.body.id
  let sql = `delete from nideshop_goods where id=${id}`
  connection.query(sql, function (err, result) {
    if (err) {
      return next(err); 
    } else {
      res.json({
          code: 0,
          data:{          
          },
          message: '数据删除成功'
      })
    }
  })  
}

module.exports = {
    goods,
    addGood,
    detailGood,
    updatedGood,
    deleteGood
}