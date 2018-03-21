import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import TodoHeader from './TodoHeader';
import {expect} from 'chai';

const {
    renderIntoDocument,
    scryRenderedDOMComponentsWithTag,
    Simulate,
} = ReactTestUtils;

describe('TodoHeader', () => {
  it('calls a callback on submit', () => {
    let addedItem = ''
    const addItem = (item) => addedItem = item;
    const component = renderIntoDocument(
      <TodoHeader addItem={addItem} />
    );

    const input = component.refs.addTodoInput;
    input.value = 'This is a new item';
    Simulate.change(input);
    Simulate.keyPress(input, {key: "Enter", keyCode: 13, which: 13});

    expect(addedItem).to.equal('This is a new item');
    expect(input.value).to.equal('');
  });
});