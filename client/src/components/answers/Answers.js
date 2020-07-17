import React, { Fragment, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Spinner from '../layouts/Spinner'
import {
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
  setCurrentAnswer,
  setCurrentComment,
} from '../../actions/answer'
import { getQuestion } from '../../actions/question'

const Answers = ({
  match,
  setCurrentAnswer,
  setCurrentComment,
  getQuestion,
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
  answer: { answers, loading, currentAnswer, currentComment },
  question,
  auth,
}) => {
  //get answers and question
  useEffect(() => {
    getAnswers(match.params.questionId)
    getQuestion(match.params.questionId)
    //eslint-disable-next-line
  }, [])
  //get current answer if not null
  useEffect(() => {
    if (currentAnswer) setAnswer(currentAnswer.text)
  }, [currentAnswer])
  //get current comment if not null
  useEffect(() => {
    if (currentComment) setComment(currentComment.text)
  }, [currentComment])

  const [answer, setAnswer] = useState('')
  const [comment, setComment] = useState('')

  if (loading || answers === null || question.question === null) {
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
        <form
          onSubmit={(e) => {
            e.preventDefault()
            addAnswer({ text: answer }, match.params.questionId)
            setAnswer('')
          }}
        >
          <div className='input-field'>
            <textarea
              placeholder='Place Your Answer Here'
              name='answer'
              className='materialize-textarea'
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            ></textarea>
            <small>Try to be as concise as possible</small>
            <div className='submit-button'>
              <input type='submit' className='btn orange' />
            </div>
          </div>
        </form>
      </div>
      {!question.loading && question.question !== null && (
        <div className='question-box card-panel'>
          <h1 className='lead'>{question.question.text}</h1>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut quod
            accusamus possimus commodi odit accusantium impedit quae magnam illo
            est repellendus atque, neque illum fugiat nihil sunt laborum ullam
            autem.
          </p>
        </div>
      )}
      {!loading && answers.length === 0 ? (
        <p>There are no answers to show at this time</p>
      ) : (
        answers.map((answer) => (
          <div key={answer._id} className='answer-box card-panel'>
            <p>
              Answer by {answer.name}
              <a
                href='#!'
                onClick={() => deleteAnswer(answer._id)}
                className='tooltip'
              >
                <i className='material-icons right grey-text'>delete</i>
                <span className='tooltiptext'>Delete Answer</span>
              </a>
              <a
                href='#!'
                onClick={() => setCurrentAnswer(answer)}
                className='tooltip'
              >
                <i className='material-icons right blue-text'>build</i>
                <span className='tooltiptext'>Update Answer</span>
              </a>
            </p>
            <p>{answer.text}</p>
            <div className='comment-form card-panel'>
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  addComment(answer._id, { text: comment })
                  setComment('')
                }}
              >
                <div className='input-field'>
                  <textarea
                    placeholder='Place Your Comment Here'
                    name='comment'
                    className='materialize-textarea'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>
                  <small>Try to be as concise as possible</small>
                </div>
                <div className='submit-button'>
                  <input type='submit' className='btn blue' />
                </div>
              </form>
            </div>
            {answer.comments.length === 0 ? (
              <p>There are no comments at this time...</p>
            ) : (
              answer.comments.map((comment) => (
                <div key={comment._id} className='comment-box card-panel'>
                  <p>{comment.name}</p>
                  {!auth.loading && comment.user === auth.user._id && (
                    <Fragment>
                      <a
                        href='#!'
                        onClick={() => removeComment(answer._id, comment._id)}
                        className='tooltip'
                      >
                        <i className='material-icons right grey-text'>delete</i>
                        <span className='tooltiptext'>Delete Comment</span>
                      </a>
                      <a
                        href='#!'
                        onClick={() => setCurrentComment(comment)}
                        className='tooltip'
                      >
                        <i className='material-icons right blue-text'>build</i>
                        <span className='tooltiptext'>Update Comment</span>
                      </a>
                    </Fragment>
                  )}

                  <p>{comment.text}</p>
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
  getQuestion: PropTypes.func.isRequired,
  setCurrentAnswer: PropTypes.func.isRequired,
  setCurrentComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  answer: state.answer,
  question: state.question,
  auth: state.auth,
})

export default connect(mapStateToProps, {
  setCurrentComment,
  setCurrentAnswer,
  getQuestion,
  getAnswers,
  addAnswer,
  deleteAnswer,
  addComment,
  removeComment,
})(Answers)
