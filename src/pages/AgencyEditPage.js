import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Helmet } from 'react-helmet'
import CashEdit from '../components/Agency/AgencyEdit'
import { useAuthContext } from '../context/AuthContext'
import { useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    margin: '0px auto',
    display: 'grid',
    gridTemplateColumns: '80px auto',
    '@media (max-width: 500px)': {
      gridTemplateColumns: '1fr',
    },
  },
  main2: {
    width: '100%',
    maxWidth: '70%',
    margin: '100px auto',
  },
}))
const AccountPage = () => {
  const classes = useStyles()
  const { userdata } = useAuthContext()
  const { token } = userdata
  const { id } = useParams()
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  return (
    <>
      <Helmet>
        <title>Fintech |AgencyEdit</title>
      </Helmet>
      <Navbar />
      <section className={classes.main}>
        <Sidebar />
        <section className={classes.main2}>
          <CashEdit id={id} config={config} />
        </section>
      </section>
    </>
  )
}
export default AccountPage
