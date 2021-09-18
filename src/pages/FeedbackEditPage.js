import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import EditFeedback from '../components/FeedbackEdit/index'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'grid',
    margin: '0px auto',
    gridTemplateColumns: '80px auto',

    '@media (max-width: 500px)': {},
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GuardAround | FeedbackEdit</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <EditFeedback />
      </section>
    </>
  )
}
export default InvoicePage
