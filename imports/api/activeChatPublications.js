import { Meteor } from 'meteor/meteor';
import {ActiveChat} from "../db/ActiveChat";

Meteor.publish('findChat', function findChat(_id) {
    return ActiveChat.findOne({..._id});
});

Meteor.publish('findAllChat', function findAllChat() {
    return ActiveChat.find({});
});