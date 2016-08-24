var React = require('react');

var ReactDOM = require('react-dom');

var ContactBox = require('./contactBox');

ReactDOM.render(<ContactBox url="http://localhost:5000/api/contacts"></ContactBox>, document.getElementById('root'));

