const express = require('express')
const db = require('../db/database')

const router = express.Router()

router.get('/comment',(req,res)=>{
    const sql = `select * from comment where id = ?`
    db.query(sql,[req.query.id],(err,results)=>{
        if(err){
            // console.log(req);
            return res.send(err)
        }
        if(results.length === 0){
            // console.log(req.query.id);
            return res.send('暂无评论')
        }
        res.send(results)
    })
})

router.post('/comment',(req,res)=>{
    const sql = `insert into comment (id,content,username,pic) values (?,?,?,?)`
    db.query(sql,[req.body.id,req.body.content,req.body.username,req.body.pic],(err,results)=>{
        if(err){
            res.send(err)
        }
        if(results.affectedRows !== 1){
            res.send('发送评论失败')
        }
        res.send('ok')
    })
})

module.exports = router