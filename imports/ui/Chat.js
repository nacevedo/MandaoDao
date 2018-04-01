import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from './Modal';
import CommentList from './CommentList'; 
import CommentAdd from './CommentAdd'; 
import { Comments } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";
import {Route, NavLink, HashRouter} from "react-router-dom";

import { ChatMessages } from "../api/posts";
import { Chats } from "../api/posts";
import ChatMessageAdd from './ChatMessageAdd'; 


class Chat extends Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };

  }

  

  toggleModal() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  onAdd(text){
     if (Meteor.userId() === null) 
    {
      window.alert ("You are not registered! Please sign in."); 
      return; 
    }

    ChatMessages.insert({
      text:text, 
      chatId: this.props.chat._id
    });
  }

  renderPosts() {
    return this.props.chatMessages.map((p,i) =>
      <div className="col-sm-4">
      <div className="box3">
      <Chat chatMessage = {p} key = {i} > </Chat>
      </div>
      </div>
    );
  }

  change()
  {
    if (this.props.chat === undefined)
         {
            this.props.chat = {}; 
         }
  }

  

  render() {
    var u1 = this.props.chat.user1;
    console.log(u1);
    console.log(this.props.chat);
    return (
      <div id="Chat">
      { this.change()}

      {console.log(this.props.chat.user1)}
     <p> Chat members: {u1} & {this.props.chat.user2} </p>
     {this.renderPosts()}
      <ChatMessageAdd onAdd = {this.onAdd.bind(this)}> </ChatMessageAdd> 

      </div>
      );
  }
}

Chat.propTypes = {
  chat: PropTypes.object.isRequired
};

export default withTracker(
  (props) => {
  
    return {
      chatMessages: ChatMessages.find({chatId : props.chat._id}).fetch(), 
      chat: props.chat
    };
  }
)(Chat);
