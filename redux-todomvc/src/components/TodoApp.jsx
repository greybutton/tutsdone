import React from 'react';
import {connect} from 'react-redux';
import TodoHeader from './TodoHeader'
import TodoList from './TodoList'
import TodoTools from './TodoTools'
import Footer from './TodoFooter'
import * as actionCreators from '../actions';

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
        <TodoList {...this.props} />
        <TodoTools
          changeFilter={this.props.changeFilter}
          filter={this.props.filter}
          nbActiveItems={this.getNbActiveItems()}
        />
      </section>
      <Footer />
    </div>
  }
};

function mapStateToProps(state) {
  return {
    todos: state.get('todos'),
    filter: state.get('filter')
  };
}

export const TodoAppContainer = connect(mapStateToProps, actionCreators)(TodoApp);
