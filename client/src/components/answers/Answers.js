import React from 'react'
import PropTypes from 'prop-types'

const Answers = (props) => {
  const onSubmit = () => {
    console.log('submitted')
  }
  return (
    <div id='answer-modal' class='modal'>
      <div class='modal-content'>
        <h4>Modal Header</h4>
        <p>A bunch of text</p>
      </div>
      <div class='modal-footer'>
        <a href='#!' class='modal-close waves-effect waves-green btn-flat'>
          Agree
        </a>
      </div>
    </div>
  )
}

Answers.propTypes = {}

const modalStyle = {
  width: '75%',
  height: '75%',
}

export default Answers
