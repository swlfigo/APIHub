const express = require('express')
const router= require('./router/router')
const app = express()
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('./api.db')

// 引入json解析中间件
var bodyParser = require('body-parser');
// 添加json解析
app.use(bodyParser.json());
app.use(express.static(__dirname + '/static'))
// app.all('*', function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//     res.header("X-Powered-By",' 3.2.1')
//     res.header("Content-Type", "application/json;charset=utf-8");
//     next();
// });
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
app.use('/api',router)
app.get('/*',function(req,res){
  // console.log(req.path)
  let sqlStr = `SELECT * FROM api WHERE router = '${(req.path)}'`
  // console.log(sqlStr)
  db.all(sqlStr,function(err,result){
      if(err){
        res.send({
          state:'fail',
          data:[]
        })
      }else{
        res.send({
          state:'success',
          data:result
        })
      }
  })
  
})

app.listen(3000,function(){
    console.log('APIHUB listening on port 3000!');
})