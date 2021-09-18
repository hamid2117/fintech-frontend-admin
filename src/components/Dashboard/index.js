import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Dashboard } from './DummyDataDashboard'
import DetailBox from './DetailBox'
import axios from 'axios'
const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    margin: '0px auto',
    '@media (max-width: 500px)': {},
  },
  grid: {
    display: 'grid',
    width: '100%',
    maxWidth: '1100px',
    margin: '0px auto',
    marginTop: '100px',
    gap: '0px 20px',
    gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr',
  },
}))
const InvoicePage = () => {
  const [numbers, setNumbers] = useState({})
  const classes = useStyles()

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://guardaround.herokuapp.com/api/v1/numbers`
      )

      if (data) {
        setNumbers(data)
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
      <section className={classes.main}>
        <div className={classes.grid}>
          {Dashboard.map((data) => {
            const { id } = data
            return <DetailBox key={id} {...data} numbers={numbers} />
          })}
        </div>
      </section>
    </>
  )
}
export default InvoicePage
