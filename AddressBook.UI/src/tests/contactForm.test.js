import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContactForm from '../components/contactForm';


describe('Contact Form Shallow rendering tests', () => {
  it('renders form', () =>{
    let renderer = TestUtils.createRenderer();
    const contact = { Id: 1, FirstName: "Waldo" };
    const errors = {FirstName : 'First Name is required.'};

    renderer.render(<ContactForm contact={contact} errors={errors}/>);
    let output = renderer.getRenderOutput();
    expect(output.type).toBe('form');

  });
});
