import React from 'react'
import * as Yup from 'yup'
import { Formik, Form, ErrorMessage } from 'formik'
import axios from 'axios'
import { Grid, InputLabel, MenuItem, Select, Button } from '@material-ui/core'

const Multiple = ({ id }) => {
  return (
    <Formik
      initialValues={{
        type: 'images',
        profile: [],
      }}
      validationSchema={Yup.object({
        profile: Yup.array().min(1, 'select at least 1 file'),
      })}
      onSubmit={(values, props) => {
        let data = new FormData()
        values.profile.forEach((photo, index) => {
          data.append(`${values.type}`, values.profile[index])
        })
        console.log(values)
        console.log(data)
        axios
          .post(
            `https://guardaround.herokuapp.com/api/v1/incidentimg/${id}`,
            data,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          )
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }}
    >
      {(formik) => {
        return (
          <>
            <Form>
              <Grid item xs={12}>
                <InputLabel id='select-filled-label'>Type</InputLabel>
                <Select
                  labelId='select-filled-label'
                  fullWidth
                  style={{ width: '70%' }}
                  name='type'
                  value={formik.values.type}
                  onChange={formik.handleChange}
                >
                  <MenuItem value={'images'}>Image</MenuItem>
                  <MenuItem value={'vedios'}>Video</MenuItem>
                </Select>
              </Grid>
              <br />
              <input
                id='file'
                name='profile'
                type='file'
                onChange={(event) => {
                  const files = event.target.files
                  let myFiles = Array.from(files)
                  formik.setFieldValue('profile', myFiles)
                }}
                accept='image/*,video/*'
                multiple
              />
              <ErrorMessage name='profile' />
              <Button
                color='primary'
                variant='outlined'
                type='submit'
                disabled={formik.isSubmitting}
              >
                Upload
              </Button>
            </Form>
          </>
        )
      }}
    </Formik>
  )
}

export default Multiple
