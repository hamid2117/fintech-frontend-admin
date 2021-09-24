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

export default function NewUser() {
  const classes = useStyles()
  const { adminProduct, adminCloseProduct } = useGlobalUiContext()
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
      .post(`${devApi}product`, data, config)
      .catch((e) => {
        if (e && e.response) {
          if (e.response.status === 400) {
            toast.error('This code is already in use .')
          }
        }
      })
    if (response && response.data) {
      adminCloseProduct()
      toast.success('Product is Created.')
      formik.resetForm()
    }
  }
  useEffect(async () => {
    const { data } = await axios.get(`${devApi}agency`, config)
    setAgency(data)
  }, [])

  const formik = useFormik({
    initialValues: {
      codee: '',
      label: '',
      type: 'Client',
      durationEnum: 'Month',
      statusEnum: false,
      association: false,
    },
    onSubmit,
  })

  return (
    <div>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={adminProduct}
        onClose={adminCloseProduct}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={adminProduct}>
          <div className={classes.paper}>
            <div className={classes.head}>
              <h3> CashBook Register</h3>
              <div style={{ justifySelf: 'end' }}>
                <IconButton onClick={() => adminCloseProduct()}>
                  <CloseIcon />
                </IconButton>
              </div>
            </div>
            <Divider />
            <form onSubmit={formik.handleSubmit} className={classes.inputs}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id='codee'
                    name='codee'
                    variant='standard'
                    label='Code'
                    required
                    type='number'
                    value={formik.values.codee}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='codee'
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id='label'
                    name='label'
                    variant='standard'
                    label='Label'
                    required
                    value={formik.values.label}
                    onChange={formik.handleChange}
                    className={classes.lastNamee}
                    fullWidth
                    autoComplete='codee'
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>durationEnum</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='durationEnum'
                    name='durationEnum'
                    value={formik.values.durationEnum}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={'Month'}>Month</MenuItem>
                    <MenuItem value={'BioMonthly'}>BioMonthly</MenuItem>
                    <MenuItem value={'Quarter'}>Quarter</MenuItem>
                    <MenuItem value={'Semester'}>Semester</MenuItem>
                    <MenuItem value={'Annual'}>Annual</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>statusEnum</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='statusEnum'
                    name='statusEnum'
                    value={formik.values.statusEnum}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={false}>Disabled</MenuItem>
                    <MenuItem value={true}>Enabled</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12}>
                  <InputLabel id='select-filled-label'>Association</InputLabel>
                  <Select
                    labelId='select-filled-label'
                    fullWidth
                    id='association'
                    name='association'
                    value={formik.values.association}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={false}>Scale</MenuItem>
                    <MenuItem value={true}>Product</MenuItem>
                  </Select>
                </Grid>
              </Grid>
              <Button className={classes.sign} type='submit'>
                add Product
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
