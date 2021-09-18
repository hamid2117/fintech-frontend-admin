import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { IconButton } from '@material-ui/core'
import { toast } from 'react-toastify'
import axios from 'axios'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid',
    '@media (max-width: 500px)': {},
    gridTemplateColumns: '3fr 1fr',
  },
  heading: {
    fontWeight: '600',
  },
}))
const Comment = ({ text, user, _id, getComments }) => {
  const classes = useStyles()
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `https://guardaround.herokuapp.com/api/v1/comment/${_id}`
      )
      if (response) {
        getComments()
        toast.error('This comment is deleted.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <section className={classes.main}>
        <div>
          <p>
            <span className={classes.heading}>UserName :</span>
            {user.firstName} {'     '} {user.lastName}
          </p>
          <p>
            <span className={classes.heading}>Comment :</span>
            {text}
          </p>
        </div>
        <div>
          <IconButton onClick={() => handleDelete()}>
            <DeleteForeverIcon style={{ color: 'red' }} />
          </IconButton>
        </div>
      </section>
    </>
  )
}
export default Comment
