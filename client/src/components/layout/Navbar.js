import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'

class Navbar extends Component {

  onLogoutClick = evt => {
    evt.preventDefault()
    this.props.logoutUser()
    this.props.clearCurrentProfile()
  }

  render() {

    const { isAuthenticated, user } = this.props.auth

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a
            href=""
            onClick={ this.onLogoutClick }
            className="nav-link"
          >
          <img
            src={user.avatar}
            alt={user.name}
            style={{ width: '25px', marginRight: '15px' }}
            title="Vous devez avoir Gravatar connecté à votre email pour afficher une image"
            className="rounded-circle"
          />
            Déconnexion
          </a>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Autres pages
          </Link>
        </li>
      </ul>
    )

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Connexion
          </Link>
        </li>
      </ul>
    )

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Palet Business Club
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-toggle="collapse" 
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            { isAuthenticated ? authLinks : guestLinks }
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar)