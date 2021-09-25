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
    association: 'loading...',
  })
  const [values, setValues] = useState({
    label: '',
    statusEnum: '',
    durationEnum: '',
  })
  const onSubmit = async (value) => {
    value.preventDefault()
    try {
      const { data: dataa } = await axios.put(
        `${devApi}editproduct/${id}`,
        values,
        config
      )
      if (dataa) {
        toast.success('Product Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}product/${id}`, config)
    setCash(data)
    if (data.association) {
      setCash((data) => {
        return { ...data, association: 'Product' }
      })
    } else {
      setCash((data) => {
        return { ...data, association: 'Scale' }
      })
    }
    setValues((value) => {
      return {
        ...value,
        label: data.label,
        durationEnum: data.durationEnum,
        statusEnum: data.statusEnum,
      }
    })
  }, [devApi])

  const handleChange = (e) => {
    let name = e.target.name
    let valuee = e.target.value

    setValues((value) => {
      return { ...value, [name]: valuee }
    })
  }
  console.log(cash.association)
  return (
    <>
      <form onSubmit={onSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='codee'
              name='codee'
              variant='standard'
              label='Code'
              required
              type='number'
              value={cash.codee}
              fullWidth
              autoComplete='codee'
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant='standard'
              label='Association'
              required
              value={cash.association}
              fullWidth
              autoComplete='codee'
              disabled
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id='label'
              name='label'
              variant='standard'
              label='Label'
              required
              value={values.label}
              onChange={handleChange}
              className={classes.lastNamee}
              fullWidth
              autoComplete='codee'
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>statusEnum</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='statusEnum'
              name='statusEnum'
              value={values.statusEnum}
              onChange={handleChange}
            >
              <MenuItem value={false}>Disabled</MenuItem>
              <MenuItem value={true}>Enabled</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>durationEnum</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='durationEnum'
              name='durationEnum'
              value={values.durationEnum}
              onChange={handleChange}
            >
              <MenuItem value={'Month'}>Month</MenuItem>
              <MenuItem value={'BioMonthly'}>BioMonthly</MenuItem>
              <MenuItem value={'Quarter'}>Quarter</MenuItem>
              <MenuItem value={'Semester'}>Semester</MenuItem>
              <MenuItem value={'Annual'}>Annual</MenuItem>
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
