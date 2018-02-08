import React from 'react';
import TodoItem from './TodoItem';

export default class TodoList extends React.PureComponent {
    getItems() {
        if (this.props.todos) {
            return this.props.todos.filter(
            (item) => this.props.filter === 'all' || item.get('status') === this.props.filter
            );
        }
        return [];
    }
  render() {
    return <section className="main">
      <ul className="todo-list">
        {this.getItems().map(item =>
          <TodoItem key={item.get('text')}
                    text={item.get('text')} />
        )}
      </ul>
    </section>
  }
};