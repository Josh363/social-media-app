import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Answers = (props) => {
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
      <div className='answer-box card-panel'>
        <p>Answer text by</p>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Praesentium
          aliquid consequatur ipsum quisquam, incidunt temporibus dolorum
          dolores quidem unde harum earum assumenda deleniti suscipit libero,
          mollitia quia nesciunt voluptatem asperiores.
        </p>
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
        <div className='comment-box card-panel'>
          <p>Comments</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt at
            architecto cupiditate est ipsam pariatur doloremque ab veritatis
            praesentium neque, tempore libero nostrum ipsa excepturi fugit vel
            iste minus id!
          </p>
          <div className='divider'></div>
          <p>Comments</p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt at
            architecto cupiditate est ipsam pariatur doloremque ab veritatis
            praesentium neque, tempore libero nostrum ipsa excepturi fugit vel
            iste minus id!
          </p>
        </div>
      </div>
    </Fragment>
  )
}

Answers.propTypes = {}

export default Answers
