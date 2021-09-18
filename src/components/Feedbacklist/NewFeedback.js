import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { IconButton, Divider, TextField, Button, Grid } from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../context/AuthContext'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    borderRadius: '10px',
    padding: '30px 15px',
    width: '400px',
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '25px 0px',
    display: 'grid',
    gap: '15px 0px',
  },
  sign: {
    backgroundColor: '#5f83ef',
    '&:hover': {
      backgroundColor: '#3764eb',
    },
  },
}))

export default function Login() {
  const classes = useStyles()
  const { adminFeedback, adminCloseFeedback } = useGlobalUiContext()
  const [phoneError, setPhoneerror] = useState(false)
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const onSubmit = async (value) => {
    const { ...data } = value
    const response = await axios
      .post('https://guardaround.herokuapp.com/api/v1/feedback', data, config)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
            setPhoneerror(true)
          }
        }
      })
    if (response && response.data) {
      adminCloseFeedback()
      toast.success('Feedback is Created.')
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: { feedback: '' },
    onSubmit,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminFeedback}
        onClose={adminCloseFeedback}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminFeedback}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>New Feedback</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseFeedback()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='feedback'
                    name='feedback'
                    variant='standard'
                    label='Feedback'
                    required
                    multiline
                    minRows={3}
                    value={formik.values.feedback}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='feedback'
                  />
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add Feedback
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
