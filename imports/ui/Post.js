import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import CommentList from './CommentList'; 
import CommentAdd from './CommentAdd'; 
import { Comments } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";
import {Route, NavLink, HashRouter} from "react-router-dom";

//F. Andres Vera: No deberian hacer llamados que cambien la base de datos desde el lado del cliente, 
//para eso usen metheor.call a los methods.


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
        <button className="my-btn-4"
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

  onChangePost(){
    this.props.updatePostName(this.props.post.title);
  }

  onChangePostID(){
    console.log(this.props.post._id);
    this.props.updatePostID(this.props.post._id);
  }

  render() {
    return (
      <div id="Post">
      

        <div><span className="fa">&#xf007;</span>&nbsp;{this.props.post.who.username}</div>
        <hr/>
        <div id="pTitle"><span>{this.props.post.title}</span></div>
        <div >{this.props.post.text}</div>
        <div className="row">
       <div className="col-sm-6"> {this.renderVotes()} </div>
<div className="col-sm-6">

      <NavLink to="/post"><button className="my-btn-3" onClick={(event) => {this.props.updatePostID(this.props.post._id); this.props.updatePostName(this.props.post.title);} }
                                  >Comment</button></NavLink>
      </div>
</div>
     

      </div>
      );
  }
}




export default withTracker(
  (x) => {
    return {
      comments: Comments.find({post : x.post._id}, {sort: {voteCount:-1}}).fetch()
    };
  }
  )(Post);
