
var React = require('react');

var Contact = React.createClass({
    handleDelete: function() {
        this.props.onContactDelete(this.props.contact.Id);
    },
    handleShowModal(){
        this.setState({view: {showModal: true}})
    },
    render: function() {
        return(<tr>
                   <td>{this.props.contact.Id}</td>
                   <td>{this.props.contact.FirstName}</td>
                   <td>{this.props.contact.LastName}</td>
                   <td>{this.props.contact.Email}</td>
                   <td>{this.props.contact.MobilePhone}</td>
                   <td>{this.props.contact.HomePhone}</td>
                   <td>{this.props.contact.WorkPhone}</td>
                   <td><a className="btn btn-info btn-sm" 
                          onClick={this.handleContactEdit}>Edit</a>
                   </td>
                   <td><a className="btn btn-danger btn-sm" id={this.props.contact.id} 
                            onClick={this.handleDelete}>Delete</a>
                   </td>

               </tr>);
    }

});

module.exports = Contact;

