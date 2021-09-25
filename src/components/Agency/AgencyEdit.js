import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid } from '@material-ui/core'
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
    label: 'loading...',
  })
  const [values, setValues] = useState({
    label: '',
  })
  const onSubmit = async (value) => {
    value.preventDefault()
    try {
      const { data: dataa } = await axios.put(
        `${devApi}editagency/${id}`,
        values,
        config
      )
      if (dataa) {
        toast.success('Agency Data is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}agency/${id}`, config)
    setCash(data)
    setValues((value) => {
      return { ...value, label: data.label }
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
              name='label'
              className={classes.lastNamee}
              value={values.label}
              onChange={handleChange}
              fullWidth
            />
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
