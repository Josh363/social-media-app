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
  SET_CURRENT_COMMENT,
  SET_CURRENT_ANSWER,
  CLEAR_CURRENT_ANSWER,
  CLEAR_CURRENT_COMMENT,
  UPDATE_ANSWER,
  UPDATE_COMMENT,
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
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Update current Answer
export const updateAnswer = (formData, answerId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.put(`/api/answers/${answerId}`, formData, config)
    dispatch({
      type: UPDATE_ANSWER,
      payload: { answerId, updatedAnswer: res.data },
    })

    dispatch(setAlert('Answer Edited', 'success'))
    dispatch(clearCurrentAnswer())
  } catch (err) {
    //custom err message if topic already exists
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))

    dispatch({
      type: ANSWER_ERROR,
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
      payload: { answerId, comments: res.data },
    })

    dispatch(setAlert('Comment Added', 'success'))
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Update current Comment
export const updateComment = (formData, answerId, commentId) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.put(
      `/api/answers/${answerId}/${commentId}`,
      formData,
      config
    )
    dispatch({
      type: UPDATE_COMMENT,
      payload: { answerId, updatedAnswer: res.data },
    })

    dispatch(setAlert('Comment Edited', 'success'))
    dispatch(clearCurrentAnswer())
  } catch (err) {
    //custom err message if comment already exists
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))

    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Comment
export const removeComment = (answerId, commentId) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/api/answers/comment/${answerId}/${commentId}`
    )
    dispatch({
      type: REMOVE_ANSWER_COMMENT,
      payload: { answerId, commentId },
    })

    dispatch(setAlert('Comment Deleted', 'success'))
  } catch (err) {
    dispatch({
      type: ANSWER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

export const setCurrentAnswer = (answer) => {
  return {
    type: SET_CURRENT_ANSWER,
    payload: answer,
  }
}

export const setCurrentComment = (comment) => {
  return {
    type: SET_CURRENT_COMMENT,
    payload: comment,
  }
}

export const clearCurrentAnswer = () => {
  return {
    type: CLEAR_CURRENT_ANSWER,
  }
}

export const clearCurrentComment = () => {
  return {
    type: CLEAR_CURRENT_COMMENT,
  }
}
