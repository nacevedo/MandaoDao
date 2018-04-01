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
        <button className="my-btn-4"
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
      <div id="Comment">
      <div className="box3">
        <div><span className="fa">&#xf007;</span>&nbsp;{this.props.comment.who.username}</div>
        <hr/>
        <div>{this.props.comment.text}</div>
        {this.renderVotes()}
        </div>
      </div>
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};
