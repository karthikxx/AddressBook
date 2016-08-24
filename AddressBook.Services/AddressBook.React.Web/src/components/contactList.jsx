var React = require('react');


var Contact = require('./contact');

var ContactList = React.createClass({
    render: function() {

        var contactDelete = this.props.OnContactDelete;

        var contacts = [];
        this.props.data.forEach(function(contact) {
            contacts.push(<Contact key={contact.id} contact={contact } onContactDelete={contactDelete}>
                          </Contact>);
        });
        return (<div className="col-md-9">
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
                        <tbody>
                        {contacts}
                        </tbody>
                    </table>

                </div>
        );
    }
});

module.exports = ContactList;