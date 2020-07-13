import {
  GET_TOPICS,
  UPDATE_TOPIC,
  ADD_VIEW,
  TOPIC_ERROR,
  ADD_TOPIC,
  DELETE_TOPIC,
  SET_CURRENT_TOPIC,
} from '../actions/types'

const initialState = {
  topics: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_TOPICS:
      return {
        ...state,
        topics: payload,
        loading: false,
      }
    case ADD_TOPIC:
      return {
        ...state,
        topics: [payload, ...state.topics],
        loading: false,
      }
    case DELETE_TOPIC:
      return {
        ...state,
        topics: state.topics.filter((topic) => topic._id !== payload),
      }
    case TOPIC_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state
  }
}
