import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'

import {
  Account,
  Error,
  UserEdit,
  Userlist,
  Incidentlist,
  IncidentEdit,
  Feedbacklist,
  FeedbackEdit,
  Unverifeid,
  Preview,
  Dashboard,
} from './pages'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import AdminRoute from './utils/AdminRoute'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
})
const useStyles = makeStyles((theme) => ({
  main: {
    '@media (max-width: 500px)': {},
  },
}))

const App = () => {
  const classes = useStyles()

  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <main className={classes.main}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Account />
            </Route>
            <AdminRoute exact path='/userlist'>
              <Userlist />
            </AdminRoute>
            <AdminRoute exact path='/useredit/:id'>
              <UserEdit />
            </AdminRoute>
            {/* <AdminRoute exact path='/dashboard'>
              <Dashboard />
            </AdminRoute> */}
            {/* <AdminRoute exact path='/incidentlist'>
              <Incidentlist />
            </AdminRoute>
            <AdminRoute exact path='/feedbacklist'>
              <Feedbacklist />
            </AdminRoute>
            <AdminRoute exact path='/unverified'>
              <Unverifeid />
            </AdminRoute>
            <AdminRoute exact path='/incidentpreview/:id'>
              <Preview />
            </AdminRoute>
            <AdminRoute exact path='/feedbackedit/:id'>
              <FeedbackEdit />
            </AdminRoute> */}
            {/* <AdminRoute exact path='/incidentedit/:id'>
              <IncidentEdit />
            </AdminRoute> */}
            <Route path='*'>
              <Error />
            </Route>
          </Switch>
        </Router>
      </main>
    </>
  )
}
export default App
