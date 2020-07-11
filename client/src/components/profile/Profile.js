import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import ProfileTop from './ProfileTop'
import ProfileAbout from './ProfileAbout'
import ProfileExperience from './ProfileExperience'
import ProfileEducation from './ProfileEducation'
import ProfileGithub from './ProfileGithub'
import { getProfileById } from '../../actions/profile'

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth,
}) => {
  useEffect(() => {
    getProfileById(match.params.id)
  }, [getProfileById, match.params.id])

  return (
    <Fragment>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className='back-btn'>
            <Link className='btn orange' to='/profiles'>
              Back To Profiles
            </Link>
          </div>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <div className='edit-btn'>
                <Link to='/edit-profile' className='btn blue'>
                  Edit Profile
                </Link>
              </div>
            )}
          <div className='profile-container m-1'>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />
            <div className='profile-grid'>
              <div className='profile-exp card-panel p-1'>
                <h2 className='large'>Experience</h2>
                {profile.experience.length > 0 ? (
                  <Fragment>
                    {profile.experience.map((exp) => (
                      <ProfileExperience key={exp._id} experience={exp} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Experience Credentials</h4>
                )}
              </div>
              <div className='profile-edu card-panel p-1'>
                <h2 className='large'>Education</h2>
                {profile.education.length > 0 ? (
                  <Fragment>
                    {profile.education.map((edu) => (
                      <ProfileEducation key={edu._id} education={edu} />
                    ))}
                  </Fragment>
                ) : (
                  <h4>No Education Credentials</h4>
                )}
              </div>
            </div>
            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
})

export default connect(mapStateToProps, { getProfileById })(Profile)
