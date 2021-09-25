import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useAuthContext } from '../../context/AuthContext'
import { useFormik } from 'formik'
import * as yup from 'yup'
import {
  IconButton,
  Divider,
  TextField,
  Button,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../../api'
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
    padding: '15px 15px',
    width: '400px',
    '@media (max-width: 500px)': {
      padding: '25px 25px',
    },
  },
  head: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    justifyContent: 'start',
  },
  inputs: {
    padding: '18px 0px',
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

const validationSchema = yup.object({
  codee: yup
    .string()
    .max(3, 'Only 3 word is required')
    .required('Password is required'),
})

export default function NewUser() {
  const classes = useStyles()
  const { adminCash, adminCloseCash } = useGlobalUiContext()
  const [phoneError, setPhoneerror] = useState(false)
  const [agency, setAgency] = useState([])
  const { userdata } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const onSubmit = async (value) => {
    const data = { ...value }
    const response = await axios
      .post(`${devApi}cash`, data, config)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
            toast.error('This code is already in use .')
          }
        }
      })
    if (response && response.data) {
      adminCloseCash()
      toast.success('cashRegistration is Created.')
      formik.resetForm()
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}agency`, config)
    setAgency(data)
  }, [])

  const formik = useFormik({
    initialValues: {
      codee: '',
      label: '',
      status: '',
      currency: '',
      state: '',
      agency: '',
    },
    validateOnBlur: true,
    validationSchema,
    onSubmit,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminCash}
        onClose={adminCloseCash}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminCash}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3> Cash Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseCash()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='codee'
                    name='codee'
                    variant='standard'
                    label='Code'
                    required
                    value={formik.values.codee}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.codee && formik.errors.codee
                        ? formik.errors.codee
                        : null
                    }
                    error={
                      formik.touched.codee && formik.errors.codee ? true : false
                    }
                    fullWidth
                    autoComplete='codee'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='label'
                    name='label'
                    variant='standard'
                    label='Label'
                    required
                    value={formik.values.label}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='label'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Status</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='status'
                    name='status'
                    value={formik.values.status}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={false}>Disabled</MenuItem>
                    <MenuItem value={true}>Enable</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>State</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='state'
                    name='state'
                    value={formik.values.state}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={false}>Close</MenuItem>
                    <MenuItem value={true}>Open</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Currency</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='currency'
                    name='currency'
                    value={formik.values.currency}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                    <MenuItem value={'XOF'}>XOF</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Agency</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='agency'
                    name='agency'
                    value={formik.values.agency}
                    onChange={formik.handleChange}
                  >
                    {agency.map((data, index) => {
                      return (
                        <MenuItem value={data._id} key={index}>
                          {data.codee}
                        </MenuItem>
                      )
                    })}
                  </Select>
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add Cash Registeration
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
