import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../../api'
import DateFnsUtils from '@date-io/date-fns'
import 'date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'

import UploadImage from './FileUpload'
const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const validationSchema = yup.object({
  email: yup.string().email('Please enter a valid email address'),
})
const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()
  const [selectedDate, setSelectedDate] = React.useState(
    new Date('2014-08-18T21:11:54')
  )

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `${devApi}edituser/${id}`,
        data,
        config
      )
      if (dataa) {
        formik.resetForm()
        setNewData(dataa)
        toast.success('User Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      secondName: '',
      city: '',
      type: 'user',
      email: '',
      number: '',
      gender: '',
    },
    onSubmit,
    validationSchema,
  })

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              id='firstName'
              name='firstName'
              variant='standard'
              label='FristName'
              error={
                formik.touched.firstName && formik.errors.firstName
                  ? true
                  : false
              }
              helperText={
                formik.touched.firstName && formik.errors.firstName
                  ? formik.errors.firstName
                  : null
              }
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='secondName'
              name='secondName'
              variant='standard'
              label='Last Name'
              error={
                formik.touched.secondName && formik.errors.secondName
                  ? true
                  : false
              }
              helperText={
                formik.touched.secondName && formik.errors.secondName
                  ? formik.errors.secondName
                  : null
              }
              onBlur={formik.handleBlur}
              value={formik.values.secondName}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
              autoComplete='lname'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='city'
              name='city'
              variant='standard'
              label='City'
              value={formik.values.city}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id='email'
              name='email'
              variant='standard'
              error={formik.touched.email && formik.errors.email ? true : false}
              helperText={
                formik.touched.email && formik.errors.email
                  ? formik.errors.email
                  : null
              }
              onBlur={formik.handleBlur}
              label='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <TextField
              id='type'
              name='type'
              variant='standard'
              label='type'
              value={formik.values.type}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              id='number'
              name='number'
              variant='standard'
              label='number'
              value={formik.values.number}
              onChange={formik.handleChange}
              style={{ marginTop: '16px' }}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                margin='normal'
                id='date-picker-dialog'
                label='Invoice Date'
                name='invoiceDate'
                format='MM/dd/yyyy'
                fullWidth
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <UploadImage id={id} />
          </Grid>
        </Grid>
        <Button variant='outlined' color='primary' type='submit'>
          Edit
        </Button>
      </form>
    </>
  )
}
export default Formm
