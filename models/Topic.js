const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TopicSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  text: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = Topic = mongoose.model('topic', TopicSchema)
