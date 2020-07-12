const express = require('express')
const router = express.Router()

//@route GET api/answers
//@desc Get all answers
//@access Public
router.get('/', (req, res) => {
  res.send('Hello Answers')
})

module.exports = router
