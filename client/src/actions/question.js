import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_QUESTIONS,
  GET_QUESTION,
  UPDATE_QUESTION,
  ADD_VIEW,
  QUESTION_ERROR,
  ADD_QUESTION,
  SET_CURRENT_QUESTION,
  DELETE_QUESTION,
} from './types'

//Get All Questions by topic id
export const getQuestions = (topicName) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/questions/${topicName}`)
    dispatch({
      type: GET_QUESTIONS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Get a single question by question ID
export const getQuestion = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/questions/single/${questionId}`)
    dispatch({
      type: GET_QUESTION,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add New Question by Topic ID
export const addQuestion = (formData, topicName) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(
      `/api/questions/${topicName}`,
      formData,
      config
    )
    dispatch({
      type: ADD_QUESTION,
      payload: res.data,
    })

    dispatch(setAlert('Question Added', 'success'))
  } catch (err) {
    //custom err message if question already exists
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))

    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Question
export const deleteQuestion = (questionId) => async (dispatch) => {
  try {
    await axios.delete(`/api/questions/${questionId}`)

    dispatch({
      type: DELETE_QUESTION,
      payload: questionId,
    })

    dispatch(setAlert('Question Removed', 'success'))
  } catch (err) {
    dispatch({
      type: QUESTION_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
