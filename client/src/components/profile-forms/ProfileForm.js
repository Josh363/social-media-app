import React, { Fragment, useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createProfile, getCurrentProfile } from '../../actions/profile'

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: '',
}

const ProfileForm = ({
  createProfile,
  profile: { profile, loading },
  getCurrentProfile,
  history,
}) => {
  const [formData, setFormData] = useState(initialState)

  const [displaySocialInputs, toggleSocialInputs] = useState(false)

  useEffect(() => {
    if (!profile) getCurrentProfile()
    if (!loading && profile) {
      let profileData = { ...initialState }
      //compare profile properties with formData
      //if they exist, copy profile data into formData
      for (const key in profile) {
        if (key in profileData) {
          profileData[key] = profile[key]
        }
      }
      //same as above but with the profile.social object
      for (const key in profile.social) {
        if (key in profileData) {
          profileData[key] = profile.social[key]
        }
      }
      //check and format skills
      if (profile.skills) {
        profileData.skills = profile.skills.join(',')
      }
      //set formdata to profile data from backend
      setFormData(profileData)
    }
    //only load when these change
  }, [loading, getCurrentProfile, profile])

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (profile) {
      createProfile(formData, history, true)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
    } else {
      createProfile(formData, history)
    }
  }

  return (
    <Fragment>
      <h1 className='large'>
        {profile ? 'Edit Your Profile' : 'Create Your Profile'}
      </h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form onSubmit={onSubmit} className='form'>
        <div className='input-field'>
          <select name='status' value={status} onChange={onChange}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small>Give us an idea of where you are at in your career</small>
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={onChange}
          />
          <small>Could be your own company or one you work for</small>
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            value={website}
            onChange={onChange}
          />
          <small>Could be your own or a company website</small>
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={onChange}
          />
          <small>City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            value={skills}
            onChange={onChange}
          />
          <small>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
            onChange={onChange}
          />
          <small>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='input-field'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
            onChange={onChange}
            className='materialize-textarea'
          ></textarea>
          <small>Tell us a little about yourself</small>
        </div>

        <div className='m-1'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn orange'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>
        <hr />
        {displaySocialInputs && (
          <Fragment>
            <div className='input-field'>
              <i className='social fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
                onChange={onChange}
              />
            </div>

            <div className='input-field'>
              <i className='social fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
                onChange={onChange}
              />
            </div>

            <div className='input-field'>
              <i className='social fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                value={youtube}
                onChange={onChange}
              />
            </div>

            <div className='input-field'>
              <i className='social fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
                onChange={onChange}
              />
            </div>

            <div className='input-field'>
              <i className='social fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
                onChange={onChange}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn blue m-1' />
        <Link className='right btn orange m-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

ProfileForm.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
  withRouter(ProfileForm)
)
