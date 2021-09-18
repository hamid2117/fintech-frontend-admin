import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import Form from './Form'

const useStyles = makeStyles((theme) => ({
  main: {
    height: '100vh',
    display: 'grid',
    placeItems: 'center',
  },
  paper: {
    height: '600px',
    width: '500px',
  },
  heading: {
    textAlign: 'center',
    margin: '20px 0px',
    marginTop: '40px',
  },
}))

const Account = () => {
  const classes = useStyles()

  return (
    <>
      <section className={classes.main}>
        <Paper elevation={4}>
          <div className={classes.heading}>
            <h3>Admin Panel</h3>
          </div>

          <Form />
        </Paper>
      </section>
    </>
  )
}
export default Account
