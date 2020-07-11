import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addComment } from '../../actions/post'

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState('')

  return (
    <div className='post-form'>
      <h3 className='large'>Leave A Comment</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addComment(postId, { text })
          setText('')
        }}
        className='m-1'
      >
        <div className='input-field'>
          <textarea
            name='text'
            cols='30'
            rows='5'
            placeholder='Comment on this post'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className='materialize-textarea'
            required
          ></textarea>
        </div>
        <input type='submit' className='btn blue m-1' value='Submit' />
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

export default connect(null, { addComment })(CommentForm)
