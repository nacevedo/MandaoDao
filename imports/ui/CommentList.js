import React, { Component } from "react";
import PropTypes from "prop-types";

import Comment from "./Comment";

export default class CommentList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderPosts() {
    return this.props.comments.map((p,i) =>
      <Comment
        onVote={this.props.onVote}
        key={i}
        comment={p}>
      </Comment>
    );
  }
  render() {
    return (
      <div className="CommentList">
        <h2>Comments: </h2>
        {this.renderPosts()}
      </div>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};
