import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import "./style.css";

import { Posts } from "../api/posts";
import AccountsUIWrapper from './AccountsUIWrapper.js';

import {Route, NavLink, HashRouter} from "react-router-dom";
import Home from "./Home";
import Stuff from "./Stuff";


export class App extends Component {
  constructor(props) {
    super(props);

    this.state={
      city: "City"
    };
  }


  onChangeCity(newCity){
    
    this.setState({
      city: newCity
    });
  }

  render() {
    return (
      <HashRouter>
      <div className="App">
        <ul className="header">
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/city">{this.state.city}</NavLink></li>
            <li id="sign-in-place"><AccountsUIWrapper /></li>
        </ul>

        <h1><span className="fa">&#xf25b;</span>&nbsp; Questions & Answers</h1>
        <hr/>

        <div className="content">
            <Route exact path="/" render={()=> <Home updateCity={this.onChangeCity.bind(this)} />} />
            <Route path="/city/" render={()=> <Stuff city={this.state.city} />} />
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









