const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AnswerSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'question',
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
  answerLikes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    },
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
      },
      avatar: {
        type: String,
      },
      commentLikes: [
        {
          user: {
            type: Schema.Types.ObjectId,
            ref: 'user',
          },
        },
      ],
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
})

module.exports = Answer = mongoose.model('answer', AnswerSchema)
