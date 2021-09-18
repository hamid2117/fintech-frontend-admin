import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Paper } from '@material-ui/core'
import { useAuthContext } from '../../context/AuthContext'
import Detail from './Detail'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '1200px',
    margin: '15px auto',
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    },

    display: 'grid',
    '@media (max-width: 500px)': {},
  },
  img: {
    margin: '20px auto',
  },
}))

const PreviewPage = () => {
  const [data, setData] = useState({})
  const classes = useStyles()
  const { id } = useParams()
  const { userdata } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://guardaround.herokuapp.com/api/v1/incident/${id}`,
        config
      )

      if (data) {
        setData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <>
      <Paper elevation={2} className={classes.main}>
        <div className={classes.img}>
          <img
            src={
              'https://i.tribune.com.pk/media/images/GB1597735345-0/GB1597735345-0.jpg'
            }
            style={{ width: '500px', borderRadius: '5px' }}
            alt='Image'
          />
        </div>
        {data && <Detail {...data} />}
      </Paper>
    </>
  )
}
export default PreviewPage
