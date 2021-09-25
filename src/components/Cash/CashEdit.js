import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
  Grid,
} from '@material-ui/core'
import axios from 'axios'
import { toast } from 'react-toastify'
import { devApi } from '../../api'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const Formm = ({ config, id }) => {
  const classes = useStyles()
  const [cash, setCash] = useState({
    codee: 'loading...',
    agency: { codee: 'loading...' },
    currency: 'loading...',
    label: 'loading...',
  })
  const [values, setValues] = useState({
    status: '',
    state: '',
  })
  const onSubmit = async (value) => {
    value.preventDefault()
    try {
      const { data: dataa } = await axios.put(
        `${devApi}editcash/${id}`,
        values,
        config
      )
      if (dataa) {
        toast.success('Cash Registration Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}cash/${id}`, config)
    setCash(data)
    setValues((value) => {
      return { ...value, status: data.status, state: data.state }
    })
  }, [devApi])

  const handleChange = (e) => {
    let name = e.target.name
    let valuee = e.target.value

    setValues((value) => {
      return { ...value, [name]: valuee }
    })
  }
  return (
    <>
      <form onSubmit={onSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='standard'
              label='Code'
              value={cash.codee}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='standard'
              label='label'
              value={cash.label}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='standard'
              label='Agency Code'
              value={cash.agency.codee}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='standard'
              label='Code'
              value={cash.currency}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>Status</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='status'
              name='status'
              value={values.status}
              onChange={handleChange}
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
              value={values.state}
              onChange={handleChange}
            >
              <MenuItem value={false}>Close</MenuItem>
              <MenuItem value={true}>Open</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Button variant='outlined' color='primary' type='submit'>
          Update
        </Button>
      </form>
    </>
  )
}
export default Formm
