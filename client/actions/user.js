import { getUser } from '../apis/user'

export const UPDATE_LOGGED_IN_USER = 'UPDATE_LOGGED_IN_USER'
export const CLEAR_LOGGED_IN_USER = 'CLEAR_LOGGED_IN_USER'

export function updateLoggedInUser(userToSave) {
  return {
    type: UPDATE_LOGGED_IN_USER,
    payload: userToSave,
  }
}

export function clearLoggedInUser() {
  return {
    type: CLEAR_LOGGED_IN_USER,
  }
}

export function fetchUser(token) {
  return (dispatch) => {
    return getUser(token)
      .then((user) => dispatch(updateLoggedInUser(user)))
      .catch((err) => console.error(err.message))
  }
}
