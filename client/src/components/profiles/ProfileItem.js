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
    <div className='profile col s12 card-panel m-1'>
      <div className='prof-img-container col s12 m2'>
        <img src={avatar} alt='profile' className='profile-img circle' />
      </div>
      <div className='info-container col s12 m6'>
        <h2 className='lead'>{name}</h2>
        <p>
          {status} {company && <span>at {company}</span>}
        </p>
        <p className='m-1'>{location && <span>{location}</span>}</p>
        <Link className='btn blue' to={`/profile/${_id}`}>
          View Profile
        </Link>
      </div>
      <div className='skills-container col s12 m4'>
        <ul className='skills'>
          {skills
            .filter((skill, index) => index < 4)
            .map((skill, index) => (
              <li className='col s4 m12' key={index}>
                <hr />

                <i className='material-icons left'>assignment_turned_in</i>
                {skill}
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
