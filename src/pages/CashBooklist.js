import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Agency from '../components/CashBook'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
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
        <title>Fintech | CashBook</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <div className={classes.main2}>
          <Agency />
        </div>
      </section>
    </>
  )
}
export default InvoicePage
