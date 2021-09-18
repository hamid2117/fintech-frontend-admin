import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useFormik } from 'formik'
import { IconButton, Divider, TextField, Button, Grid } from '@material-ui/core'
import { Select, InputLabel, MenuItem } from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuthContext } from '../../../context/AuthContext'

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
  const { adminCourse, adminCloseCourse } = useGlobalUiContext()
  const { userdata } = useAuthContext()
  const { token } = userdata
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const onSubmit = async (value) => {
    let { ...data } = value
    const response = await axios
      .post('https://guardaround.herokuapp.com/api/v1/incident', data, config)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
          }
        }
      })
    if (response && response.data) {
      adminCloseCourse()
      toast.success('Incident is Created.')
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'Safety',
      status: 'verified',
      description: '',
    },
    onSubmit,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminCourse}
        onClose={adminCloseCourse}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminCourse}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Incident</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseCourse()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form
              onSubmit={formik.handleSubmit}
              encType='multipart/form-data'
              className={classes.inputs}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='title'
                    name='title'
                    variant='standard'
                    label='title'
                    required
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='title'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Type</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    id='type'
                    fullWidth
                    name='type'
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'Safety'}>Safety</MenuItem>
                    <MenuItem value={'Crime'}>Crime</MenuItem>
                    <MenuItem value={'Neighborly Moment'}>
                      Neighborly Moment
                    </MenuItem>
                    <MenuItem value={'Missing person'}>Missing person</MenuItem>
                    <MenuItem value={'Suspicious Activity'}>
                      Suspicious Activity
                    </MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Status</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    id='status'
                    fullWidth
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'unvarified'}>Unvarified</MenuItem>
                    <MenuItem value={'verified'}>Verified</MenuItem>
                    <MenuItem value={'deleled'}>Deleled</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='description'
                    name='description'
                    variant='standard'
                    label='Description'
                    required
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    multiline
                    minRows={3}
                    autoComplete='description'
                  />
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add Incident
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
