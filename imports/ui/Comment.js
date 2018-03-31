import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';


export default class Comment extends Component {
  constructor(props) {
    super(props);

    

  }



  renderVotes() {
    let res=[];
    for (let emoji in this.props.comment.votes) {
      res.push(
        <button
          onClick={() =>
            this.props.onVote(
              this.props.comment,
              emoji
            )}
          key={emoji}>{emoji} {this.props.comment.votes[emoji]}</button>
      );
    }
    return res;
  }


  render() {
    return (
      <div className="Comment">
        <div>{this.props.comment.who.username}</div>
        <div>{this.props.comment.text}</div>
        {this.renderVotes()}

      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};
