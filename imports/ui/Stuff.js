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

	onAdd(text) {
		if (!text) return;
		Posts.insert({
			who: Meteor.user(), 
			text,
			voteCount:0,
			votes:{
				"👍":0,
			}
		});

	}



	render() {
		return (
			<div>
				<h2>{this.props.city}</h2>
				<p>Mauris sem velit, vehicula eget sodales vitae,
				rhoncus eget sapien:</p>
				<ol>
					<li>Nulla pulvinar diam</li>
					<li>Facilisis bibendum</li>
					<li>Vestibulum vulputate</li>
					<li>Eget erat</li>
					<li>Id porttitor</li>
				</ol>
				<PostList
		          posts={this.props.posts}
		          onVote={this.onVote.bind(this)}
		          >
        		</PostList>
		        <PostAdd
		          onAdd={this.onAdd.bind(this)}
		          >
		        </PostAdd>
			</div>
			);
	}
}

Stuff.propTypes = {
  posts: PropTypes.array.isRequired
};


export default withTracker(
  () => {
    return {
      posts: Posts.find({}, {sort: {voteCount:-1}}).fetch()
    };
  }
)(Stuff);
