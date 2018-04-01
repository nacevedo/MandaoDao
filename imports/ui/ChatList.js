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
      <div className="col-sm-4">
      <div className="box3">
      <Chat chat = {p} key = {i} > </Chat>
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
