const express = require("express")
const router= express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./api.db',function(){
    sqlStr = "create table if not exists api (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, router TEXT\
        ,method TEXT , json TEXT)"
    db.run(sqlStr,function(err){
        console.log('lalalla')
        if(err){
            console.log('err')
        }else{
            console.log('success create db')

        }
    })
})



router.get('/get',function(req,res,next){
    res.send(
        'lalalal'
    )
})

router.post('/addrouter',function(req,res){
    // console.log(req.body)
    let str = JSON.stringify(req.body)
    console.log(str)
    // const obj = {aa: 11}
    // const strObj = JSON.stringify(obj)
    let stmt = `INSERT INTO api VALUES(NULL, '测试','/api/test','post','${JSON.stringify({aa: 33})}')`;
    var sqlStr = 'insert into api values ("测试","/api/test","post",str)'
    db.run(stmt,function(err){
        if(err){
            console.log('err')
            console.log(11111,err)
        }else{
            console.log('sucess')
        }
    });
    // stmt.run();
    // db.run(sqlStr,function(err){
    //     if(err){
    //         console.log('err')
    //         console.log(err)
    //     }else{
    //         console.log('sucess')
    //     }
    // });
    // stmt.finalize();
    res.send({
        'lalal':'zzz1z'
    })
})


module.exports = router;