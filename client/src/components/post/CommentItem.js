import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import { removeComment } from '../../actions/post'

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  removeComment,
}) => (
  <div className='comment-card card-panel'>
    <div className='img-container center'>
      <Link to={`/profile/${user}`}>
        <img className='small circle' src={avatar} alt='' />
        <h4 className='lead'>{name}</h4>
      </Link>
    </div>
    <div className='text-container'>
      <p className='m-1'>{text}</p>
      <div className='divider'></div>
      <div className='bottom-corner'>
        <p className='post-date grey-text text-lighten-1'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => removeComment(postId, _id)}
            type='button'
            className='btn red accent-2 left-m'
          >
            X
          </button>
        )}
      </div>
    </div>
  </div>
)

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  removeComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { removeComment })(CommentItem)
