import React, { Component } from "react";
import PropTypes from "prop-types";

import Post from "./Post";

export default class PostList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderPosts() {
    return this.props.posts.map((p,i) =>
      <div className="col-sm-4" key = {i}>
       <div className="box3">
          <Post
              
              onVote={this.props.onVote}
              post={p}
              updatePostID={this.props.updatePostID.bind(this)}
              updatePostName={this.props.updatePostName.bind(this)}
               >
          </Post>
      </div>
      </div>
    );
  }
  render() {
    return (
      <div className="PostList">
        
        {this.renderPosts()}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
  onVote: PropTypes.func.isRequired
};
