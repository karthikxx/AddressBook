
var React = require('react');

var ContactForm = React.createClass({
    getInitialState: function() {
        return { firstname: '', lastname: '', email: '' };
    },

    handleFirstNameChange: function(e) {
        this.setState({ firstname: e.target.value });
    },

    handleLastNameChange: function(e) {
        this.setState({ lastname: e.target.value });
    },

    handleEmailChange: function(e) {
        this.setState({ email: e.target.value });
    },

    handleMobilePhChange: function(e) {
        this.setState({ mobilephone: e.target.value });
    },

    handleHomePhChange: function(e) {
        this.setState({ homephone: e.target.value });
    },

    handleWorkPhChange: function(e) {
        this.setState({ workphone: e.target.value });
    },

    handleSubmit: function(e) {
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

    render: function() {
        return (<div className="col-md-3">
                    <h3>Add Contact</h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input className="form-control" placeHolder="First Name" value={this.state.firstname}
                                   onChange={this.handleFirstNameChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input className="form-control" placeHolder="Last Name" value={this.state.lastname}
                                   onChange={this.handleLastNameChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input className="form-control" placeHolder="Email Address" value={this.state.email}
                                   onChange={this.handleEmailChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Mobile Phone</label>
                            <input className="form-control" placeHolder="Mobile Phone" value={this.state.mobilephone} 
                                   onChange={this.handleMobilePhChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Home Phone</label>
                            <input className="form-control" placeHolder="Home Phone" value={this.state.homephone}
                                   onChange={this.handleHomePhChange}></input>
                        </div>

                        <div className="form-group">
                            <label>Work Phone</label>
                            <input className="form-control" placeHolder="Work Phone" value={this.state.workphone}
                                   onChange={this.handleWorkPhChange}></input>
                        </div>

                        <button type="submit" className="btn btn-default">Submit</button>

                    </form>
                </div>
        );
    }
});

module.exports = ContactForm;