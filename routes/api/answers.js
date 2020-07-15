const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Answer = require('../../models/Answer')

//@route GET api/answers
//@desc Get all answers
//@access Private
router.get('/', auth, async (req, res) => {
  try {
    const answers = await Answer.find().sort({
      views: -1,
    })
    res.json(answers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route GET api/answers/:question_id
//@desc Get all answers and comments for the question
//@access Private
router.get('/:question_id', auth, async (req, res) => {
  try {
    const answers = await Answer.find({
      question: req.params.question_id,
    }).sort({
      views: -1,
    })
    res.json(answers)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route Post api/answers/:question_id
//@desc Create a new answer by question_id
//@access Private
router.post(
  '/:question_id',
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    //check if user already wrote an answer for this question
    const answers = await Answer.find({
      question: req.params.question_id,
    })
    if (answers.some((answer) => answer.user.toString() === req.user.id)) {
      return res
        .status(400)
        .json({ msg: 'User already wrote an answer for this question' })
    }

    const { text, views } = req.body
    //format answer
    let formattedAnswer = text.trim()

    //check if answer is a duplicate by text
    const answer = await Answer.findOne({
      text: formattedAnswer,
    })
    if (answer) {
      return res.status(400).json({ msg: 'Answer already exists' })
    }

    //Make Answer Object
    const user = await User.findById(req.user.id).select('-password')

    const newAnswer = {
      text: formattedAnswer,
      views: 0,
      user: req.user.id,
      name: user.name,
      avatar: user.avatar,
      question: req.params.question_id,
    }

    try {
      //add and save new answer object
      const answer = new Answer(newAnswer)
      await answer.save()
      res.json(answer)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route PUT api/answers/answer_id
//@desc Update the answer text and/or add views
//@access Private
router.put('/:answer_id', auth, async (req, res) => {
  const { text, views } = req.body

  if (text.trim().split('').length === 0) {
    return res.status(400).json({ msg: 'Answer must be filled out' })
  }

  //create updated answer object
  const updatedAnswer = {}

  //check if answer/views exist
  if (text) {
    //format topic so that each word starts with an uppercase
    let formattedAnswer = text
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    //check if answer already exists
    let answer = await Answer.findOne({ text: formattedAnswer })
    if (answer) {
      return res.status(400).json({ msg: 'Answer already exists' })
    }
    //place formatted answer in updatedAnswer object
    updatedTopic.text = formattedAnswer
  }
  if (views) updatedAnswer.views = views

  try {
    //update answer by answer_id
    answer = await Answer.findOneAndUpdate(
      { _id: req.params.answer_id },
      { $set: updatedAnswer },
      { new: true }
    )
    //return updated answer item
    res.json(answer)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route Delete api/answers/:answer_id
//@desc Delete Answer and comments
//@access Private
router.delete('/:answer_id', auth, async (req, res) => {
  try {
    //find answer by id
    const answer = await Answer.findById(req.params.answer_id)
    //Check if answer exists
    if (!answer) {
      return res.status(404).json({ msg: 'Answer not found' })
    }
    //Remove answer
    await answer.remove()
    res.json({ msg: 'Answer deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
