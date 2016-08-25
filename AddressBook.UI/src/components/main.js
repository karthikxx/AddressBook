import React, {PropTypes} from 'react';

import {render} from 'react-dom';

import ManageContacts from './manageContacts';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/jquery/dist/jquery.min';
import '../assets/css/site.css';


render(
    <ManageContacts url="http://localhost:5000/api/contacts/"/>,
    document.getElementById('root')
);
