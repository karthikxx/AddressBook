var React = require('react');
var ReactDOM = require('react-dom');


var ContactBox = React.createClass({

    getInitialState: function () {
        return { data: [] };
    },

    loadContactsFromServer: function () {
        $.ajax({
            url: 'http://localhost:5000/api/contacts',
            dataType: 'json',
            type: 'GET',
            cache: false,
            success: function (data) {
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function () {
        this.loadContactsFromServer();
    },

    render: function () {
        return (
            <div className="container body-content">
                <div className="row" style={{"margin-top" : "30px"}}>
                    <ContactForm onContactSubmit={this.handleContactSubmit}></ContactForm>
                    <ContactList data={this.state.data} OnContactDelete={this.handleDelete}></ContactList>
                </div>
            </div>
        );
    },

    handleContactSubmit: function (contact) {

        var contact1 = {
            "FirstName": contact.firstname,
            "LastName": contact.lastname,
            "Email": contact.email
        };

        $.ajax({
            url: 'http://localhost:5000/api/contacts',
            dataType: 'json',
            type: 'POST',
            data: contact1,
            success: function (contact) {
                //this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    handleDelete: function (id) {
       
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
        var items = this.state.data.filter(function (contact) {
            return contact.Id != id;
        });

        this.setState({ data: items });
    },

});

var ContactForm = React.createClass({

    getInitialState: function () {
        return { firstname: '', lastname: '', email: '' };
    },

    handleFirstNameChange: function (e) {
        this.setState({ firstname: e.target.value });
    },

    handleLastNameChange: function (e) {
        this.setState({ lastname: e.target.value });
    },

    handleEmailChange: function (e) {
        this.setState({ email: e.target.value });
    },

    handleMobilePhChange: function (e) {
        this.setState({ mobilephone: e.target.value });
    },

    handleHomePhChange: function (e) {
        this.setState({ homephone: e.target.value });
    },

    handleWorkPhChange: function (e) {
        this.setState({ workphone: e.target.value });
    },

    handleSubmit: function (e) {
        e.preventDefault();
        var firstname = this.state.firstname.trim();
        var lastname = this.state.lastname.trim();
        var email = this.state.email.trim();
        if (!firstname || !lastname || !email) {
            return;
        }
        this.props.onContactSubmit({ firstname: firstname, lastname: lastname, email: email });
        this.setState({ firstname: '', lastname: '', email: '' });
    },

    render: function () {
        return (    <div className="col-md-3">
                        <h3>Add Contact</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input className="form-control" placeHolder="First Name" value={this.state.firstname} onChange={this.handleFirstNameChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Last Name</label>
                                <input className="form-control" placeHolder="Last Name" value={this.state.lastname} onChange={this.handleLastNameChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input className="form-control" placeHolder="Email Address" value={this.state.email} onChange={this.handleEmailChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Mobile Phone</label>
                                <input className="form-control" placeHolder="Mobile Phone" value={this.state.mobilephone} onChange={this.handleMobilePhChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Home Phone</label>
                                <input className="form-control" placeHolder="Home Phone" value={this.state.homephone} onChange={this.handleHomePhChange}></input>
                            </div>

                            <div className="form-group">
                                <label>Work Phone</label>
                                <input className="form-control" placeHolder="Work Phone" value={this.state.workphone} onChange={this.handleWorkPhChange}></input>
                            </div>

                            <button type="submit" className="btn btn-default">Submit</button>

                        </form>
        </div>
        );
    }
});

var ContactList = React.createClass({
    render: function () {

        var contactDelete = this.props.OnContactDelete;

        var contacts = [];
        this.props.data.forEach(function (contact) {
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

var Contact = React.createClass({
    handleDelete: function () {
        this.props.onContactDelete(this.props.contact.Id);
    },
    render:function() {
        return(<tr>
            <td>{this.props.contact.Id}</td>
            <td>{this.props.contact.FirstName}</td>
            <td>{this.props.contact.LastName}</td>
            <td>{this.props.contact.Email}</td>
            <td>{this.props.contact.MobilePhone}</td>
            <td>{this.props.contact.HomePhone}</td>
            <td>{this.props.contact.WorkPhone}</td>
            <td><a className="btn btn-info btn-sm">Edit</a></td>
            <td><a className="btn btn-danger btn-sm" id={this.props.contact.id} onClick={this.handleDelete}>Delete</a></td>
          </tr>);
    }
    
})


ReactDOM.render(<ContactBox></ContactBox>, document.getElementById('root'));
