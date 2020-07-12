const express = require('express')
const router = express.Router()

//@route GET api/questions/:topic..I can pass in the topic name through axios
//@desc Get all questions by topic name
//@access Public
router.get('/', (req, res) => res.send('HEllo Questions'))

//@route GET api/questions
//@desc Get all questions
//@access Public
router.get('/', (req, res) => res.send('HEllo Questions'))

//@route POST api/questions/:topic
//@desc Post or update question by topic name
//@access Private
router.post('/', (req, res) => res.send('HEllo Questions'))

//@route DELETE api/questions/:questionID
//@desc Delete a question by ID
//@access Private
router.delete('/', (req, res) => res.send('HEllo Questions'))

module.exports = router
