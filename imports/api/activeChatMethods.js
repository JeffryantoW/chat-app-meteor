import {Meteor} from 'meteor/meteor';
import {ActiveChat} from "../db/ActiveChat";

Meteor.methods({
    'insert-chat'({sender, recipient, message}) {
        ActiveChat.insert({
            sender: sender,
            recipient: recipient,
            createdAt: new Date(),
            message: message
        })
    }
})