const express = require('express')
const db = require('../db/database')

const router = express.Router()

router.post('/feedback',(req,res)=>{
    console.log(req.body.feedback);
    const feedback = req.body.feedback
    const sql = `insert into feedback (content) values (?)`
    db.query(sql,feedback,(err,results)=>{
        if(err){
            return res.send(err)
        }
        if(results.affectedRows !== 1){
            return res.send('反馈失败')
        }
        res.send('反馈成功')
    })
})

module.exports = router