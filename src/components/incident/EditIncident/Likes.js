import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CalendarToday } from '@material-ui/icons'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '100%',
    margin: '0px auto',
    marginBottom: '35px',
  },
  main2: {
    width: '100%',
    maxWidth: '100%',
    margin: '0px auto',
    height: '200px',
    display: 'grid',
    gap: '22px',
    gridTemplateColumns: '1fr 1fr ',
  },
}))

const Likes = ({ like }) => {
  const classes = useStyles()
  return (
    <>
      <div>
        <div className={classes.main}>
          <h1>Likes details </h1>
        </div>
        <div className={classes.main2}>
          <div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Like Detail</span>
              <div style={{ marginBottom: '9px' }}>
                <span style={{ fontWeight: 'bold' }}> Id </span>
                <span style={{ marginLeft: '10px' }}>{like && like._id}</span>
              </div>
              <div style={{ marginBottom: '9px' }}>
                <CalendarToday />
                <span
                  style={{
                    marginLeft: '10px',
                    marginBottom: '15px',
                    fontSize: '13px',
                  }}
                >
                  {like && like.createdAt}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontWeight: 'bold' }}>More Detail</span>
            </div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Number of Like :</span>
              <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                {like && like.count}
              </span>
            </div>
            <div style={{ marginBottom: '9px' }}>
              <span style={{ fontWeight: 'bold' }}> Last Updated At : </span>
              <span
                style={{
                  marginLeft: '10px',
                  marginBottom: '15px',
                  fontSize: '13px',
                }}
              >
                {like && like.updatedAt}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Likes
