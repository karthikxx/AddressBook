import React, {PropTypes} from 'react';
import TextBox from './controls/textBox';

const ContactForm = ({contact, onSave, onChange, errors}) => {
  return (
    <form>
      <h3>Add / Update Contact</h3>
      <TextBox
        name="FirstName"
        label="First Name"
        value={contact.FirstName}
        onChange={onChange}
        error={errors.FirstName}/>

      <TextBox
        name="LastName"
        label="Last Name"
        value={contact.LastName}
        onChange={onChange}
        error={errors.LastName}/>

      <TextBox
        name="Email"
        label="Email"
        value={contact.Email}
        onChange={onChange}
        error={errors.Email}/>

      <TextBox
        name="MobilePhone"
        label="Mobile Phone"
        value={contact.MobilePhone}
        onChange={onChange}
        error={errors.MobilePhone}/>

      <TextBox
        name="WorkPhone"
        label="Work Phone"
        value={contact.WorkPhone}
        onChange={onChange}
        error={errors.WorkPhone}/>

      <TextBox
        name="HomePhone"
        label="Home Phone"
        value={contact.HomePhone}
        onChange={onChange}
        error={errors.HomePhone}/>

      <input
        type="submit"
        value={'Save'}
        className="btn btn-primary"
        onClick={onSave}/>
    </form>
  );
};

ContactForm.propTypes = {
  contact: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  errors: React.PropTypes.object
};

export default ContactForm;
