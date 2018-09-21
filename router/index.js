var express=require('express');
var router = express.Router();
//form表单需要的中间件。
//var mutipart= require('connect-multiparty');

//var mutipartMiddeware = mutipart();
//app.use(mutipart({uploadDir:'./upload_file'}));
const controllers = require('../controll')


router.post('/login', controllers.login.login.login); 
router.post('/register', controllers.login.login.register); 

router.get('/homes', controllers.home.index.homes);
router.post('/upload', controllers.upload.upload.upload);
router.post('/deleteImg', controllers.upload.upload.deleteImg);
router.get('/goods', controllers.goods.index.goods);
router.post('/addGood', controllers.goods.index.addGood);
router.get('/detailGood', controllers.goods.index.detailGood);
router.post('/updatedGood', controllers.goods.index.updatedGood);
router.post('/deleteGood', controllers.goods.index.deleteGood);

module.exports = router;