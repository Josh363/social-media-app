const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const auth = require('../../middleware/auth')

const User = require('../../models/User')
const Topic = require('../../models/Topic')

//@route GET api/topics
//@desc Get all topics
//@access Public
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find().sort({ views: -1 })
    res.json(topics)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route Post api/topics
//@desc Create a topic
//@access Private
router.post(
  '/',
  [
    auth,
    [
      body('text', 'Text is required').not().isEmpty(),
      body('views', 'Number of views is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const newTopic = new Topic({
        text: req.body.text,
        views: req.body.views,
        user: req.user.id,
      })

      const topic = await newTopic.save()

      res.json(topic)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
