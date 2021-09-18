import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducer/auth_reducer'
import {
  AUTH_USER,
  LOGOUT,
  UPDATE_USER,
  UPDATE_USERLIST,
  TRUE_LOADING,
  FALSE_LOADING,
} from '../actions'
import { rows } from '../DummyData'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../api'
const getLocalStorage = () => {
  const userData = localStorage.getItem('userdata')
  if (userData) {
    return JSON.parse(userData)
  } else {
    return []
  }
}
const initialState = {
  userdata: getLocalStorage(),
  userlist: rows,
  loading: false,
}

const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const { token } = state.userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const loginData = (data) => {
    dispatch({ type: AUTH_USER, payload: data })
  }
  const updateData = (data) => {
    dispatch({ type: UPDATE_USER, payload: data })
  }

  const logout = () => {
    localStorage.removeItem('userdata')
    dispatch({ type: LOGOUT })
    toast.error('Logout.', {
      position: 'top-center',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  }

  const getData = async () => {
    try {
      dispatch({ type: TRUE_LOADING })
      const { data } = await axios.get(`${devApi}users`, config)
      if (data) {
        dispatch({ type: UPDATE_USERLIST, payload: data })
        dispatch({ type: FALSE_LOADING })
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
      }
    }
  }
  const setLoading = (data) => {
    dispatch({ type: 'SET_LOADING', payload: data })
  }
  useEffect(() => {
    localStorage.setItem('userdata', JSON.stringify(state.userdata))
  }, [state.userdata])

  return (
    <AuthContext.Provider
      value={{ ...state, loginData, logout, updateData, getData, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  )
}
// make sure use
export const useAuthContext = () => {
  return useContext(AuthContext)
}
