import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addPost } from '../../actions/post'

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addPost({ text })
    setText('')
  }

  return (
    <div>
      <h3>Create a Post</h3>
      <form className='row' onSubmit={onSubmit}>
        <div className='input-field col s12'>
          <textarea
            className='materialize-textarea'
            name='text'
            cols='30'
            rows='5'
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>
          <label for='textarea1'>Post Your Thoughts Here</label>
          <input type='submit' className='btn orange' value='Submit' />
        </div>
      </form>
    </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost })(PostForm)
