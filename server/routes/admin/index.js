module.exports = app => {
  const express = require('express')
  // express的子路由，用于增删改查
  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    console.log('post categories', model)
    res.send(model)
  })

  router.get('/', async (req, res) => {
    console.log('req.app is true ? ', req.app === res.app === app)
    let queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    if (req.Model.modelName === 'Article') {
      queryOptions.populate = 'categories'
    }
    // const items = await req.Model.find().populate('parent').limit(100)
    const items = await req.Model.find().setOptions(queryOptions).limit(200).lean()
    res.send(items)
  })

  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete('/:id', async (req, res) => {
    // req.params.id能拿到/categories/:id接到的id值
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  app.use(
    // '/admin/api/rest',
    '/admin/api/rest/:resource',
    async (req, res, next) => {
      const modelName = require('inflection').classify(req.params.resource)
      req.Model = require(`../../models/${modelName}`)
      next()
    },
    router
  )
}