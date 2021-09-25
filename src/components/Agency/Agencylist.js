import React, { useState, useEffect } from 'react'
import { DataGrid } from '@material-ui/data-grid'
import { agencyData } from '../../DummyData'
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
  const [data, setData] = useState(agencyData)
  const [model, setModel] = useState(false)
  const [deleteData, setDeleteData] = useState(false)
  const [loading, setLoading] = useState(true)
  const [numberAgency, setNumberAgency] = useState({})
  const [newId, setNewId] = useState('')
  const { adminAgency } = useGlobalUiContext()
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
      const { data } = await axios.get(`${devApi}agency`, config)
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
    if (!adminAgency) {
      getData()
    }
  }, [adminAgency])

  useEffect(async () => {
    const { data } = await axios.get(`${devApi}cash`, config)
    const newData = data.map((data) => {
      return data.agency
    })
    setNumberAgency(newData)
  }, [devApi])

  const handleDelete = async (id) => {
    try {
      setLoading(true)
      const response = await axios.delete(`${devApi}agency/${id}`, config)
      if (response) {
        getData()
        setDeleteData(false)
        toast.error('CashRegister is deleted.')
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
    { field: '_id', headerName: 'ID', width: 300 },
    { field: 'codee', headerName: 'Code', width: 170 },
    {
      field: 'label',
      headerName: 'Label',
      width: 170,
    },
    {
      field: 'createdAt',
      headerName: 'CreatedAt',
      width: 200,
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
      width: 180,
      renderCell: (params) => {
        return (
          <>
            <Button component={Link} to={`/agencyedit/${params.row._id}`}>
              Edit
            </Button>
            {!numberAgency.find((data) => data === params.row._id) ? (
              <IconButton
                className='userListDelete'
                onClick={() => {
                  handleDeleteBtn(params.row._id)
                }}
              >
                <DeleteOutlineIcon />
              </IconButton>
            ) : null}
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
