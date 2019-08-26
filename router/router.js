const express = require("express")
const router= express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./api.db',function(){
    sqlStr = "create table if not exists api (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, router TEXT,method TEXT , json TEXT)"
    db.run(sqlStr,function(err){
        if(err){
            console.log('err create db')
        }else{
            console.log('success create db')

        }
    })
})



router.get('/getrouter',function(req,res){
    let sqlStr1 = `SELECT * FROM api`
    db.all(sqlStr1,function(err,result){
        // console.log(result)
        // console.log(err)
        if(err){
            res.send({
                state:'fail',
                data:[]
            })
        }else{
            // console.log(result)
            res.send({
                state:'success',
                data:result
            })
        }
        
    })
    
})

router.post('/addrouter',function(req,res){
    let str = JSON.stringify(req.body)
    console.log(str)
    const obj = {aa: 33,bb:444}
    const strObj = JSON.stringify(obj)
    let stmt = `INSERT INTO api (id,name,router,method,json) VALUES(NULL, '测试','/api/test','post','${JSON.stringify({aa: 33,bb:444})}')`;
    db.run(stmt,function(err){
        if(err){
            res.send({
                state:'fail add router',
                data:[]
            })
        }else{
            // console.log('sucess')
            res.send({
                state:'success add router',
                data:[]
            })
        }

    });
})

router.post('/deleterouter',function(req,res){
    json = req.body
    console.log('deleteRouter')
    if (json.id === null){
        res.send({
            state:'id is empty',
            data:[]
        })
        return
    }
    let sqlStr = `DELETE FROM api WHERE ID = '${json.id}';`
    console.log(sqlStr)
    db.run(sqlStr,function(err){
        if(err){
            res.send({
                state:'fail',
                data:[]
            })
        }else{
            res.send({
                state:'success',
                data:[]
            })
        }

    })

})



module.exports = router;