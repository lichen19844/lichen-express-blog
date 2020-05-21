const mongoose = require('mongoose')

const AritcleSchema = new mongoose.Schema({
  title: { type: String },
  body: { type: String }
}, {
  timestamps: true
})

module.exports = mongoose.model('Article', AritcleSchema)