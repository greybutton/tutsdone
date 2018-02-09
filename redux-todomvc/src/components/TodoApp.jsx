import React from 'react';
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoTools from './TodoTools'
import Footer from './TodoFooter'

export default class TodoApp extends React.Component {
  getNbActiveItems() {
    if (this.props.todos) {
      const activeItems = this.props.todos.filter(
        (item) => item.get('status') === 'active'
      );
      return activeItems.size;
    }
    return 0;
  }
  render() {
    return <div>
      <section className="todoapp">
        <TodoHeader />
        <TodoList todos={this.props.todos} filter={this.props.filter} />
        <TodoTools
          filter={this.props.filter}
          nbActiveItems={this.getNbActiveItems()}
        />
      </section>
      <Footer />
    </div>
  }
};