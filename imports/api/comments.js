import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection("comments");

if(Meteor.isServer) {
	Meteor.publish("comments", () => {
		return Comments.find({});
	});
}

Meteor.methods({

  'comments.insert'(city, postId, text) {
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.user()) {
      throw new Meteor.Error('not-authorized');
    }
  
 
    Comments.insert({
      city: city, 
      post: postId,
      who: Meteor.user(), 
      text,
      voteCount:0,
      votes:{
        "👍":0
      }


    });
  },
    'comments.vote'(postId, emoji) {


    let postObj = Comments.findOne(postId);
    console.log(postObj); 

    if (!postObj) {
      console.err("Post not found!");
      return;
    }

    postObj.voteCount+=1;
    if (postObj.votes[emoji]===undefined) {
      postObj.votes[emoji]=0;
    }
    postObj.votes[emoji]+=1;

    Comments.update(postObj._id,
      postObj);

  },

});