import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const SuperPrivateRoute = ({ component: Component, auth, ...rest}) => (

  // user = this.props.auth
  <Route 
    {...rest}
    render = { props =>
      (auth.isAuthenticated === true && auth.user.isAdmin === true)
      ? <Component {...props} />
      : <Redirect to="/dashboard" /> 
    }
  />
)

SuperPrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(SuperPrivateRoute)