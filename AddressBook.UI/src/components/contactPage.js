import React, {PropTypes} from 'react';
import ContactForm from './contactForm';

class ContactPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      contact: this.props.contact,
      errors: {}
    };

    this.updateContactState = this.updateContactState.bind(this);
    this.saveContact = this.saveContact.bind(this);
  }

  updateContactState(event) {
    const field = event.target.name;
    let contact = this.state.contact;
    contact[field] = event.target.value;
    return this.setState({contact: contact});
  }

  validateEmail(email) {
  let emailregex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailregex.test(email);
}

  contactFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.contact.FirstName.length < 1) {
      errors.FirstName = 'First Name is required.';
      formIsValid = false;
    }

    if (this.state.contact.LastName.length < 1) {
      errors.LastName = 'Last Name is required.';
      formIsValid = false;
    }

    if(this.state.contact.Email){
      if(!this.validateEmail(this.state.contact.Email)){
        errors.Email = 'Email is not valid.';
        formIsValid = false;

      }
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveContact(e) {
    e.preventDefault();

    if (!this.contactFormIsValid()) {
      return;
    }

    this.props.onContactSubmit(this.state.contact);

    let newContact = this.state.contact;
    newContact.FirstName = '';
    newContact.LastName = '';
    newContact.Email = '';
    newContact.MobilePhone = '';
    newContact.HomePhone = '';
    newContact.WorkPhone = '';
    newContact.Id ='';

    this.setState({contact: newContact});

  }

  render() {
    this.state.contact =  this.props.contact;
    return (
      <ContactForm
        onChange={this.updateContactState}
        onSave={this.saveContact}
        contact={this.state.contact}
        errors={this.state.errors}
      />
    );
  }
}

ContactPage.propTypes = {
  onContactSubmit: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired
};

export default ContactPage;
