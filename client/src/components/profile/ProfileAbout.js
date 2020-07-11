import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout = ({
  profile: {
    bio,
    skills,
    user: { name },
  },
}) => {
  return (
    <div className='profile-about center card-panel p-1'>
      {bio && (
        <Fragment>
          <h2 className='large'>{name.trim().split(' ')[0]}s Bio</h2>
          <p>{bio}</p>
        </Fragment>
      )}
      <div className='divider'></div>

      <div className='center'>
        <h2 className='lead'>Skill Set</h2>
        <div className='skills'>
          {skills.map((skill, index) => (
            <div key={index} className='skill center p-1'>
              <i className='fas fa-check'></i> {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileAbout
