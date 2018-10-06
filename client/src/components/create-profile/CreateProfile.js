import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import TextFieldGroup from '../common/TextFieldGroup'
import SelectListGroup from '../common/SelectListGroup'
import InputGroup from '../common/InputGroup'
import { createProfile } from '../../actions/profileActions'

class CreateProfile extends Component {

  state = {
    handle: '',
    firstname: '',
    lastname: '',
    work: '',
    company: '',
    companyLogo: '',
    companyMail: '',
    website: '',
    phone: '',
    skills: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
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

  handleChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit = evt => {
    evt.preventDefault()

    const profileData = {
      handle: this.state.handle,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      work: this.state.work,
      company: this.state.company,
      companyLogo: this.state.companyLogo,
      companyMail: this.state.companyMail,
      website: this.state.website,
      phone: this.state.phone,
      skills: this.state.skills,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      linkedin: this.state.linkedin,
      youtube: this.state.youtube,
      instagram: this.state.instagram      
    }

    console.log('submit')

    this.props.createProfile(profileData, this.props.history)
  }

  render() {

    const { errors, displaySocialInputs } = this.state

    let socialInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="URL profil Twitter"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.handleChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="URL profil Facebook"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.handleChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="URL profil Linkedin"
            name="linkedin"
            icon="fab fa-linkedin"
            value={this.state.linkedin}
            onChange={this.handleChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="URL chaîne YouTube"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.handleChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="URL page Instagram"
            name="instagram"
            icon="fab fa-instagram"
            value={this.state.instagram}
            onChange={this.handleChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Options de sélection pour le niveau au palet
    const options = [
      { label: 'Quel est votre niveau au palet ?', value: 0 },
      { label: 'Le pointeur', value: 'Le pointeur' },
      { label: 'Le tireur', value: 'Le tireur' },
      { label: 'Le joueur du dimanche', value: 'Le joueur du dimanche' },
      { label: 'L\'aveugle', value: 'L\'aveugle' }
    ]

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Crée ton profil
              </h1>
              <p className="lead text-center">
                Renseignez vos infos pour permettre aux autres membres d'en savoir plus sur vous
              </p>
              <p className="font-italic text-center">
                Seuls les membres ont accès à toutes les infos
              </p>
              <small className="d-block pb-3">* = champs requis</small>
              <form onSubmit={this.handleSubmit}>
                <TextFieldGroup
                  placeholder="* Votre nom d'utilisateur"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.handleChange}
                  error={errors.handle}
                  info="Ce nom servira pour l'URL de votre profil. Cela peut-être votre nom de famille, le nom de votre entreprise, un surnom..."
                />
                <TextFieldGroup
                  placeholder="* Prénom"
                  name="firstname"
                  value={this.state.firstname}
                  onChange={this.handleChange}
                  error={errors.handle}
                />
                <TextFieldGroup
                  placeholder="* Nom"
                  name="lastname"
                  value={this.state.lastname}
                  onChange={this.handleChange}
                  error={errors.lastname}
                />
                <TextFieldGroup
                  placeholder="* Métier"
                  name="work"
                  value={this.state.work}
                  onChange={this.handleChange}
                  error={errors.work}
                />
                <TextFieldGroup
                  placeholder="Entreprise"
                  name="company"
                  value={this.state.company}
                  onChange={this.handleChange}
                  error={errors.company}
                  info="Votre entreprise ou celle où vous travaillez"
                />
                <TextFieldGroup
                  placeholder="Mail pro"
                  name="companyMail"
                  value={this.state.companyMail}
                  onChange={this.handleChange}
                  error={errors.companyMail}
                />
                <TextFieldGroup
                  placeholder="Site web"
                  name="website"
                  value={this.state.website}
                  onChange={this.handleChange}
                  error={errors.website}
                  info="Le site web ou la page linkedin de votre entreprise"
                />
                <TextFieldGroup
                  placeholder="Téléphone"
                  name="phone"
                  value={this.state.phone}
                  onChange={this.handleChange}
                  error={errors.phone}
                  info="Pro ou perso"
                />
                {/* 
                  TODO :
                  Gérer l'upload d'une photo de profil et d'un logo d'entreprise
                */}
                <SelectListGroup
                  name="skills"
                  value={this.state.skills}
                  onChange={this.handleChange}
                  error={errors.skills}
                  options={options}
                  info="Rien de bien sérieux, juste à titre indicatif ;)"
                />
                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Ajoutez vos liens vers les réseaux sociaux
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
})

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile))