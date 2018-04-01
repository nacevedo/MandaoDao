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
import ChatPage from "./ChatPage";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      city: "City",
      postName: "",
      postID: ""
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
  render() {
    return (
      <HashRouter>
      <div className="App">
        <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/city">{this.state.city}</NavLink></li>
            <li><NavLink to="/post">{this.state.postID}</NavLink></li>
            <li><NavLink to="/chat">el chat va acá</NavLink></li>
            <li id="sign-in-place"><AccountsUIWrapper /></li>
        </ul>

        <h1><span className="fa">&#xf1d8;</span>&nbsp; Mandao Dao</h1>
        <hr/>

        <div className="content">
            <Route exact path="/" render={()=> <Home updateCity={this.onChangeCity.bind(this)} />} />
            <Route path="/city/" render={()=> <Stuff city={this.state.city} 
                                                     updatePostID={this.onChangePostID.bind(this)} 
                                                     updatePostName={this.onChangePost.bind(this)} />} />
            <Route path="/post/" render={()=> <PostAlone postID={this.state.postID} />} />
            <Route path="/chat/" render={()=> <ChatPage />} />
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









