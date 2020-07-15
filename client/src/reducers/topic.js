import {
  GET_TOPICS,
  UPDATE_TOPIC,
  ADD_VIEW,
  TOPIC_ERROR,
  ADD_TOPIC,
  DELETE_TOPIC,
  SET_CURRENT_TOPIC,
  CLEAR_CURRENT_TOPIC,
} from '../actions/types'

const initialState = {
  topics: null,
  loading: true,
  error: {},
  current: null,
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
        topics: [...state.topics, payload],
        loading: false,
      }
    case UPDATE_TOPIC:
      return {
        ...state,
        topics: state.topics.map((topic) =>
          topic._id === payload._id ? payload : topic
        ),
      }
    case SET_CURRENT_TOPIC:
      return {
        ...state,
        current: payload,
      }
    case CLEAR_CURRENT_TOPIC:
      return {
        ...state,
        current: null,
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
