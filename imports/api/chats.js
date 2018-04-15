import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';


export const Chats = new Mongo.Collection("chats");

if(Meteor.isServer) {
	Meteor.publish("chats", () => {
		return Chats.find({});
	});


  const chatInsert = {
  userId(userId) {
    const user = Meteor.users.findOne(userId);
    return user;
  },

  type: 'method',
  name: 'chats.insert'
};


DDPRateLimiter.addRule(chatInsert, 5, 5000);

}

var userNames = () => {

  if(Meteor.user().profile == undefined)
    {
      return Meteor.user().username;
    }
    else
    {
      return Meteor.user().profile.name;
    }
}

Meteor.methods({

  'chats.insert'(username, un1) {
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    
 
    Chats.insert({
      user1: un1,  
      user2: username
    });
  },
  'chats.remove'(postId) {
    check(postId, String);
 
    Chats.remove(postId);
  },
});

