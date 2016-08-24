import React, {PropTypes} from 'react';

import Contact from './contact';

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.data = [];
  }

  handleDelete() {
    this.props.onContactDelete(this.props.contact.Id);
  }

  handleUpdate() {
    this.props.onContactUpdate(this.props.contact);
  }

  render() {
    let contactDelete = this.props.OnContactDelete;

    let contactUpdate = this.props.OnContactUpdate;

    let contacts = [];
    this.props.data.forEach(function (contact) {
      contacts.push(<Contact key={contact.Id} contact={contact} onContactDelete={contactDelete}
                             onContactUpdate={contactUpdate}/>);
    });
    return ( <tbody>
      {contacts}
      </tbody>


    );
  }
}


ContactList.propTypes = {
  data: PropTypes.array.isRequired,
  onContactDelete: PropTypes.func.isRequired,
  'data.forEach': PropTypes.func.isRequired
};

export default ContactList;
