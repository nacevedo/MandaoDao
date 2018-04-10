import React, { Component } from "react";
import PropTypes from "prop-types";
import { withTracker } from "meteor/react-meteor-data";
import { Posts } from "../api/posts";

import PostList from "./PostList";
import PostAdd from "./PostAdd";

import { Meteor } from 'meteor/meteor'

class Stuff extends Component {


	constructor(props) {
		super(props);
	}

	onVote(post, emoji) {
		let postObj = Posts.findOne(post._id);

		if (!postObj) {
			console.err("Post not found!");
			return;
		}

		postObj.voteCount+=1;
		if (postObj.votes[emoji]===undefined) {
			postObj.votes[emoji]=0;
		}
		postObj.votes[emoji]+=1;

		Posts.update(postObj._id,
			postObj);
	}

	onAdd(title, text) {

		// User exists ?? 

		if (Meteor.userId() === null) 
		{
			window.alert ("You are not registered! Please sign in."); 
			return; 
		}


		if (!text) return;
		Posts.insert({
			city: this.props.city, 
			who: Meteor.user(), 
			text,
			title:title, 
			voteCount:0,
			votes:{
				"👍":0
			}
		});

	}



	render() {
		return (
			<div id="stuff" className="row">
				<h2 id="city-name">{this.props.city}</h2>
				<hr/>
				<div className="col-sm-3">
				<div className="box2">
			        <PostAdd key = {12}
			          onAdd={this.onAdd.bind(this)}
			          >
			        </PostAdd>
			    </div>
			    </div>
				<div className="col-sm-9">
				<h2 id="cf">Community&#39;s Favors</h2>
				<hr/>
				<div className="row">
				<PostList
					key = {45}
		          posts={this.props.posts}
		          onVote={this.onVote.bind(this)}
		          updatePostID={this.props.updatePostID.bind(this)} 
		          updatePostName={this.props.updatePostName.bind(this)}
		          >
        		</PostList>
        		
        		</div>
        		</div>
        		
			</div>
			);
	}
}

Stuff.propTypes = {
  posts: PropTypes.array.isRequired
};


export default withTracker(
  (x) => {
    return {
      posts: Posts.find({city : x.city}, {sort: {voteCount:-1}}).fetch()
    };
  }
)(Stuff);
