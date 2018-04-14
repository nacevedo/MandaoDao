import React, { Component } from "react";
import PropTypes from "prop-types";

import Chat from "./Chat";
import { Chats } from "../api/chats";
import { withTracker } from "meteor/react-meteor-data";

class ChatList extends Component {
  constructor(props) {
    super(props);

    this.state={

    };
  }

  renderMsg(){
    if (Meteor.userId() === null) {
      return(
        <p>Don&#39;t forget you have to be signed in in order to see your current chats</p>
        )
    }
  }

  renderPosts() {
    return this.props.chats.map((p,i) =>
      <div className="col-sm-3" key = {i} >
      <div className="box3">
      <Chat chat = {p} updateChatID={this.props.updateChatID.bind(this)} 
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

        {this.renderMsg()}
      </div>
    );
  }
}

ChatList.propTypes = {

};

export default withTracker(
  () => {
    Meteor.subscribe("chats");
    return {
      chats: Chats.find({$or: [ { "user1":  Meteor.user().username }, { "user2": Meteor.user().username } ]}).fetch()
    };
  }
)(ChatList);
