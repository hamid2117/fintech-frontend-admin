import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Dashboard from '../components/Dashboard'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '100%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GuardAround | Dashboard</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <Dashboard />
      </section>
    </>
  )
}
export default InvoicePage
