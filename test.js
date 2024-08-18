const db = require('./db/database')
const sql = `select url from HotNews`
db.query(sql,(err,results)=>{
    console.log(results);
})