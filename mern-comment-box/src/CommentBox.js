import React, { Component } from 'react';
import axios from 'axios';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import style from './style';

class CommentBox extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }
  componentDidMount() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  }
  loadCommentsFromServer = () => {
    axios
      .get(this.props.url)
      .then(res => {
        this.setState({ data: res.data });
      });
  }
  handleCommentSubmit = (comment) => {
    axios
      .post(this.props.url, comment)
      .then(res => {
        this.loadCommentsFromServer();
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleCommentDelete = (id) => {
    axios
      .delete(`${this.props.url}/${id}`)
      .then(res => {
        console.log('Comment deleted');
      })
      .catch(err => {
        console.error(err);
      });
  }
  handleCommentUpdate = (id, comment) => {
    axios
      .put(`${this.props.url}/${id}`, comment)
      .catch(err => {
        console.error(err);
      });
  }
  render() {
    return (
      <div style={ style.commentBox }>
        <h2>Comments:</h2>
      <CommentList
        data={ this.state.data }
        onCommentDelete={ this.handleCommentDelete }
        onCommentUpdate={ this.handleCommentUpdate }
      />
      <CommentForm 
        onCommentSubmit={ this.handleCommentSubmit }
      />
      </div>
    )
  }
}

export default CommentBox;