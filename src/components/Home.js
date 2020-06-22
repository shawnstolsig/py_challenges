// package imports
import React from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import {
  Container,
  Typography
} from '@material-ui/core'

function Home() {
  return (
    <Container>
      <Typography variant="h1">Hello</Typography>
      <iframe src="https://trinket.io/embed/python/b9eca3d1b5" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
    </Container>
  )
}

function mapStateToProps(state) {
  // minimize the amount of state sent to component by doing data manipulation here
  return {
    // return only the state you want this component to have
  }
}

export default connect(mapStateToProps)(Home);