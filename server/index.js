const express = require('express')

const app = express()

// 使用跨域模块
app.use(require('cors')())

// 加上处理接收(json)数据req.body 所需的express中间件
app.use(express.json())

require('./routes/admin')(app)
require('./plugins/db')(app)

app.listen(3000, function () {
  console.log('App listening on port 3000 !')
})