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
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    console.log(city); 
 
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
  }

});