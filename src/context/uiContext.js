import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './AuthContext'
const UiContext = createContext()

export const UiProvider = ({ children }) => {
  const { userdata } = useAuthContext()
  const [adminRegister, setAdminRegister] = useState(false)
  const [adminCash, setadminCash] = useState(false)
  const adminCloseRegister = () => {
    setAdminRegister(false)
  }
  const adminOpenRegister = () => {
    setAdminRegister(true)
  }
  const adminCloseCash = () => {
    setadminCash(false)
  }
  const adminOpenCash = () => {
    setadminCash(true)
  }

  return (
    <UiContext.Provider
      value={{
        adminOpenRegister,
        adminCloseRegister,
        adminRegister,
        adminCloseCash,
        adminOpenCash,
        adminCash,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
export const useGlobalUiContext = () => {
  return useContext(UiContext)
}
