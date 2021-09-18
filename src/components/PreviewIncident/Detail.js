import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'grid',
    padding: '10px 25px',
    '@media (max-width: 500px)': {},
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
  },
}))
const InvoicePage = ({
  _id,
  title,
  type,
  status,
  description,
  createdAt,
  updatedAt,
}) => {
  const classes = useStyles()

  return (
    <>
      <section className={classes.main}>
        <div className={classes.grid}>
          <div>
            <div className={classes.heading}>
              <h5>ID :</h5>
              <p>{_id}</p>
            </div>
            <div className={classes.heading}>
              <h3>Title :</h3>
              <p>{title}</p>
            </div>
            <div className={classes.heading}>
              <h4>Type :</h4>
              <p>{type}</p>
            </div>
            <div className={classes.heading}>
              <h4>Status :</h4>
              <p>{status}</p>
            </div>
          </div>
          <div>
            <br />
            <br />
            <div className={classes.heading}>
              <h4>CreatedAt :</h4>
              <p>{createdAt}</p>
            </div>
            <br />
            <div className={classes.heading}>
              <h4>UpdatedAt :</h4>
              <p>{updatedAt}</p>
            </div>
          </div>
        </div>
        <div className={classes.heading}>
          <h4>Description :</h4>
          <p>{description} </p>
        </div>
      </section>
    </>
  )
}
export default InvoicePage
