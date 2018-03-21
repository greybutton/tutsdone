import React from 'react';

export default class TextInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {value: props.text};
  }
  cancelEditing = () => {
    this.setState({'value': this.props.text});
    return this.props.cancelEditing(this.props.itemId);
  }
  _handleKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
        return this.props.doneEditing(this.props.itemId, this.state.value);
      case 'Escape':
        return this.cancelEditing();
      default:
        break;
    }
  }
  _handleOnBlur = () => {
    return this.cancelEditing();
  }
  _handleOnChange = (e) => {
    this.setState({value: e.target.value});
  }
  render() {
    return <input 
      className="edit"
      autoFocus={true}
      value={this.state.value}
      onChange={this._handleOnChange}
      type="text"
      ref="itemInput"
      onKeyDown={this._handleKeyDown}
      onBlur={this._handleOnBlur}
    />
  }
};
