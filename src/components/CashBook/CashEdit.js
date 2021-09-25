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
    account: 'loading...',
    balance: 'loading...',
  })
  const [values, setValues] = useState({
    type: '',
  })
  const onSubmit = async (value) => {
    value.preventDefault()
    try {
      const { data: dataa } = await axios.put(
        `${devApi}editcashbook/${id}`,
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
    const { data } = await axios.get(`${devApi}cashbook/${id}`, config)
    setCash(data)
    setValues((value) => {
      return { ...value, type: data.type }
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
              label='Account'
              value={cash.account}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant='standard'
              label='Balance'
              value={cash.balance}
              className={classes.lastNamee}
              disabled
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel id='select-filled-label'>Type</InputLabel>
            <Select
              labelId='select-filled-label'
              fullWidth
              id='type'
              name='type'
              value={values.type}
              onChange={handleChange}
            >
              <MenuItem value={'Client'}>Client</MenuItem>
              <MenuItem value={'Accoutant'}>Accoutant</MenuItem>
              <MenuItem value={'Non-Client'}>Non-Client</MenuItem>
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
