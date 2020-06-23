// package imports
import React from 'react'
import { connect } from 'react-redux'
import {
  Container,
  Typography
} from '@material-ui/core'

function Home() {
  return (
    <Container>
      <Typography variant="h1">Hello</Typography>
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