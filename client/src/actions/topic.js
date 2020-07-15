import axios from 'axios'
import { setAlert } from './alert'

import {
  GET_TOPICS,
  UPDATE_TOPIC,
  ADD_VIEW,
  TOPIC_ERROR,
  ADD_TOPIC,
  SET_CURRENT_TOPIC,
  CLEAR_CURRENT_TOPIC,
  DELETE_TOPIC,
} from './types'

//Get All Topics
export const getTopics = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/topics')
    dispatch({
      type: GET_TOPICS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Add New Topic
export const addTopic = (formData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.post(`/api/topics`, formData, config)
    dispatch({
      type: ADD_TOPIC,
      payload: res.data,
    })

    dispatch(setAlert('Topic Added', 'success'))
  } catch (err) {
    //custom err message if topic already exists
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Delete Topic
export const deleteTopic = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/topics/${id}`)

    dispatch({
      type: DELETE_TOPIC,
      payload: id,
    })

    dispatch(setAlert('Topic Removed', 'success'))
  } catch (err) {
    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

//Update current topic
export const updateTopic = (formData, topicId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    const res = await axios.put(`/api/topics/${topicId}`, formData, config)
    dispatch({
      type: UPDATE_TOPIC,
      payload: res.data,
    })

    dispatch(setAlert('Topic Edited', 'success'))
    dispatch(clearCurrentTopic())
  } catch (err) {
    //custom err message if topic already exists
    const errMsg = err.response.data.msg
    dispatch(setAlert(errMsg, 'danger'))

    dispatch({
      type: TOPIC_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    })
  }
}

// Set current log
export const getCurrentTopic = (topic) => {
  return {
    type: SET_CURRENT_TOPIC,
    payload: topic,
  }
}

// Clear current log
export const clearCurrentTopic = () => {
  return {
    type: CLEAR_CURRENT_TOPIC,
  }
}
