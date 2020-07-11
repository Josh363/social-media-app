import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='profile card-panel'>
      <div className='prof-img-container'>
        <img src={avatar} alt='profile' className='profile-img circle' />
      </div>
      <div className='info-container'>
        <h2 className='lead'>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='m-1'>{location && <span>{location}</span>}</p>
        <Link className='btn blue' to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>
      <div className='skills-container'>
        <ul className='skills'>
          {skills
            .filter((skill, index) => index < 4)
            .map((skill, index) => (
              <li className='skill' key={index}>
                <hr />
                <i className='fas fa-check'></i> {skill}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
}

export default ProfileItem
