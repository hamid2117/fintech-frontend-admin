import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import Account from '../components/Account'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '1200px',
    margin: '0px auto',
    '@media (max-width: 500px)': {},
  },
}))
const AccountPage = () => {
  const classes = useStyles()

  return (
    <>
      <Helmet>
        <title>Fintech |Account</title>
      </Helmet>
      <section className={classes.main}>
        <Account />
      </section>
    </>
  )
}
export default AccountPage
