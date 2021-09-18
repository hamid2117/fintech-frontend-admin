import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useGlobalUiContext } from '../../context/uiContext'
import NewFeedback from './NewFeedback'
import Feedback from './List'

const useStyles = makeStyles((theme) => ({
  main: {},
  main2: {
    height: '80vh',
    display: 'grid',
    gridTemplateColumns: '100%',
  },
  heading: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
    '& h2': {
      color: '#2FD3CA',
    },
  },
  btn: {
    fontSize: '12px',
    color: 'white',
    backgroundColor: '#2FD3CA',
    '&:hover': {
      backgroundColor: '#d5f6f4',
      color: '#135451',
    },
  },
  btndiv: {
    justifySelf: 'end',
    alignSelf: 'center',
  },
}))

const IncidentList = () => {
  const classes = useStyles()
  const { adminOpenFeedback } = useGlobalUiContext()
  return (
    <section className={classes.main2}>
      <main className={classes.main}>
        <div className={classes.heading}>
          <h2>Feedback Panel</h2>
          <div className={classes.btndiv}>
            <Button
              startIcon={<AddIcon />}
              onClick={adminOpenFeedback}
              className={classes.btn}
            >
              Add new feedback
            </Button>
          </div>
          <NewFeedback />
        </div>
        <Feedback />
      </main>
    </section>
  )
}
export default IncidentList
//
