import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const Land = ({ isAuthenticated }) => {
  //Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />
  }

  return (
    <section className='landing row center'>
      <h1 className='land-title'>DevSpot</h1>
      <p className='lead'>
        Social media site that allows you to connect with other developers, show
        off your profile/portfolio, and ask other developers questions.
      </p>
      <div className='center'>
        <Link
          to='/register'
          className='btn land-btn red accent-2 waves-effect waves-light'
        >
          Sign Up
        </Link>
        <Link
          to='/login'
          className='btn land-btn red accent-2 waves-effect waves-light'
        >
          Login
        </Link>
      </div>
      <div className='icon-showcase'>
        <div className='icon-1 col s4'>
          <i className='large material-icons red accent-2'>account_box</i>
          <p>Find other Developers</p>
        </div>
        <div className='icon2 col s4'>
          <i className='large material-icons blue'>insert_chart</i>
          <p>Get Access to useful content</p>
        </div>
        <div className='icon3 col s4'>
          <i className='large material-icons red accent-2'>build</i>
          <p>Build lasting relationships</p>
        </div>
      </div>
    </section>
  )
}

Land.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
})

export default connect(mapStateToProps)(Land)
