// package imports
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'

function Home() {
  // some state for testing response from backend
  const [message, setMessage] = React.useState('Backend not yet connected...')

  // on initial render, retrieve message from backend
  React.useEffect(() => {
    axios({
      method: 'get',
      url: `${process.env.REACT_APP_API_URL}api/v1/`,
      data: {},
      headers: {},
    })
      .then(response => {
        setMessage(response.data.message)
      })
      .catch(error => { console.log(error) })
  }, [])

  return (
    <div>
      <h1>Home Component</h1>
      <p>{message}</p>
    </div>
  )
}

function mapStateToProps(state) {
  // minimize the amount of state sent to component by doing data manipulation here
  return {
    // return only the state you want this component to have
  }
}

export default connect(mapStateToProps)(Home);