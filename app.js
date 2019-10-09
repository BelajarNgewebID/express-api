const express = require('express')
const app = express()
const db = require('./Connection')

app.use(express.urlencoded({ extended: false }));

let status = 200
let message = ''

function generateString(length) {
  let result = ''
  let charas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let charasLength = charas.length
  for(let i = 0; i < length; i++) {
    result += charas.charAt(Math.floor(Math.random() * charasLength))
  }
  return result
}

app.post('/create', (req, res) => {
  req = req.body
  let id = Math.floor(Math.random() * 1000)
  let nama = req.nama
  let umur = req.umur

  let sql = `INSERT INTO users VALUES ('${id}', '${nama}', '${umur}')`
  db.query(sql, (err, result) => {
    message = "User baru telah ditambahkan"
    if(err) {
      status = 500
      message = 'Failed'
    }
    res.json({
      status: status,
      message: message
    })
  })
})

app.get('/', (req, res) => {
  let sql = `SELECT * FROM users`
  db.query(sql, (err, datas) => {
    message = 'User berhasil diambil'
    if(err) {
      status = 500
      message = err
    }
    res.json({
      status: status,
      message: message,
      data: datas
    })
  })
})

app.patch('/:userId/update', (req, res) => {
  let userId = req.params.userId
  req = req.body
  let nama = req.nama

  let sql = `UPDATE users SET nama = '${nama}' WHERE id = '${userId}'`
  db.query(sql, (err, datas) => {
    message = `Nama user berhasil diubah menjadi "${nama}"`
    if(err) {
      status = 500
      message = err
    }
    res.json({
      status: status,
      message: message,
    })
  })
})

app.delete('/:userId/delete', (req, res) => {
  let id = req.params.userId

  let sql = `DELETE FROM users WHERE id = '${id}'`
  db.query(sql, (err) => {
    message = `User dengan id ${id} berhasil dihapus`
    if(err) {
      status = 500
      message = err
    }
    res.json({
      status: status,
      message: message,
    })
  })
})

module.exports = app