import React, { Fragment, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    current: false,
    to: '',
    description: '',
  })

  const [toDateDisabled, toggleDisabled] = useState(false)

  const {
    school,
    degree,
    current,
    fieldofstudy,
    from,
    to,
    description,
  } = formData

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    addEducation(formData, history)
  }

  return (
    <Fragment>
      <h1 className='large'>Add Your Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i> Add any school or bootcamp that
        you have attended
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='input-field'>
          <input
            type='text'
            placeholder='* School or Bootcamp'
            name='school'
            value={school}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='* Degree or Certificate'
            name='degree'
            value={degree}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <input
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
            value={fieldofstudy}
            onChange={onChange}
          />
        </div>
        <div className='input-field'>
          <h4>From Date</h4>
          <input
            type='date'
            name='from'
            value={from}
            onChange={onChange}
            required
          />
        </div>
        <div className='input-field'>
          <p>
            <label>
              <input
                type='checkbox'
                name='current'
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    current: !current,
                  })
                  toggleDisabled(!toDateDisabled)
                }}
              />
              <span>Current School</span>
            </label>
          </p>
        </div>
        <div className='input-field'>
          <h4>To Date</h4>
          <input
            type='date'
            name='to'
            value={to}
            onChange={onChange}
            disabled={toDateDisabled && 'disabled'}
          />
        </div>
        <div className='input-field'>
          <textarea
            name='description'
            placeholder='Program Description'
            value={description}
            onChange={onChange}
            className='materialize-textarea'
            required
          ></textarea>
        </div>
        <input type='submit' className='btn blue m-1' />
        <Link className='btn orange m-1' to='dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  )
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
}

export default connect(null, { addEducation })(withRouter(AddEducation))
