import React, { Component } from 'react'

 class Register extends Component {
  state = {
    name: '',
    email: '',
    password: '',
    password2: '',
    errors: {}
  }

  handleChange = (evt) => {
    // const { name, email, password, password2 } = evt.target;
        this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    }

    console.log(newUser)
  }

  render() {
    
    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Ajouter un nouveau membre</h1>
              <p className="lead text-center">Création d'un compte pour un nouveau membre du Palet Business Club</p>
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Nom"
                    name="name"
                    value={ this.state.name }
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Email"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleChange }
                  />
                  {/* <small className="form-text text-muted">This site uses Gravatar so if you want a profile image, use a Gravatar email</small> */}
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control form-control-lg"
                    placeholder="Mot de passe"
                    name="password"
                    value={ this.state.password }
                    onChange={ this.handleChange }
                  />
                </div>
                <div className="form-group">
                  <input type="password"
                    className="form-control form-control-lg"
                    placeholder="Confirmer le mot de passe"
                    name="password2"
                    value={ this.state.password2 }
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

export default Register;