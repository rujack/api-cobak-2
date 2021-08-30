const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Caursel = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
},{
  timestamps: true
})

module.exports = mongoose.model('Caursel', Caursel)