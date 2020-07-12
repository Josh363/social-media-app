const express = require('express')
const router = express.Router()

//@route GET api/topics
//@desc Get all topics
//@access Public
router.get('/', (req, res) => {
  res.send('Hello Topics')
})

module.exports = router
