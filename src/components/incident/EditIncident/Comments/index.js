import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CalendarToday } from '@material-ui/icons'
import Comment from './Comment'

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
    height: '500px',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: '1fr 3fr ',
  },
}))

const Commentss = ({ comment, getComments }) => {
  const classes = useStyles()
  const { comments } = comment
  return (
    <>
      <div>
        <div className={classes.main}>
          <h1>Edit Comment </h1>
        </div>
        {comment && !comment._id ? (
          <h4 style={{ color: 'red' }}>There is no comment to show</h4>
        ) : (
          <div className={classes.main2}>
            <div>
              <div>
                <span style={{ fontWeight: 'bold' }}>Comment Detail</span>
                <div style={{ marginBottom: '9px' }}>
                  <span style={{ fontWeight: 'bold' }}> Id </span>
                  <span style={{ marginLeft: '10px' }}>
                    {comment && comment._id}
                  </span>
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
                    {comment && comment.createdAt}
                  </span>
                </div>
                <div style={{ margin: '20px 0px' }}>
                  <span style={{ fontWeight: 'bold' }}>More Detail</span>
                </div>
                <div>
                  <span style={{ fontWeight: 'bold' }}>
                    Number of Comments :
                  </span>
                  <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                    {comment && comment.count}
                  </span>
                </div>
                <div style={{ marginBottom: '9px' }}>
                  <span style={{ fontWeight: 'bold' }}>
                    {' '}
                    Last Updated At :{' '}
                  </span>

                  <span
                    style={{
                      marginLeft: '10px',
                      marginBottom: '15px',
                      fontSize: '13px',
                    }}
                  >
                    {comment && comment.updatedAt}
                  </span>
                </div>
              </div>
            </div>
            <div>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ fontWeight: 'bold' }}>edit</span>
              </div>
              {comments &&
                comments.map((data, index) => {
                  return (
                    <Comment key={index} {...data} getComments={getComments} />
                  )
                })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default Commentss
