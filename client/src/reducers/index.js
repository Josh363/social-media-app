import { combineReducers } from 'redux'
import alert from './alert'
import auth from './auth'
import profile from './profile'
import post from './post'
import topic from './topic'
import question from './question'
import answer from './answer'

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  topic,
  question,
  answer,
})
