import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'
import TextFieldGroup from '../common/TextFieldGroup'

// import axios from 'axios'

 class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    isAdmin: false,
    errors: {}
  }

  static getDerivedStateFromProps = nextProps => {  
      if(nextProps.errors) {
        return {
          errors: nextProps.errors 
        }
      }
      return null
    }

  // componentWillReceiveProps = nextProps => {
  //   if(nextProps.errors) {
  //     this.setState({ errors: nextProps.errors })
  //   }
  // }

  // On supprime ce componentDidMount pour garder l'accès à la création d'un nouveau compte membre accesible seulement aux admins
  // componentDidMount = () => {
  //   if(this.props.auth.isAuthenticated) {
  //     this.props.history.push('/dashboard')
  //   }
  // }
  
  handleChange = evt => {
    // const { name, email, password, password2 } = evt.target;
    // this.setState({ [evt.target.name]: evt.target.value })
    const target = evt.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name

    this.setState({
      [name]: value
    });
  }

 

  handleSubmit = evt => {
    evt.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      isAdmin: this.state.isAdmin
    }

    this.props.registerUser(newUser, this.props.history)

    // console.log(newUser)

  }

  render() {
    
    const { errors } = this.state

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Ajouter un nouveau membre</h1>
              <p className="lead text-center">Création d'un compte pour un nouveau membre du Palet Business Club</p>
              <form noValidate onSubmit={ this.handleSubmit }>
                <TextFieldGroup
                  placeholder="Nom"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  error={errors.name}
                  />
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
                <TextFieldGroup
                  placeholder="Confirmez votre mot de passe"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleChange}
                  error={errors.password2}
                />
                <div className="custom-control">
                    <label>Admin</label>
                    <input
                      type="checkbox"
                      name="isAdmin"
                      value={ this.state.isAdmin }
                      onChange={ this.handleChange }
                    />
                </div>
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

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
})


export default connect(
  mapStateToProps,  // Lecture depuis le state
  { registerUser } // Ecriture dans le state
)(withRouter(Register))