import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExperience = ({
  experience: { company, title, location, current, to, from, description },
}) => {
  return (
    <Fragment>
      <div>
        <h3 className='lead'>{company}</h3>
        <p>
          <Moment format='YYYY/MM/DD'>{from}</Moment> -{' '}
          {!to ? 'Now' : <Moment format='YYYY/MM/DD'>{to}</Moment>}
        </p>
        <p>
          <b>Position: </b>
          {title}
        </p>
        <p>
          <b>Description: </b>
          {description}
        </p>
      </div>
      <div className='divider'></div>
    </Fragment>
  )
}

ProfileExperience.propTypes = {
  experience: PropTypes.object.isRequired,
}

export default ProfileExperience
