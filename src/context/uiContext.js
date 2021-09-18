import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuthContext } from './AuthContext'
const UiContext = createContext()

export const UiProvider = ({ children }) => {
  const { userdata } = useAuthContext()
  const [login, setLogin] = useState(false)
  const [register, setRegister] = useState(false)
  const [adminRegister, setAdminRegister] = useState(false)
  const [adminEdit, setAdminEdit] = useState('')
  const [adminCourse, setAdminCourse] = useState(false)
  const [adminRegisterReload, setAdminRegisterReload] = useState(false)
  const [adminFeedback, setAdminFeedback] = useState(false)
  const closeLogin = () => {
    setLogin(false)
  }
  const openLogin = () => {
    setLogin(true)
    setRegister(false)
  }
  const closeRegister = () => {
    setRegister(false)
  }
  const openRegister = () => {
    setRegister(true)
    setLogin(false)
  }
  const adminCloseRegister = () => {
    setAdminRegisterReload(true)
    setAdminRegister(false)
  }
  const adminOpenRegister = () => {
    setAdminRegisterReload(false)
    setAdminRegister(true)
  }
  const adminCloseCourse = () => {
    // console.log('close')
    setAdminCourse(false)
  }
  const adminOpenCourse = () => {
    // console.log('adsfasdfasdf')
    setAdminCourse(true)
  }
  const adminCloseEdit = () => {
    setAdminEdit(false)
  }
  const adminCloseFeedback = () => {
    setAdminFeedback(false)
  }
  const adminOpenFeedback = () => {
    setAdminFeedback(true)
  }
  const adminOpenEdit = (id) => {
    setAdminEdit(id)
  }

  useEffect(() => {
    if (userdata.email) {
      closeRegister()
      closeLogin()
    }
  }, [userdata])

  return (
    <UiContext.Provider
      value={{
        login,
        register,
        closeLogin,
        adminRegister,
        openLogin,
        adminEdit,
        adminRegisterReload,
        adminCloseEdit,
        adminOpenEdit,
        closeRegister,
        adminOpenRegister,
        adminCloseRegister,
        openRegister,
        adminCloseCourse,
        adminOpenCourse,
        adminCourse,
        adminOpenFeedback,
        adminFeedback,
        adminCloseFeedback,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
export const useGlobalUiContext = () => {
  return useContext(UiContext)
}
