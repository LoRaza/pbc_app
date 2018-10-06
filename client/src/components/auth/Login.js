import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'


class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  // static getDerivedStateFromProps = nextProps => {
  //   if(nextProps.auth.isAuthenticated) {
  //     return {
        
  //     }
  //   }
  
  //     if(nextProps.errors) {
  //       return {
  //         errors: nextProps.errors 
  //       }
  //     }

  //   }

  componentWillReceiveProps = nextProps => {
    if(nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }

    if(nextProps.errors) {
      this.setState({ errors: nextProps.errors })
    }
  }

  componentDidMount = () => {
    if(this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard')
    }
  }

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    evt.preventDefault()

    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    console.log(userData)
    this.props.loginUser(userData)
  }
  render() {

    const { errors } = this.state

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Connexion au PBC</h1>
              <p className="lead text-center">Prends tes palets et viens bagarrer</p>
              <form onSubmit={ this.handleSubmit }>
                <TextFieldGroup
                  placeholder="Adresse mail"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleChange}
                  error={errors.email}
                />
                <TextFieldGroup
                  placeholder="Mot de passe"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleChange}
                  error={errors.password}
                />
                <input
                  type="submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(Login)