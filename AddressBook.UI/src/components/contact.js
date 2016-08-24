import React, {PropTypes} from 'react';


class Contact extends React.Component{
    constructor(){
      super();
        this.handleDelete = this.handleDelete.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleDelete(){
        this.props.onContactDelete(this.props.contact.Id);
    }

    handleUpdate(){
      this.props.onContactUpdate(this.props.contact);
    }

    render(){
        return(<tr>
            <td>{this.props.contact.Id}</td>
            <td>{this.props.contact.FirstName}</td>
            <td>{this.props.contact.LastName}</td>
            <td>{this.props.contact.Email}</td>
            <td>{this.props.contact.MobilePhone}</td>
            <td>{this.props.contact.HomePhone}</td>
            <td>{this.props.contact.WorkPhone}</td>
            <td><a className="btn btn-info btn-sm" contact={this.props.contact} onClick={this.handleUpdate}>Edit</a>
            </td>
            <td><a className="btn btn-danger btn-sm" id={this.props.contact.id}
                   onClick={this.handleDelete}>Delete</a>
            </td>

        </tr>);
    }
}

Contact.propTypes={
  contact: PropTypes.object.isRequired,
  onContactDelete: PropTypes.func.isRequired
};

export default Contact;
