import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import CommentList from './CommentList'; 
import CommentAdd from './CommentAdd'; 
import { Comments } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";


class Post extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

  }

  //This are the functions for comments 
  onVote(comment, emoji) {
    let postObj = Comments.findOne(comment._id);

    if (!postObj) {
      console.err("Post not found!");
      return;
    }

    postObj.voteCount+=1;
    if (postObj.votes[emoji]===undefined) {
      postObj.votes[emoji]=0;
    }
    postObj.votes[emoji]+=1;

    Comments.update(postObj._id,
      postObj);
  }

  onAdd(text) {

    // User exists ?? 

    if (Meteor.userId() === null) 
    {
      window.alert("You are not registered ! Please sign in."); 
      return; 
    }


    if (!text) return;
    Comments.insert({
      city: this.props.city, 
      post: this.props.post._id,
      who: Meteor.user(), 
      text,
      voteCount:0,
      votes:{
        "👍":0
      }
    });

  }

    toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  renderVotes() {
    let res=[];
    for (let emoji in this.props.post.votes) {
      res.push(
        <button
          onClick={() =>
            this.props.onVote(
              this.props.post,
              emoji
            )}
          key={emoji}>{emoji} {this.props.post.votes[emoji]}</button>
      );
    }
    return res;
  }


  render() {
    return (
      <div className="Post">
        <div>{this.props.post.who.username}</div>
        <div>{this.props.post.title}</div>
        <div>{this.props.post.text}</div>
        {this.renderVotes()}

        <button onClick={this.toggleModal.bind(this)}> Open the comments </button>
        <CommentList comments={this.props.comments} onVote={this.onVote.bind(this)}> </CommentList>
        <CommentAdd onAdd={this.onAdd.bind(this)} > </CommentAdd> 


      </div>
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  onVote: PropTypes.func.isRequired
};


export default withTracker(
  (x) => {
    console.log(x); 
    return {
      comments: Comments.find({post : x.post._id}, {sort: {voteCount:-1}}).fetch()
    };
  }
)(Post);
