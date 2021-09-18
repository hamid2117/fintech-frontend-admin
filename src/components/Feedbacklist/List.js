import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { feedbackData } from '../../DummyData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { IconButton, Button, CircularProgress } from '@material-ui/core'
import axios from 'axios'
import DeleteModel from '../DeleteModel'
import { useGlobalUiContext } from '../../context/uiContext'
import { toast } from 'react-toastify'

const UserList = () => {
  const [data, setData] = useState(feedbackData)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newId, setNewId] = useState('')
  const { adminCloseFeedback, adminFeedback } = useGlobalUiContext()
  const { userdata } = useAuthContext()
  const { token } = userdata

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  const getData = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        'https://guardaround.herokuapp.com/api/v1/feedback',
        config
      )
      if (data) {
        setLoading(false)
        setData(data)
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log(error)
      }
    }
  }
  useEffect(() => {
    if (!adminFeedback) {
      getData()
    }
  }, [adminFeedback])

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(
        `https://guardaround.herokuapp.com/api/v1/feedback/${id}`,
        config
      )
      if (response) {
        getData()
        setDeleteData(false)
        toast.error('Feedback is deleted.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const closeModel = () => {
    setModel(false)
  }
  const deleteUser = () => {
    setDeleteData(true)
    setModel(false)
  }
  const handleDeleteBtn = (id) => {
    setNewId(id)
    setModel(true)
  }

  useEffect(() => {
    if (deleteData) {
      handleDelete(newId)
    }
  }, [deleteData])

  const columns = [
    { field: '_id', headerName: 'ID', width: 100 },
    { field: 'feedback', headerName: 'Feedback', width: 260 },
    {
      field: 'user',
      headerName: 'User',
      width: 130,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.user && params.row.user.firstName} {'   '}{' '}
            {params.row.user && params.row.user.lastName}
          </div>
        )
      },
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 170,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.createdAt.substring(0, 10)}
          </div>
        )
      },
    },
    {
      field: 'updatedAt',
      headerName: 'updatedAt',
      width: 170,
      renderCell: (params) => {
        return (
          <div className='userList'>
            {params.row.updatedAt.substring(0, 10)}
          </div>
        )
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/feedbackedit/${params.row._id}`}>
              Edit
            </Button>
            <IconButton
              className='userListDelete'
              onClick={() => {
                handleDeleteBtn(params.row._id)
              }}
            >
              <DeleteOutlineIcon />
            </IconButton>
          </>
        )
      },
    },
  ]

  return (
    <>
      {loading ? (
        <div
          style={{
            width: '100%',
            height: '80%',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <CircularProgress color='primary' />
        </div>
      ) : (
        <DataGrid
          rows={data}
          disableSelectionOnClick
          getRowId={(row) => row._id}
          columns={columns}
          pageSize={8}
          checkboxSelection
        />
      )}
      <DeleteModel
        model={model}
        closeModel={closeModel}
        deleteUser={deleteUser}
      />
    </>
  )
}

export default UserList
