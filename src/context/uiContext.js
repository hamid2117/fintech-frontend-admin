import React, { createContext, useContext, useState } from 'react'
import { useAuthContext } from './AuthContext'
const UiContext = createContext()

export const UiProvider = ({ children }) => {
  const { userdata } = useAuthContext()
  const [adminRegister, setAdminRegister] = useState(false)
  const [adminCash, setadminCash] = useState(false)
  const [adminCashBook, setadminCashBook] = useState(false)
  const [adminAgency, setAdminAgency] = useState(false)
  const [adminProduct, setAdminProduct] = useState(false)
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
  const adminCloseCashBook = () => {
    setadminCashBook(false)
  }
  const adminOpenCashBook = () => {
    setadminCashBook(true)
  }
  const adminCloseAgency = () => {
    setAdminAgency(false)
  }
  const adminOpenAgency = () => {
    setAdminAgency(true)
  }
  const adminCloseProduct = () => {
    setAdminProduct(false)
  }
  const adminOpenProduct = () => {
    setAdminProduct(true)
  }

  return (
    <UiContext.Provider
      value={{
        adminOpenRegister,
        adminCloseRegister,
        adminRegister,
        adminOpenCash,
        adminCloseCash,
        adminCash,
        adminOpenAgency,
        adminCloseAgency,
        adminAgency,
        adminOpenCashBook,
        adminCloseCashBook,
        adminCashBook,
        adminOpenProduct,
        adminCloseProduct,
        adminProduct,
      }}
    >
      {children}
    </UiContext.Provider>
  )
}
export const useGlobalUiContext = () => {
  return useContext(UiContext)
}
