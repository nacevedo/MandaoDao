import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import "./style.css";

import { Posts } from "../api/posts";
import AccountsUIWrapper from './AccountsUIWrapper.js';

import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";
import Post from "./Post";
import PostAlone from "./PostAlone";
import ChatList from "./ChatList";
import ChatAlone from "./ChatAlone";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      city: "City",
      postName: "",
      postID: "",
      chatID:"",
      user1:"",
      user2:""
    };
  }


  onChangeCity(newCity){
    
    this.setState({
      city: newCity
    });
  }

  onChangePost(newName){
    
    this.setState({
      postName: newName
    });
  }

  onChangePostID(id){
    
    this.setState({
      postID: id
    });

  }

  onChangeChatID(id){
    
    this.setState({
      chatID: id
    });

  }

  onChangeUser1(id){
    
    this.setState({
      user1: id
    });

  }

  onChangeUser2(id){
    this.setState({
      user2: id
    });

  }

  render() {
    return (
      <HashRouter>
        <div className="App">
          <div className="navbar-header">
            <div className="row">
            
                <button type="button" 
                        className="navbar-toggle collapsed"
                        data-toggle="collapse" 
                        data-target="#collapsable-nav" 
                        aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="fa">&#xf0c9;</span>
                </button>
              
            </div>
          </div>
          <div id="collapsable-nav" className="collapse navbar-collapse">
            <ul id="nav-list" className="header ">
              <li>
                <NavLink exact to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/city">{this.state.city}</NavLink>
              </li>
              <li>
                <NavLink to="/post">{this.state.postName}</NavLink>
              </li>
              <li>
                <NavLink to="/chat">Current Chats</NavLink>
              </li>
              <li>
                <NavLink to="/chatchat">{this.state.user1} &nbsp; {this.state.user2}</NavLink>
              </li>
              <li id="sign-in-place" >
                <AccountsUIWrapper />
              </li>
            </ul>
          </div>
          <h1><span className="fa">&#xf1d8;</span>&nbsp; Mandao Dao</h1>
          <hr/>
          <div className="content">
            <Route exact path="/" render={()=>
            <Home updateCity={this.onChangeCity.bind(this)} />
            } />
            <Route path="/city/" render={()=>
            <Stuff city={this.state.city} 
              updatePostID={this.onChangePostID.bind(this)} 
              updatePostName={this.onChangePost.bind(this)} />
            } />
            <Route path="/post/" render={()=>
            <PostAlone postID={this.state.postID} />
            } />
            <Route path="/chat/" render={()=>
            <ChatList updateChatID={this.onChangeChatID.bind(this)}
                      updateUser1={this.onChangeUser1.bind(this)}
                      updateUser2={this.onChangeUser2.bind(this)}/>
            } />
            <Route path="/chatchat/" render={()=>
            <ChatAlone chatID={this.state.chatID}
                        u1={this.state.user1}
                        u2={this.state.user2}/>
            } />
          </div>
        </div>
      </HashRouter>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired
};


export default withTracker(
  () => {
    return {
      posts: Posts.find({}, {sort: {voteCount:-1}}).fetch()
    };
  }
)(App);









