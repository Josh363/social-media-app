import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { addLike, deleteLike, deletePost } from '../../actions/post'

const PostItem = ({
  showActions,
  addLike,
  deleteLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
}) => {
  return (
    <div className='row card post'>
      <div className='card-image center col s3'>
        <Link to='/profile'>
          <img className='post-img' src={avatar} alt='' />
          <h4 className='lead'>{name}</h4>
        </Link>
      </div>
      <div className='col s9'>
        <div className='card-content'>
          <p>{text}</p>
        </div>
        <div className='card-action'>
          {showActions && (
            <Fragment>
              <button
                onClick={() => addLike(_id)}
                type='button'
                className='btn grey lighten-1 col s12 m5'
              >
                <i className='fas fa-thumbs-up'></i>{' '}
                {likes.length > 0 && <span>{likes.length}</span>}
              </button>
              <button
                onClick={() => deleteLike(_id)}
                type='button'
                className='btn grey lighten-1 col s12 m5'
              >
                <i className='fas fa-thumbs-down'></i>
              </button>
            </Fragment>
          )}
          <p className='col s12 grey-text text-lighten-1'>
            Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
          </p>
          {showActions && (
            <Fragment>
              <Link to={`/posts/${_id}`} className='btn blue col s12 m10'>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
              {!auth.loading && user === auth.user._id && (
                <button
                  onClick={() => deletePost(_id)}
                  type='button'
                  className='btn red accent-2 col s12 m10 center'
                >
                  <i className='fas fa-times'></i>
                </button>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </div>
  )
}

PostItem.defaultProps = {
  showActions: true,
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { addLike, deleteLike, deletePost })(
  PostItem
)
