import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Incident from './List'

const useStyles = makeStyles((theme) => ({
  main: {},
  main2: {
    height: '80vh',
    display: 'grid',
    gridTemplateColumns: '100%',
  },
  heading: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
    justifyContent: 'start',
    '& h2': {
      color: '#2FD3CA',
    },
  },
  
  btndiv: {
    justifySelf: 'end',
    alignSelf: 'center',
  },
}))

const IncidentList = () => {
  const classes = useStyles()
  return (
    <section className={classes.main2}>
      <main className={classes.main}>
        <div className={classes.heading}>
          <h2>Unverified Incidents Panel</h2>
        </div>
        <Incident />
      </main>
    </section>
  )
}
export default IncidentList
//
