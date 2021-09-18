import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Preview from '../components/PreviewIncident'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {},
  },
}))
const InvoicePage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>GuardAround |Preview </title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <Preview />
      </section>
    </>
  )
}
export default InvoicePage
