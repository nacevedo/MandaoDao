import { Mongo } from "meteor/mongo";


export const Posts = new Mongo.Collection("posts");
export const Comments = new Mongo.Collection("comments");
export const Chats = new Mongo.Collection("chats");
export const ChatMessages = new Mongo.Collection("chatMessages");

//F. Andres Vera: Les recomiendo usar meteor methods.
