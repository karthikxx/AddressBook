var React = require('react');

var ContactForm = require('./contactForm');
var ContactList = require('./contactList');

var ContactBox = React.createClass({

    getInitialState: function () {
        return { data: [] };
    },

    loadContactsFromServer: function () {
        $.ajax({
            url: this.props.url,
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

        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: contact,
            success: function (contact) {
                var items = this.state.data;
                items.push(contact);
                this.setState({ data: items });
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
    }

});

module.exports = ContactBox;