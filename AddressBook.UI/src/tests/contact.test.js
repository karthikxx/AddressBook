import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Contact from '../components/contact';


describe('Contact Shallow rendering tests', () => {
  it('renders tr and td', () =>{
    let renderer = TestUtils.createRenderer();
    const contact = { Id: 1, firsname: "Waldo" };

    renderer.render(<Contact key={1} contact={contact}/>);
    let output = renderer.getRenderOutput();
    expect(output.type).toBe('tr');

  });
});
