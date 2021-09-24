import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { ToastContainer, toast } from 'react-toastify'

import {
  Account,
  Error,
  UserEdit,
  Userlist,
  Dashboard,
  Cash,
  CashEdit,
  Agencylist,
  AgencyEdit,
  CashBook,
  CashBookEdit,
  Productlist,
  ProductEdit,
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
            <AdminRoute exact path='/agencylist'>
              <Agencylist />
            </AdminRoute>
            <AdminRoute exact path='/cashlist'>
              <Cash />
            </AdminRoute>
            <AdminRoute exact path='/productlist'>
              <Productlist />
            </AdminRoute>
            <AdminRoute exact path='/productedit/:id'>
              <ProductEdit />
            </AdminRoute>
            <AdminRoute exact path='/cashbooklist'>
              <CashBook />
            </AdminRoute>
            <AdminRoute exact path='/cashbookedit/:id'>
              <CashBookEdit />
            </AdminRoute>
            <AdminRoute exact path='/cashedit/:id'>
              <CashEdit />
            </AdminRoute>
            <AdminRoute exact path='/agencyedit/:id'>
              <AgencyEdit />
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
