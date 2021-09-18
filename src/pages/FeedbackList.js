import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Feedbacklist from '../components/Feedbacklist'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {},
  },
  main2: {
    width: '100%',
    maxWidth: '90%',
    margin: '0px auto',
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GuardAround | Feedback list</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <div className={classes.main2}>
          <Feedbacklist />
        </div>
      </section>
    </>
  )
}
export default InvoicePage
