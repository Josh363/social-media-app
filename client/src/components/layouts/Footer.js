import React from 'react'

const Footer = () => {
  return (
    <footer className='footer center'>
      <div className='row'>
        <div className='col s6 footer-text'>
          <p>Connect with us on social media</p>
        </div>
        <div className='social col s6'>
          <a href='https://www.facebook.com/'>
            <i className='ft-icon fab fa-facebook fa-2x'></i>
          </a>
          <a href='https://twitter.com/'>
            <i className='ft-icon fab fa-twitter fa-2x'></i>
          </a>
          <a href='https://www.linkedin.com/'>
            <i className='ft-icon fab fa-linkedin fa-2x'></i>
          </a>
          <a href='https://www.youtube.com/'>
            <i className='ft-icon fab fa-youtube fa-2x'></i>
          </a>
        </div>
        <div className='col s12'>
          <p>Copyright &copy; 2020 - DevSpot</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
