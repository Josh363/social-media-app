const express = require('express')
const request = require('request')
const config = require('config')
const router = express.Router()
const auth = require('../../middleware/auth')
const { body, validationResult } = require('express-validator')

const Profile = require('../../models/Profile')
const User = require('../../models/User')

//@route GET api/profile/me
//@desc Get current user's profile
//@access Private
router.get('/me', auth, async (req, res) => {
  try {
    //find user profile with user is from auth middleware
    const profile = await Profile.findOne({ user: req.user.id })
      //populate with data from user model
      .populate('user', ['name', 'avatar'])
    //if no profile exists for user
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' })
    }
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route Post api/profile
//@desc Create or update user profile
//@access Private
router.post(
  '/',
  [
    auth,
    [
      body('status', 'Status is required').not().isEmpty(),
      body('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin,
    } = req.body

    //Build profile object
    const profileFields = {}
    //Set user according to token id
    profileFields.user = req.user.id
    //Set rest of the fields by checking if they exist
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    //turn skills into array/trim whitespace
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim())
    }

    //Build social object
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    try {
      let profile = await Profile.findOne({ user: req.user.id })
      if (profile) {
        //if profile exists, then update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        )

        return res.json(profile)
      }
      //Create new profile if one does not exist
      profile = new Profile(profileFields)
      await profile.save()
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route GET api/profile
//@desc Get all profiles
//@access Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    res.json(profiles)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route GET api/profile/user/:user_id
//@desc Get profile by user ID
//@access Public
router.get('/user/:user_id', async (req, res) => {
  try {
    //profile user_id comes from url that is passed in from client
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar'])
    //Check if profile exists
    if (!profile) return res.status(400).json({ msg: 'Profile not found' })

    res.json(profile)
  } catch (err) {
    console.error(err.message)
    //if objectID (userid) is incorrect throw profile not found error
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' })

    res.status(500).send('Server Error')
  }
})

//@route Delete api/profile
//@desc Delete profile, user and posts
//@access Private
router.delete('/', auth, async (req, res) => {
  try {
    //@todo- remove user's posts

    //Remove profile
    await Profile.findOneAndRemove({ user: req.user.id })
    //Remove user
    await User.findOneAndRemove({ _id: req.user.id })
    res.json({ msg: 'User deleted' })
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route PUT api/profile/experience
//@desc Add profile experience
//@access Private
router.put(
  '/experience',
  [
    auth,
    [
      body('title', 'Title is required').not().isEmpty(),
      body('company', 'Company is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body

    //title: title is the same as just title
    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      //add newEdu to profile
      profile.experience = [...profile.experience, newExp]
      //save new profile to database
      await profile.save()
      //return whole profile to client
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route DELETE api/profile/experience/:exp_id
//@desc Delete experience from profile
//@access Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    //filter out deleted experience through params from client
    profile.experience = profile.experience.filter(
      (exp) => exp.id.toString() !== req.params.exp_id
    )
    //save new profile
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route PUT api/profile/education
//@desc Add profile education
//@access Private
router.put(
  '/education',
  [
    auth,
    [
      body('school', 'School is required').not().isEmpty(),
      body('fieldofstudy', 'Degree is required').not().isEmpty(),
      body('degree', 'Field of study is required').not().isEmpty(),
      body('from', 'From date is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body

    //title: title is the same as just title
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    }

    try {
      const profile = await Profile.findOne({ user: req.user.id })
      //add new edu to profile
      profile.education = [...profile.education, newEdu]
      //save profile to database
      await profile.save()
      //return whole profile to client
      res.json(profile)
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

//@route DELETE api/profile/education/:edu_id
//@desc Delete education from profile
//@access Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id })
    //filter out deleted education through params from client
    profile.education = profile.education.filter(
      (edu) => edu.id.toString() !== req.params.edu_id
    )
    //save new profile
    await profile.save()
    res.json(profile)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

//@route GET api/profile/github/:username
//@desc Get user repos from Github
//@access Public
router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' },
    }

    request(options, (error, response, body) => {
      if (error) {
        console.error(error)
      }
      if (response.statusCode !== 200) {
        res.status(404).json({ msg: 'No Github profile found' })
      }
      res.json(JSON.parse(body))
    })
  } catch (err) {
    console.error(err.message)
    return res.status(500).send('Server Error')
  }
})

module.exports = router
