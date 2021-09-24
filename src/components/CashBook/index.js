import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useGlobalUiContext } from '../../context/uiContext'
import NewCash from './newCash'
import Userlist from './Cashlist'

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
      color: '#39a9fd',
    },
  },
  btn: {
    fontSize: '12px',
    color: 'white',
    backgroundColor: '#39a9fd',
    '&:hover': {
      backgroundColor: '#ceeafe',
      color: '#021e32',
    },
  },
  btndiv: {
    justifySelf: 'end',
    alignSelf: 'center',
  },
}))

const App = () => {
  const classes = useStyles()
  const { adminOpenCashBook } = useGlobalUiContext()
  return (
    <section className={classes.main2}>
      <main className={classes.main}>
        <div className={classes.heading}>
          <h2>CashBook Panel</h2>
          <div className={classes.btndiv}>
            <Button
              startIcon={<AddIcon />}
              onClick={adminOpenCashBook}
              className={classes.btn}
            >
              Add cash registration
            </Button>
          </div>
          <NewCash />
        </div>
        <Userlist />
      </main>
    </section>
  )
}
export default App
