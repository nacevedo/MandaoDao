import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Chats = new Mongo.Collection("chats");

if(Meteor.isServer) {
	Meteor.publish("chats", () => {
		return Chats.find({});
	});
}

Meteor.methods({

  'chats.insert'(username) {
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
 
    Chats.insert({
      user1: Meteor.user().username,  
      user2: username
    });
  },
  'chats.remove'(postId) {
    check(postId, String);
 
    Chats.remove(postId);
  },
});

