import { Mongo } from "meteor/mongo";
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'


export const Posts = new Mongo.Collection("posts");

if(Meteor.isServer) {
  Meteor.publish("posts", () => {
    return Posts.find({});
  });

  const loginRule = {
  userId(userId) {
    const user = Meteor.users.findOne(userId);
    return user && user.type !== 'admin';
  },

  type: 'method',
  name: 'posts.vote'
};


DDPRateLimiter.addRule(loginRule, 5, 5000);

}

Meteor.methods({

  'posts.insert'(city, text, title) {
    check(text, String);
 
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Posts.insert({
      city: city, 
      who: Meteor.user(), 
      text,
      title:title, 
      voteCount:0,
      votes:{
        "👍":0
      }
    });
  },
  'posts.remove'(postId) {
    check(postId, String);
 
    Posts.remove(postId);
  },
  'posts.vote'(postId, emoji) {


    let postObj = Posts.findOne(postId);

    console.log("llega hasta aca" + postObj); 

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

  },
});


