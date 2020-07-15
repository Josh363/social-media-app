import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { logout } from '../../actions/auth'

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link to='/profiles'>
          <i className='material-icons right'>people</i>Profiles
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='material-icons right'>message</i>Posts
        </Link>
      </li>
      <li>
        <Link to='/topics'>
          <i className='material-icons right'>question_answer</i>Q&A
        </Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='material-icons right'>person_pin</i>Dashboard
        </Link>
      </li>
      <li>
        <Link onClick={logout} to='/login'>
          <i className='material-icons right'>vpn_key</i>
          Logout
        </Link>
      </li>
    </ul>
  )

  const guestLinks = (
    <ul className='right hide-on-med-and-down'>
      <li>
        <Link to='/profiles'>
          <i className='material-icons right'>people</i>Profiles
        </Link>
      </li>
      <li>
        <Link to='/register'>
          <i className='material-icons right'>border_color</i>Register
        </Link>
      </li>
      <li>
        <Link to='/login'>
          <i className='material-icons right'>vpn_key</i>Login
        </Link>
      </li>
    </ul>
  )

  const mobileAuthLinks = (
    <ul className='sidenav' id='mobile-menu'>
      <li>
        <Link className='sidenav-close' to='/profiles'>
          <i className='material-icons'>people</i>Profiles
        </Link>
      </li>
      <li>
        <Link className='sidenav-close' to='/posts'>
          <i className='material-icons'>message</i>Posts
        </Link>
      </li>
      <li>
        <Link className='sidenav-close' to='/dashboard'>
          <i className='material-icons'>person_pin</i>Dashboard
        </Link>
      </li>
      <li>
        <Link to='/topics' className='sidenav-close'>
          <i className='material-icons'>question_answer</i>Q&A
        </Link>
      </li>
      <li>
        <Link className='sidenav-close' onClick={logout} to='/login'>
          <i className='material-icons'>vpn_key</i>Logout
        </Link>
      </li>
    </ul>
  )

  const mobileGuestLinks = (
    <ul className='sidenav' id='mobile-menu'>
      <li>
        <Link className='sidenav-close' to='/profiles'>
          <i className='material-icons'>people</i>Profiles
        </Link>
      </li>
      <li>
        <Link className='sidenav-close' to='/register'>
          <i className='material-icons'>border_color</i>Register
        </Link>
      </li>
      <li>
        <Link className='sidenav-close' to='/login'>
          <i className='material-icons'>vpn_key</i>Login
        </Link>
      </li>
    </ul>
  )

  return (
    <Fragment>
      <div className='navbar-fixed'>
        <nav className='blue'>
          <div className='nav-wrapper cont'>
            <Link className='brand-logo' to='/'>
              <i className='material-icons'>computer</i> DS
            </Link>
            <a href='#!' data-target='mobile-menu' className='sidenav-trigger'>
              <i className='material-icons'>menu</i>
            </a>

            {!loading && (
              <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
          </div>
        </nav>
        {/*mobile and medium screen menu links */}
      </div>
      {!loading && isAuthenticated ? mobileAuthLinks : mobileGuestLinks}
    </Fragment>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
