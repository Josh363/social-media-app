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
  [auth, [body('text', 'Text is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { text, views } = req.body
    //format topic so that each word starts with an uppercase
    let formattedTopic = text
      .trim()
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')

    const topic = await Topic.findOne({ text: formattedTopic })
    //check if topic already exists
    if (topic) {
      return res.status(400).json({ msg: 'Topic already exists' })
    }

    try {
      const newTopic = new Topic({
        text: formattedTopic,
        views,
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

//@route Delete api/profile
//@desc Delete profile, user and posts
//@access Private
router.delete('/:id', auth, async (req, res) => {
  try {
    //find topic by id
    const topic = await Topic.findById(req.params.id)
    //Check if post exists
    if (!topic) {
      return res.status(404).json({ msg: 'Topic not found' })
    }
    //Remove Topic
    await topic.remove()
    res.json({ msg: 'Topic deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
