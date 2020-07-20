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
} from '../actions/types'

const initialState = {
  currentAnswer: null,
  currentComment: null,
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
    case UPDATE_ANSWER:
    case UPDATE_COMMENT:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === payload.answerId ? payload.updatedAnswer : answer
        ),
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
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === payload.answerId
            ? {
                ...answer,
                comments: payload.comments,
              }
            : answer
        ),
      }
    case REMOVE_ANSWER_COMMENT:
      return {
        ...state,
        answers: state.answers.map((answer) =>
          answer._id === payload.answerId
            ? {
                ...answer,
                comments: answer.comments.filter(
                  (comment) => comment._id !== payload.commentId
                ),
              }
            : answer
        ),
        loading: false,
      }
    case SET_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: payload,
      }
    case SET_CURRENT_COMMENT:
      return {
        ...state,
        currentComment: payload,
      }
    case CLEAR_CURRENT_COMMENT:
      return {
        ...state,
        currentComment: null,
      }
    case CLEAR_CURRENT_ANSWER:
      return {
        ...state,
        currentAnswer: null,
      }
    default:
      return state
  }
}
