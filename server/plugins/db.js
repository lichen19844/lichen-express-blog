// const express = require('express')

// const app = express()
module.exports = app => {
//  const aapp = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/lichen-express-blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  console.log('db')
}
// aapp(app)