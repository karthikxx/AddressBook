import React, {PropTypes} from 'react';

import ContactForm from './contactForm';
import ContactList from './contactList';

class ContactBox extends React.Component {
  constructor() {
    super();

    this.handleContactSubmit = this.handleContactSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    let ucontact = {Id:'',FirstName: '', LastName: '', Email: '', MobilePhone: '', HomePhone: '', WorkPhone: ''};
    this.state = { contact: ucontact };
  }

  componentDidMount() {
    this.loadContactsFromServer();
  }

  loadContactsFromServer() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'GET',
      cache: false,
      success: function (data) {
        this.setState({data: data});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }


  handleContactSubmit(contact) {
    if (!contact.Id) {
      delete contact.Id;
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        type: 'POST',
        data: contact,
        success: function (contact) {
          let items = this.state.data;
          items.push(contact);
          this.setState({data: items});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
    else {
      $.ajax({
        url: 'http://localhost:5000/api/contacts/' + contact.Id,
        dataType: 'json',
        type: 'PUT',
        data: contact,
        success: function (contact) {
          let items = this.state.data.filter(function (item) {
            return item.Id != contact.Id;
          });
          items.push(contact);
          this.setState({data: items});
        }.bind(this),
        error: function (xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }
  }
  handleDelete(id) {

    $.ajax({
      url: 'http://localhost:5000/api/contacts/' + id,
      dataType: 'json',
      type: 'DELETE',
      cache: false,
      success: function (res) {
        //this.setState({data: res});
      }.bind(this),
      error: function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    let items = this.state.data.filter(function (contact) {
      return contact.Id != id;
    });

    this.setState({data: items});
  }

  handleUpdate(contact) {
    this.setState({contact: contact});
  }


  render() {
    return (
      <div className="container body-content">
        <div className="row" style={{"margin-top": "30px"}}>
          <div className="col-md-3">
            <h3>Add / Update Contact</h3>
            <ContactForm onContactSubmit={this.handleContactSubmit} contact={this.state.contact}/>
          </div>
          <div className="col-md-9">
            <h3>All Contacts</h3>
            <table className="table table-hover">
              <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Work</th>
                <th>Home</th>
                <th></th>
                <th></th>
              </tr>
              </thead>

              <ContactList data={this.state.data} OnContactDelete={this.handleDelete}
                           OnContactUpdate={this.handleUpdate}/>

            </table>


          </div>
        </div>
      </div>
    );
  }
}

ContactBox.propTypes = {
  url: PropTypes.string.isRequired
};

export default ContactBox;
