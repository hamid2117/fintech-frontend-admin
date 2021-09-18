import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'grid',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },
    '@media (max-width: 500px)': {},
  },
  heading: {
    padding: '8px ',
    paddingLeft: '11px',
    display: 'grid',
    gridTemplateColumns: '14% 86%',
    '& p': {
      color: '#2FD3CA',
    },
  },
  number: {
    display: 'grid',
    placeItems: 'center',
    '& h4': {
      margin: '21px 0px',
      color: '#135451',
    },
  },
  btndiv: {
    marginBottom: '20px',
    marginTop: '7px',
    display: 'grid',
    placeItems: 'center',
  },
  btn: {
    borderRadius: '10px',
    fontSize: '10px',
    color: 'white',
    backgroundColor: '#2FD3CA',
    '&:hover': {
      backgroundColor: '#d5f6f4',
      color: '#135451',
    },
  },
}))
const InvoicePage = ({ id, heading, Icon, btn, link, numbers }) => {
  const classes = useStyles()
  const {
    numberUnverified,
    numberIncident,
    numbercomment,
    numberfeedback,
    numberuser,
  } = numbers

  return (
    <>
      <Paper elevation={2} className={classes.main}>
        <div className={classes.heading}>
          <Icon style={{ color: '#2FD3CA' }} />
          <p>{heading}</p>
        </div>
        <div className={classes.number}>
          {!numberuser && (
            <CircularProgress
              style={{
                marginBottom: '-28px',
                marginTop: '11px',
                color: '#2FD3CA',
              }}
            />
          )}
          {id === 1 && <h4>{numberuser}</h4>}
          {id === 2 && <h4>{numberIncident}</h4>}
          {id === 3 && <h4>{numberfeedback}</h4>}
          {id === 4 && <h4>{numberUnverified}</h4>}
          {id === 5 && <h4>{numbercomment}</h4>}
        </div>
        <div className={classes.btndiv}>
          <Button
            component={Link}
            to={link}
            className={classes.btn}
            variant='contained'
          >
            {btn}
          </Button>
        </div>
      </Paper>
    </>
  )
}
export default InvoicePage
