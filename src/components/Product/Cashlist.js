import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { productData } from '../../DummyData'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import { useAuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { IconButton, Button } from '@material-ui/core'
import axios from 'axios'
import DeleteModel from '../DeleteModel'
import { useGlobalUiContext } from '../../context/uiContext'
import { toast } from 'react-toastify'
import { devApi } from '../../api'

const UserList = () => {
  const [data, setData] = useState(productData)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [newId, setNewId] = useState('')
  const { adminProduct } = useGlobalUiContext()
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
      const { data } = await axios.get(`${devApi}product`, config)
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
    if (!adminProduct) {
      getData()
    }
  }, [adminProduct])

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(`${devApi}product/${id}`, config)
      if (response) {
        getData()
        setDeleteData(false)
        toast.error('Product is deleted.')
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
    { field: 'codee', headerName: 'Code', width: 130 },
    { field: 'label', headerName: 'Label', width: 130 },
    { field: 'durationEnum', headerName: 'DurationEnums', width: 140 },
    { field: 'statusEnum', headerName: 'StatusEnums', width: 130 },
    { field: 'association', headerName: 'Association', width: 130 },
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
      field: 'action',
      headerName: 'Action',
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/productedit/${params.row._id}`}>
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
          <div className='lds-hourglass'></div>
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
