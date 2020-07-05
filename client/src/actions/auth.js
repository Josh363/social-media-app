import axios from 'axios'
import { setAlert } from './alert'
import { REGISTER_SUCCESS, REGISTER_FAIL } from './types'

//Register User
export const register = (registerData) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  try {
    res = await axios.post('/api/users', registerData, config)

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })
  } catch (err) {
    const errors = err.response.data.errors
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}
