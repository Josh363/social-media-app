const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Question = require('../../models/Question')

//@route GET api/questions/:topicID
//@desc Get all questions for the topic id
//@access Public
router.get('/:topic_id', async (req, res) => {
  try {
    const questions = await Question.find({ topic: req.params.topic_id }).sort({
      views: -1,
    })
    res.json(questions)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route Post api/questions/:topicId
//@desc Create a new question
//@access Private
router.post(
  '/:topic_id',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { text, views } = req.body
    //format question so that each word starts with an uppercase
    let formattedQuestion = text
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const question = await Question.findOne({ text: formattedQuestion })
    //check if question already exists
    if (question) {
      return res.status(400).json({ msg: 'Topic already exists' })
    }

    try {
      const newQuestion = new Question({
        text: formattedQuestion,
        views,
        user: req.user.id,
        topic: req.params.topic_id,
      })

      const question = await newQuestion.save()

      res.json(question)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route Delete api/questions
//@desc Delete Question and Answer
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //find question by id
    const question = await Question.findById(req.params.id)
    //Check if question exists
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' })
    }
    //Remove question
    await question.remove()
    res.json({ msg: 'Question deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
