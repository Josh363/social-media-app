import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import { Link } from 'react-router-dom'
import {
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
} from '../../actions/answer'

const Answers = ({
  match,
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
  answer: { answers, loading },
}) => {
  useEffect(() => {
    getAnswers(match.params.questionId)
    //eslint-disable-next-line
  })

  if (loading || answers === null) {
    return <Spinner />
  }
  return (
    <Fragment>
      <div className='search-form'>
        <form>
          <div className='input-field'>
            <input id='search' type='search' placeholder='Seach for Answers' />
            <i className='material-icons'>close</i>
          </div>
        </form>
      </div>
      <div className='answer-form card-panel'>
        <form>
          <div className='input-field'>
            <textarea
              placeholder='Place Your Answer Here'
              name='answer'
              className='materialize-textarea'
            ></textarea>
            <small>Try to be as concise as possible</small>
          </div>
        </form>
      </div>
      <div className='question-box card-panel'>
        <h1 className='lead'>
          Place Question Here/Additional information about the question
        </h1>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quod
          accusamus possimus commodi odit accusantium impedit quae magnam illo
          est repellendus atque, neque illum fugiat nihil sunt laborum ullam
          autem.
        </p>
      </div>
      {!loading && answers.length === 0 ? (
        <p>There are no answers to show at this time</p>
      ) : (
        answers.map((answer) => (
          <div key={answer._id} className='answer-box card-panel'>
            <p>Answer by {answer.name}</p>
            <p>{answer.text}</p>
            <div className='comment-form card-panel'>
              <form>
                <div className='input-field'>
                  <textarea
                    placeholder='Place Your Comment Here'
                    name='comment'
                    className='materialize-textarea'
                  ></textarea>
                  <small>Try to be as concise as possible</small>
                </div>
              </form>
            </div>
            {answer.comments.length === 0 ? (
              <p>There are no comments at this time...</p>
            ) : (
              answer.comments.map((comment) => (
                <div key={comment._id} className='comment-box card-panel'>
                  <p>{comment.name}</p>
                  <p>{comment.text}</p>
                  <div className='divider'></div>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </Fragment>
  )
}

Answers.propTypes = {
  answer: PropTypes.object.isRequired,
  getAnswers: PropTypes.func.isRequired,
  addAnswer: PropTypes.func.isRequired,
  deleteAnswer: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  removeComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  answer: state.answer,
})

export default connect(mapStateToProps, {
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
})(Answers)
