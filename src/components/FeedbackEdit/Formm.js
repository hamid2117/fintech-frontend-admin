import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { TextField, Button, Grid } from '@material-ui/core'
import { useFormik } from 'formik'
import * as yup from 'yup'
import axios from 'axios'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'grid ',
    width: '80%',
    gap: '10px',
    '@media (max-width: 500px)': {},
  },
}))

const validationSchema = yup.object({
  feedback: yup
    .string()
    .min(5, 'Please write correct Feedback')
    .required('Please write Feedback to Edit . '),
})
const Formm = ({ config, id, setNewData }) => {
  const classes = useStyles()

  const onSubmit = async (value) => {
    const { ...data } = value
    try {
      const { data: dataa } = await axios.put(
        `https://guardaround.herokuapp.com/api/v1/editfeedback/${id}`,
        data,
        config
      )
      if (dataa) {
        formik.resetForm()
        setNewData(dataa)
        toast.success('Feedback is updated.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const formik = useFormik({
    initialValues: {
      feedback: '',
    },
    onSubmit,
    validationSchema,
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={classes.main}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              id='feedback'
              name='feedback'
              variant='standard'
              label='Feedback'
              multiline
              minRows={3}
              error={
                formik.touched.feedback && formik.errors.feedback ? true : false
              }
              helperText={
                formik.touched.feedback && formik.errors.feedback
                  ? formik.errors.feedback
                  : null
              }
              onBlur={formik.handleBlur}
              value={formik.values.feedback}
              onChange={formik.handleChange}
              className={classes.lastNamee}
              fullWidth
            />
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
