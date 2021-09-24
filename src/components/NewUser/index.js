import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import { useGlobalUiContext } from '../../context/uiContext'
import CloseIcon from '@material-ui/icons/Close'
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
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

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
      padding: '50px 30px',
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
    '@media (max-width: 500px)': {},
  },
  sign: {
    backgroundColor: '#5f83ef',
    '&:hover': {
      backgroundColor: '#3764eb',
    },
  },
}))

export default function NewUser() {
  const classes = useStyles()
  const { adminRegister, adminCloseRegister } = useGlobalUiContext()
  const [phoneError, setPhoneerror] = useState(false)
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const onSubmit = async (value) => {
    const data = { ...value, birthday: selectedDate }
    console.log(data)
    const response = await axios.post(`${devApi}user`, data).catch((e) => {
      if (e && e.response) {
        if (e.response.status === 400) {
          setPhoneerror(true)
        }
      }
    })
    if (response && response.data) {
      adminCloseRegister()
      toast.success('User is Created.')
      formik.resetForm()
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      email: '',
      city: '',
      number: '',
      gender: '',
      pin: '',
    },
    onSubmit,
  })

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminRegister}
        onClose={adminCloseRegister}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminRegister}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3>Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseRegister()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='firstName'
                    name='firstName'
                    variant='standard'
                    label='First Name'
                    required
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='firstName'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='secondName'
                    name='secondName'
                    variant='standard'
                    label='Last Name'
                    required
                    value={formik.values.secondName}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='secondName'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='city'
                    name='city'
                    variant='standard'
                    label='Your city Name .'
                    required
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='city'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='email'
                    name='email'
                    variant='standard'
                    label='Your email Name .'
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='email'
                  />
                </Grid>
                <Grid item xs={6}>
                  <InputLabel id='select-filled-label'>Gender</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='gender'
                    name='gender'
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
                    <MenuItem value={'Other'}>Other</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='number'
                    name='number'
                    variant='standard'
                    label='Number'
                    required
                    value={formik.values.number}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='number'
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id='pin'
                    name='pin'
                    variant='standard'
                    label='Pin'
                    type='password'
                    required
                    value={formik.values.pin}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='pin'
                  />
                </Grid>
                <Grid item xs={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      margin='normal'
                      id='date-picker-dialog'
                      label='Invoice Date'
                      fullWidth
                      name='invoiceDate'
                      format='MM/dd/yyyy'
                      value={selectedDate}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add User
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
