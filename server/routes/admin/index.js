module.exports = app => {
  const express = require('express')
  // express的子路由，用于增删改查
  const router = express.Router({
    mergeParams: true
  })

  const Category = require('../../models/Category')
  const Article = require('../../models/Article')

  router.post('/articles', async (req, res) => {
    const model = await Article.create(req.body)
    console.log('post articles', model)
    res.send(model)
  })

  router.post('/categories', async (req, res) => {
    const model = await Category.create(req.body)
    console.log('post categories', model)
    res.send(model)
  })

  router.get('/categories', async (req, res) => {
    const items = await Category.find().limit(100)
    res.send(items)
  })

  app.use(
    '/admin/api/rest',
    router
  )
}