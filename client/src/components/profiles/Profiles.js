import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import ProfileItem from './ProfileItem'
import { getProfiles } from '../../actions/profile'
import { Link } from 'react-router-dom'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {
  useEffect(() => {
    getProfiles()
    //eslint-disable-next-line
  }, [])

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className='profiles-heading center'>
          <h1 className='large'>Developers</h1>
          <p className='lead'>
            <i className='material-icons blue-text'>camera_front</i> Browse and
            connect with developers
          </p>
          <div className='profiles'>
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profiles found...</h4>
            )}
          </div>
        </div>
      )}
    </Fragment>
  )
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  profile: state.profile,
})

export default connect(mapStateToProps, { getProfiles })(Profiles)
