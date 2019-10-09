const mysql = require('mysql')

let db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'express_api'
})

db.connect()

module.exports = db