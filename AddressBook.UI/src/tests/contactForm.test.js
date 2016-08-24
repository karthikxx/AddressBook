/*

import expect from 'expect';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import ContactForm from '../components/contactForm';

function setup(){
  let renderer = TestUtils.createRenderer();
  renderer.render(<ContactForm/>);
  let output = renderer.getRenderOutput();

  return{
    output,
    renderer
  };
}

describe('Contact Form Shallow rendering tests', () => {
  it('renders div and h3', () =>{
    const{output} = setup();
    expect(output.type).toBe('form');
    let div = output.props.children[0];
    expect(div.type).toBe('div');
  });
});
*/
