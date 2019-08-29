const express = require("express")
const router = express.Router()
const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('./api.db', function () {
    sqlStr = "create table if not exists api (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT, router TEXT,method TEXT , json TEXT)"
    db.run(sqlStr, function (err) {
        if (err) {
            console.log('err create db')
        } else {
            console.log('success create db')

        }
    })
})



router.get('/getrouter', function (req, res) {
    let sqlStr1 = `SELECT * FROM api`
    db.all(sqlStr1, function (err, result) {
        // console.log(result)
        // console.log(err)
        if (err) {
            res.send({
                state: 'fail',
                data: []
            })
        } else {
            // console.log(result)
            res.send({
                state: 'success',
                data: result
            })
        }

    })

})

router.post('/addrouter', function (req, res) {
    console.log('addRouter',req.body)
    let insertStr = `INSERT INTO api (id,name,router,method,json) VALUES(NULL, '${req.body.name}','${req.body.router}','${req.body.method}','${JSON.stringify(req.body.json)}')`
    let searchStr = `SELECT * FROM api WHERE router = '${req.body.router}' AND method = '${req.body.method}'`
    db.all(searchStr, function (err, result) {
        if (err) {
            res.send({
                state: 'fail',
                description: 'fail at search sql Str',
                data: []
            })
        } else {
            if (result.length > 0) {
                res.send({
                    state: 'fail',
                    description: 'fail at Same Router',
                    data: []
                })

            } else {
                console.log(insertStr)
                db.run(insertStr, function (errInsertStr, insertResult) {
                    console.log(errInsertStr)
                    if (err) {
                        res.send({
                            state: 'fail',
                            description: 'fail at insert Router',
                            data: []
                        })
                    } else {
                        res.send({
                            state: 'success',
                            data: []
                        })
                    }

                })

            }

        }

    });
})

router.post('/deleterouter', function (req, res) {
    json = req.body
    // console.log('deleteRouter')
    if (json.id === null) {
        res.send({
            state: 'fail',
            description:'id empty',
            data: []
        })
        return
    }
    let sqlStr = `DELETE FROM api WHERE ID = '${json.id}';`
    // console.log(sqlStr)
    db.run(sqlStr, function (err) {
        if (err) {
            res.send({
                state: 'fail',
                data: []
            })
        } else {
            res.send({
                state: 'success',
                data: []
            })
        }

    })

})

router.post('/queryrouterapi', function (req, res) {
    json = req.body
    if (json.id === null) {
        res.send({
            state: 'fail',
            description: 'api input empty',
            data: []
        })
        return
    }
    let sqlStr = `SELECT * FROM api WHERE router = '${json.router}' AND method = '${json.method}'`
    // console.log(sqlStr)
    db.all(sqlStr, function (err, result) {
        if (err) {
            // console.log(err)
            res.send({
                state: 'fail',
                description:'fail at query api router',
                data: []
            })
        } else {
            // console.log(result)
            if (result.length > 0) {
                res.send({
                    state: 'success',
                    data: result
                })
            } else {
                res.send({
                    state: 'success',
                    data: []
                })
            }

        }

    })
})


module.exports = router;