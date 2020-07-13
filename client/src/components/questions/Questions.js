import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import {
  getQuestions,
  addQuestion,
  deleteQuestion,
} from '../../actions/question'

const Questions = ({
  match,
  getQuestions,
  addQuestion,
  deleteQuestion,
  question: { questions, loading },
}) => {
  useEffect(() => {
    getQuestions(match.params.topicId)
  }, [getQuestions, match.params.topicId])

  const [text, setText] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    addQuestion({ text }, match.params.topicId)
    setText('')
  }

  if (loading || questions === null) {
    return <Spinner />
  }

  return (
    <Fragment>
      <div className='search-form'>
        <form>
          <div className='input-field'>
            <input
              id='search'
              type='search'
              placeholder='Seach for Questions'
            />
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
      <div className='add-topic card-panel'>
        <form onSubmit={onSubmit}>
          <div className='input-field'>
            <input
              type='text'
              placeholder='Add a New Question'
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
      <Link className='btn blue' to='/questions'>
        Go Back
      </Link>
      <div className='topics-collection'>
        <ul className='collection with-header'>
          <li className='collection-header'>
            <h4 className='center'>Questions</h4>
          </li>
          {!loading && questions.length === 0 ? (
            <p className='center'>No Questions to show...</p>
          ) : (
            questions.map((question) => (
              <li key={question._id} className='collection-item'>
                <Link className='blue-text' to={`/answers/${question._id}`}>
                  {question.text}
                </Link>
                <a
                  href='#!'
                  onClick={() => deleteQuestion(question._id)}
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

Questions.propTypes = {
  getQuestions: PropTypes.func.isRequired,
  addQuestion: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
  question: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  question: state.question,
})

export default connect(mapStateToProps, {
  getQuestions,
  addQuestion,
  deleteQuestion,
})(Questions)
