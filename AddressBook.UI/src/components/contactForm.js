import React, {PropTypes} from 'react';


class ContactForm extends React.Component {
  constructor(props) {

    super(props);

    this.state = { contact: this.props.contact };


    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleMobilePhChange = this.handleMobilePhChange.bind(this);
    this.handleHomePhChange = this.handleHomePhChange.bind(this);
    this.handleWorkPhChange = this.handleWorkPhChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFirstNameChange(e) {
    let newContact = this.state.contact;
    newContact.FirstName = e.target.value;
    this.setState(newContact);
  }


  handleLastNameChange(e) {
    let newContact = this.state.contact;
    newContact.LastName = e.target.value;
    this.setState(newContact);
  }

  handleEmailChange(e) {
    let newContact = this.state.contact;
    newContact.Email = e.target.value;
    this.setState(newContact);
  }

  handleMobilePhChange(e) {
    let newContact = this.state.contact;
    newContact.MobilePhone = e.target.value;
    this.setState(newContact);
  }

  handleHomePhChange(e) {
    let newContact = this.state.contact;
    newContact.HomePhone = e.target.value;
    this.setState(newContact);
  }

  handleWorkPhChange(e) {
    let newContact = this.state.contact;
    newContact.WorkPhone = e.target.value;
    this.setState(newContact);
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.onContactSubmit(this.state.contact);

    let newContact = this.state.contact;
    newContact.FirstName = '';
    newContact.LastName = '';
    newContact.Email = '';
    newContact.MobilePhone = '';
    newContact.HomePhone = '';
    newContact.WorkPhone = '';
    newContact.Id ='';
    this.setState(newContact);
  }

  render() {
    this.state = { contact: this.props.contact };
    return (<form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input className="form-control" placeholder="required" value={this.state.contact.FirstName}
                 onChange={this.handleFirstNameChange} required></input>
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input className="form-control" placeholder="required" value={this.state.contact.LastName}
                 onChange={this.handleLastNameChange} required></input>
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input className="form-control" placeholder="about@about.com" value={this.state.contact.Email}
                 onChange={this.handleEmailChange} errorMessage="Name is invalid" required type="email"></input>
        </div>

        <div className="form-group">
          <label>Mobile Phone</label>
          <input className="form-control" value={this.state.contact.MobilePhone}
                 onChange={this.handleMobilePhChange}></input>
        </div>

        <div className="form-group">
          <label>Home Phone</label>
          <input className="form-control" value={this.state.contact.HomePhone}
                 onChange={this.handleHomePhChange}></input>
        </div>

        <div className="form-group">
          <label>Work Phone</label>
          <input className="form-control" value={this.state.contact.WorkPhone}
                 onChange={this.handleWorkPhChange}></input>
        </div>

        <button type="submit" className="btn btn-default">Submit</button>

      </form>
    );
  }
}

ContactForm.propTypes = {
  onContactSubmit: PropTypes.func.isRequired,
  contact: PropTypes.object.isRequired
};

export default ContactForm;
