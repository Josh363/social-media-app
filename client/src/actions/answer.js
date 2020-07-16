import axios from 'axios'
import { setAlert } from './alert'
import {
  GET_ANSWERS,
  ANSWER_ERROR,
  UPDATE_ANSWER_LIKES,
  DELETE_ANSWER,
  ADD_ANSWER,
  ADD_ANSWER_COMMENT,
  REMOVE_ANSWER_COMMENT,
} from './types'

//Get Answers by Question ID
export const getAnswers = (questionId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/answers/${questionId}`)
    dispatch({
      type: GET_ANSWERS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add Like to answer
export const addLike = (answerId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/answers/like/${answerId}`)
    dispatch({
      type: UPDATE_ANSWER_LIKES,
      payload: { answerId, likes: res.data },
    })
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Like from answer
export const deleteLike = (answerId) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/answers/unlike/${answerId}`)
    dispatch({
      type: UPDATE_ANSWER_LIKES,
      payload: { answerId, answerLikes: res.data },
    })
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Answer
export const deleteAnswer = (answerId) => async (dispatch) => {
  try {
    await axios.delete(`/api/answers/${answerId}`)
    dispatch({
      type: DELETE_ANSWER,
      payload: answerId,
    })

    dispatch(setAlert('Answer Removed', 'success'))
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add Answer
export const addAnswer = (formData, questionId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(`/api/answers/${questionId}`, formData, config)
    dispatch({
      type: ADD_ANSWER,
      payload: res.data,
    })

    dispatch(setAlert('Answer Added', 'success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add Comment
export const addComment = (answerId, formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(
      `/api/answers/comment/${answerId}`,
      formData,
      config
    )
    dispatch({
      type: ADD_ANSWER_COMMENT,
      payload: { answerId, answerComments: res.data },
    })

    dispatch(setAlert('Comment Added', 'success'))
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Comment
export const removeComment = (answerId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`/api/answers/comment/${answerId}/${commentId}`)
    dispatch({
      type: REMOVE_ANSWER_COMMENT,
      payload: { answerId, answerComments: res.data },
    })

    dispatch(setAlert('Comment Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}
