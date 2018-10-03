import React, { Component } from 'react'

class Login extends Component {
  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleChange = (evt) => {
    // const { name, email, password, password2 } = evt.target;
        this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = (evt) => {
    evt.preventDefault()

    const newUser = {
      email: this.state.email,
      password: this.state.password,
    }

    console.log(newUser)
  }
  render() {
    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Connexion au PBC</h1>
              <p className="lead text-center">Prends tes palets et viens bagarrer</p>
              <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control form-control-lg"
                    placeholder="Adresse mail"
                    name="email"
                    value={ this.state.email }
                    onChange={ this.handleChange }
                  />
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

export default Login;