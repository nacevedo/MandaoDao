import React, { Component } from "react";
import PropTypes from "prop-types";

import Chat from "./Chat";
import { Chats } from "../api/posts";
import { withTracker } from "meteor/react-meteor-data";

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  
  renderPosts() {
    return this.props.chats.map((p,i) =>
      <div className="col-sm-3">
      <div className="box3">
      <Chat chat = {p} key = {i} updateChatID={this.props.updateChatID.bind(this)} 
                                 updateUser1={this.props.updateUser1.bind(this)}
                                 updateUser2={this.props.updateUser2.bind(this)} > </Chat>
      </div>
      </div>
    );
  }
  render() {
    return (
      <div className="ChatList">
        
        {this.renderPosts()}
      </div>
    );
  }
}

ChatList.propTypes = {

};

export default withTracker(
  () => {
    return {
      chats: Chats.find({$or: [ { "user1":  Meteor.user().username }, { "user2": Meteor.user().username } ]}).fetch()
    };
  }
)(ChatList);
