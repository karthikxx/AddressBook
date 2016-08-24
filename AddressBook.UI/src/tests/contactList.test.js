
import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContactList from '../components/contactList';


describe('Contact List Shallow rendering tests', () => {
  it('renders tbody and child contacts', () =>{
    let renderer = TestUtils.createRenderer();
    const contactList = [
      { Id: 1, firsname: "Waldo" },
      { Id: 2, firstname: "Hercules" }
    ];

    renderer.render(<ContactList data={contactList}/>);
    let output = renderer.getRenderOutput();

    expect(output.type).toBe('tbody');

    expect(output.props.children[0].key).toBe('1');
    expect(output.props.children[1].key).toBe('2');

    expect(output.props.children[0].props.contact).toBe(contactList[0]);

    expect(output.props.children[1].props.contact).toBe(contactList[1]);

  });
});
