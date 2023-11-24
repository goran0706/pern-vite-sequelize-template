import React from 'react';
import ButtonUsage from './Button';

describe('<ButtonUsage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<ButtonUsage />);
    cy.contains('Hello World');
  });
});
