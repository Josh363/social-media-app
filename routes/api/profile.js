const express = require('express')
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

module.exports = router
