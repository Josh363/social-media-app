const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuestionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  topic: {
    type: Schema.Types.String,
    ref: 'topic',
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

module.exports = Question = mongoose.model('question', QuestionSchema)
