const express = require('express')

const app = express()

// 使用跨域模块
app.use(require('cors')())

// 托管静态文件
app.use('/uploads', express.static(__dirname + '/uploads'))

// 加上处理接收(json)数据req.body 所需的express中间件
app.use(express.json())
require('./plugins/db')(app)
require('./routes/admin')(app)


app.listen(3000, function () {
  console.log('App listening on port 3000 !')
})