module.exports = app => {
  const express = require('express')
  // express的子路由，用于增删改查
  const router = express.Router({
    mergeParams: true
  })

  const Article = require('../../models/Article')

  router.post('/articles', async (req, res) => {
    const model = await Article.create(req.body)
    console.log('post articles', model)
    res.send(model)
  })

  app.use(
    '/admin/api/rest',
    router
  )
}