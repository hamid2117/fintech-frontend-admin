import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { CalendarToday, PermIdentity } from '@material-ui/icons'
import axios from 'axios'
import { useAuthContext } from '../../../context/AuthContext'
import Formm from './Formm'
import Comments from './Comments/index'
import Likes from './Likes'
import { toast } from 'react-toastify'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    maxWidth: '85%',
    margin: '0px auto',
    marginBottom: '35px',
  },
  main2: {
    width: '100%',
    maxWidth: '85%',
    margin: '0px auto',
    height: '170vh',
    display: 'grid',
    gap: '12px',
    gridTemplateColumns: '1fr 3fr ',
  },
}))

const User = () => {
  const classes = useStyles()
  const { id } = useParams()
  const [newData, setNewData] = useState({})
  const [comments, setComments] = useState({})
  const [likes, setlikes] = useState({})
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
        setNewData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setRedirect(true)
      }
      console.log(error)
    }
  }

  const getLikes = async () => {
    try {
      const { data } = await axios.get(
        `https://guardaround.herokuapp.com/api/v1/likes/${id}`,
        config
      )
      if (data) {
        setlikes(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setRedirect(true)
      }
      console.log(error)
    }
  }
  const getComments = async () => {
    try {
      const { data } = await axios.get(
        `https://guardaround.herokuapp.com/api/v1/comments/${id}`,
        config
      )
      if (data) {
        setComments(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // setRedirect(true)
      }
      console.log(error)
    }
  }
  useEffect(() => {
    getComments()
    getData()
    getLikes()
    toast.promise(getData, {
      pending: 'Wait few seconds Data is retrieving ....',
      success: 'Data is Retrieved .',
      error: 'Something goes wronge',
    })
    toast.promise(getLikes, {
      pending: 'Wait few seconds Likes Data is retrieving ....',
      success: 'Like Data is Retrieved .',
      error: 'Something goes wronge',
    })
    toast.promise(getComments, {
      pending: 'Wait few seconds Comments Data is retrieving ....',
      success: 'Comments Data is Retrieved .',
      error: 'Something goes wronge',
    })
  }, [])

  return (
    <>
      <div>
        <div className={classes.main}>
          <h1>Edit Incident</h1>
        </div>
        <div className={classes.main2}>
          <div>
            <div>
              <span style={{ fontWeight: 'bold' }}>Incident Detail</span>
              <div style={{ marginBottom: '9px' }}>
                <span style={{ fontWeight: 'bold' }}> Id </span>
                <span style={{ marginLeft: '10px' }}>
                  {newData && newData._id}
                </span>
              </div>
              <div style={{ marginBottom: '9px' }}>
                <CalendarToday />
                <span
                  style={{
                    marginLeft: '10px',
                    marginBottom: '15px',
                    fontSize: '13px',
                  }}
                >
                  {newData && newData.createdAt}
                </span>
              </div>
              <div>
                <PermIdentity />
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.user} {''}{' '}
                </span>
              </div>

              <div style={{ margin: '20px 0px' }}>
                <span style={{ fontWeight: 'bold' }}>More Detail</span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Title : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.title}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Status : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.status}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Description : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.description}
                </span>
              </div>
              <div>
                <span style={{ fontWeight: 'bold' }}> Type : </span>
                <span style={{ marginLeft: '10px', marginBottom: '15px' }}>
                  {newData && newData.type}
                </span>
              </div>
            </div>
          </div>
          <div>
            <div style={{ marginBottom: '15px' }}>
              <span style={{ fontWeight: 'bold' }}>edit</span>
            </div>
            <Formm config={config} id={id} setNewData={setNewData} />
          </div>
          <div style={{ gridColumn: '1/ span 4' }}>
            <Likes like={likes} />
          </div>
          <div style={{ gridColumn: '1/ span 4' }}>
            <Comments comment={comments} getComments={getComments} />
          </div>
        </div>
      </div>
    </>
  )
}

export default User
