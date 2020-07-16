import {
  GET_ANSWERS,
  ANSWER_ERROR,
  UPDATE_ANSWER_LIKES,
  DELETE_ANSWER,
  ADD_ANSWER,
  ADD_ANSWER_COMMENT,
  REMOVE_ANSWER_COMMENT,
} from '../actions/types'

const initialState = {
  answers: null,
  loading: true,
  error: {},
}

export default function (state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_ANSWERS:
      return {
        ...state,
        answers: payload,
        loading: false,
      }
    case ADD_ANSWER:
      return {
        ...state,
        answers: [payload, ...state.answers],
        loading: false,
      }
    case DELETE_ANSWER:
      return {
        ...state,
        answers: state.answers.filter((answer) => answer._id !== payload),
        loading: false,
      }
    case UPDATE_ANSWER_LIKES:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === payload.answerId
            ? { ...answer, answerLikes: payload.likes }
            : answer
        ),
        loading: false,
      }
    case ANSWER_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    case ADD_ANSWER_COMMENT:
    case REMOVE_ANSWER_COMMENT:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === payload.answerId
            ? {
                ...answer,
                answerComments: payload.answerComments,
              }
            : answer
        ),
        loading: false,
      }
    default:
      return state
  }
}
