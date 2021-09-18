import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const AdminRoute = ({ children, ...rest }) => {
  const { userdata } = useAuthContext()
  return (
    <Route
      {...rest}
      render={() => {
        return userdata.isAdmin == true ? children : <Redirect to='/' />
      }}
    ></Route>
  )
}

export default AdminRoute
