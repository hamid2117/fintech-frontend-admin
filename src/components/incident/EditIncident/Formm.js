import React from 'react'
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
import axios from 'axios'
import { toast } from 'react-toastify'
import Multiple from './MultipleImage'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    marginBottom: '20px',
    '@media (max-width: 500px)': {},
  },
}))

const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `https://guardaround.herokuapp.com/api/v1/editincident/${id}`,
        data,
        config
      )
      if (dataa) {
        formik.resetForm()
        setNewData(dataa)
        toast.success('Incident Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const formik = useFormik({
    initialValues: {
      title: '',
      type: 'Safety',
      status: 'verified',
      description: '',
      images: '',
    },
    onSubmit,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='title'
              name='title'
              variant='standard'
              label='title'
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
              <MenuItem value={'Neighborly Moment'}>Neighborly Moment</MenuItem>
              <MenuItem value={'Missing person'}>Missing person</MenuItem>
              <MenuItem value={'Suspicious Activity'}>
                Suspicious Activity
              </MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            {/* 'unvarified', 'verified', 'deleted' */}
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
        <Button variant='outlined' color='primary' type='submit'>
          Edit
        </Button>
      </form>
      <Multiple id={id} />
    </>
  )
}
export default Formm
