import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import { getTopics, addTopic, deleteTopic } from '../../actions/topic'

const Topics = ({
  getTopics,
  addTopic,
  deleteTopic,
  topic: { topics, loading },
}) => {
  useEffect(() => {
    getTopics()
  }, [getTopics])

  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addTopic({ text })
    setText('')
  }

  if (loading || topics === null) {
    return <Spinner />
  }

  return (
    <Fragment>
      <div className='search-form'>
        <form>
          <div className='input-field'>
            <input id='search' type='search' placeholder='Seach for Topics' />
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
      <div className='add-topic card-panel'>
        <form onSubmit={onSubmit}>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Add a New Topic'
              name='text'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
          </div>
          <div className='submit-button'>
            <input type='submit' className='btn orange' />
          </div>
        </form>
      </div>
      <div className='topics-collection'>
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h4 className='center'>Topics</h4>
          </li>
          {!loading && topics.length === 0 ? (
            <p className='center'>No Topics to show...</p>
          ) : (
            topics.map((topic) => (
              <li key={topic._id} className='collection-item'>
                <Link className='blue-text' to={`/questions/${topic._id}`}>
                  {topic.text}
                </Link>
                <a
                  href='#!'
                  onClick={() => deleteTopic(topic._id)}
                  className='secondary-content'
                >
                  <i className='material-icons grey-text'>delete</i>
                </a>
              </li>
            ))
          )}
        </ul>
      </div>
    </Fragment>
  )
}

Topics.propTypes = {
  getTopics: PropTypes.func.isRequired,
  addTopic: PropTypes.func.isRequired,
  deleteTopic: PropTypes.func.isRequired,
  topic: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  topic: state.topic,
})

export default connect(mapStateToProps, { getTopics, addTopic, deleteTopic })(
  Topics
)
