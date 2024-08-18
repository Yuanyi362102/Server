const mysql = require('mysql')

const db = mysql.createPool({
    host:'127.0.0.1',
    user:'root',
    password:'Aa360781@@',
    database:'demo'
})

module.exports = db