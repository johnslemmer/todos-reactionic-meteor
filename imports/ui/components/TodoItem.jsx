import React from 'react';
import _ from 'lodash';
import { setCheckedStatus, updateText, remove } from '../../api/todos/methods.js';
import { IonItemCheckBox } from 'reactionic';

export default class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.throttledUpdate = _.throttle(value => {
      if (value) {
        updateText.call({
          todoId: this.props.todo._id,
          newText: value,
        }, this.context.popupError);
      }
    }, 300);

    this.setTodoCheckStatus = this.setTodoCheckStatus.bind(this);
    this.updateTodo = this.updateTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
  }

  onFocus() {
    this.props.onEditingChange(this.props.todo._id, true);
  }

  onBlur() {
    this.props.onEditingChange(this.props.todo._id, false);
  }

  setTodoCheckStatus(checked) {
    setCheckedStatus.call({
      todoId: this.props.todo._id,
      newCheckedStatus: checked,
    });
  }

  updateTodo(event) {
    this.throttledUpdate(event.target.value);
  }

  deleteTodo() {
    remove.call({ todoId: this.props.todo._id }, this.context.popupError);
  }

  render() {
    const { todo } = this.props;

    return (
      <IonItemCheckBox
        checked={todo.checked}
        handleChange={this.setTodoCheckStatus}
        label={todo.text}
      />
    );
  }
}

TodoItem.propTypes = {
  todo: React.PropTypes.object,
  onEditingChange: React.PropTypes.func,
};

TodoItem.contextTypes = {
  popupError: React.PropTypes.func,
};
