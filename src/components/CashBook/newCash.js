import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
import { useAuthContext } from '../../context/AuthContext'
import { useFormik } from 'formik'
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
import * as yup from 'yup'

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
  account: yup
    .string()
    .max(5, 'Only 5 word is required')
    .required('Password is required'),
})

export default function NewUser() {
  const classes = useStyles()
  const { adminCashBook, adminCloseCashBook } = useGlobalUiContext()
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
      .post(`${devApi}cashbook`, data, config)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
            toast.error('This code is already in use .')
          }
        }
      })
    if (response && response.data) {
      adminCloseCashBook()
      toast.success('cashRegistration is Created.')
      formik.resetForm()
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}agency`, config)
    setAgency(data)
  }, [])
  var currentdate = new Date()
  var datetime =
    'Last Sync: ' +
    currentdate.getDay() +
    '/' +
    currentdate.getMonth() +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds()

  const formik = useFormik({
    initialValues: {
      account: '',
      type: 'Client',
      time: datetime,
    },
    onSubmit,
    validateOnBlur: true,
    validationSchema,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminCashBook}
        onClose={adminCloseCashBook}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminCashBook}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3> CashBook Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseCashBook()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='account'
                    name='account'
                    variant='standard'
                    label='Account'
                    required
                    type='number'
                    value={formik.values.account}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    onBlur={formik.handleBlur}
                    helperText={
                      formik.touched.account && formik.errors.account
                        ? formik.errors.account
                        : null
                    }
                    error={
                      formik.touched.account && formik.errors.account
                        ? true
                        : false
                    }
                    fullWidth
                    autoComplete='account'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Type</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='type'
                    name='type'
                    value={formik.values.type}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'Client'}>Client</MenuItem>
                    <MenuItem value={'Accoutant'}>Accoutant</MenuItem>
                    <MenuItem value={'Non-Client'}>Non-Client</MenuItem>
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
