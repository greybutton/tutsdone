import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TodoTools from './TodoTools';
import {expect} from 'chai';

const {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate,
} = ReactTestUtils;

describe('TodoTools', () => {
  it('displays the number of items left', () => {
    const nbActiveItems = 3;
    const component = renderIntoDocument(
      <TodoTools nbActiveItems={nbActiveItems} />
    );
    const tools = scryRenderedDOMComponentsWithTag(component, 'footer');

    expect(tools[0].textContent).to.contain('3');
  });

  it('Highlights the active filter', () => {
    const filter = 'active';
    const component = renderIntoDocument(
      <TodoTools filter={filter} />
    );
    const filters = scryRenderedDOMComponentsWithTag(component, 'a');

    expect(filters[0].classList.contains('selected')).to.equal(false);
    expect(filters[1].classList.contains('selected')).to.equal(true);
    expect(filters[2].classList.contains('selected')).to.equal(false);
  });

  it('calls a callback when the user clicks on Clear Completed buttons', () => {
    let cleared = false
    const clearCompleted = () => cleared = true;
    const component = renderIntoDocument(
      <TodoTools clearCompleted={clearCompleted} />
    );
    const buttons = scryRenderedDOMComponentsWithTag(component, 'button');
    Simulate.click(buttons[0]);

    expect(cleared).to.equal(true);
  });
});