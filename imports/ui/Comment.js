import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import {Route, NavLink, HashRouter} from "react-router-dom";

import { Chats } from "../api/posts";


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

  addChat ()
  {
        if (Meteor.userId() === null) 
    {
      window.alert ("You are not registered! Please sign in."); 
      return; 
    }
    console.log(Meteor.user); 

    Chats.insert({
      user1: Meteor.user().username,  
      user2: this.props.comment.who.username
    });
  }


  render() {
    return (
      <div id="Comment">
      <div className="box3">
        <div className="row">
        <div className="col-sm-4"><span className="fa">&#xf007;</span>&nbsp;{this.props.comment.who.username}</div>
        <div className="col-sm-8">
        <NavLink exact to="/chat"> <button className="my-btn-5" onClick = {this.addChat.bind(this)}> New chat with {this.props.comment.who.username}</button> </NavLink>
        </div>
        </div>
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
