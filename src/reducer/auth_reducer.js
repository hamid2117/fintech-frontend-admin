import {
  AUTH_USER,
  LOGOUT,
  UPDATE_USER,
  FALSE_LOADING,
  TRUE_LOADING,
  UPDATE_USERLIST,
} from '../actions'

const auth_reducer = (state, action) => {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, userdata: action.payload }
    case UPDATE_USER:
      return { ...state, userdata: action.payload }
    case LOGOUT:
      return { ...state, userdata: [] }
    case FALSE_LOADING:
      return { ...state, loading: false }
    case TRUE_LOADING:
      return { ...state, loading: true }
    case UPDATE_USERLIST:
      return { ...state, userlist: action.payload }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    default:
      throw new Error(`No Matching "${action.type}" - action type`)
  }
}

export default auth_reducer
