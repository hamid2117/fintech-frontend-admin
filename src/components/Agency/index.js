import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import { useGlobalUiContext } from '../../context/uiContext'
import NewCash from './newAgency'
import Userlist from './Agencylist'

const useStyles = makeStyles((theme) => ({
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
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
      marginBottom: '30px',
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
  const { adminOpenAgency } = useGlobalUiContext()
  return (
    <section className={classes.main2}>
      <main className={classes.main}>
        <div className={classes.heading}>
          <h2>Agency Panel</h2>
          <div className={classes.btndiv}>
            <Button
              startIcon={<AddIcon />}
              onClick={adminOpenAgency}
              className={classes.btn}
            >
              Add new Agency
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
