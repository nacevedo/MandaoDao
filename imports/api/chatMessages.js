import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const ChatMessages = new Mongo.Collection("chatMessages");

if(Meteor.isServer) {
	Meteor.publish("chatMessages", () => {
		return ChatMessages.find({});
	});
}


Meteor.methods({

  'chatMessages.insert'(text, chatId, un) {
    check(text, String);
    
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    ChatMessages.insert({
      text:text, 
      chatId: chatId, 
      user : un

    });

  },
  'chatMessages.remove'(postId) {
    check(postId, String);
 
    ChatMessages.remove(postId);
  },
});

