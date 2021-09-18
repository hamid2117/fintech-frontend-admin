import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Button } from '@material-ui/core'
import { devApi } from '../../api'
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera'
export default function FileUpload({ id }) {
  const [image, setImage] = useState({ preview: '', raw: '' })
  const [hover, setHover] = useState(false)

  const handleChange = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      })
    }
  }
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }

  const handleUpload = async (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('image', image.raw)
    // console.log(image)
    const response = await axios.post(`${devApi}upload`, formData, config)
    if (response.status === 205) {
      toast.success('file Upload successfully')
    }
  }

  return (
    <div>
      <label htmlFor='upload-button'>
        <>
          <div
            onMouseOver={{ cursor: 'pointer' }}
            onMouseEnter={() => {
              setHover(true)
            }}
            onMouseLeave={() => {
              setHover(false)
            }}
            style={hover ? { cursor: 'pointer' } : { cursor: 'default' }}
          >
            <h5 className='text-center'>Upload your photo</h5>
            <PhotoCameraIcon />
          </div>
        </>
      </label>
      <input
        type='file'
        id='upload-button'
        style={{ display: 'none' }}
        onChange={handleChange}
      />
      <br />
      <Button variant='outlined' color='primary' onClick={handleUpload}>
        Upload
      </Button>
    </div>
  )
}
