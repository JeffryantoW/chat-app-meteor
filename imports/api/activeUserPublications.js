import { Meteor } from 'meteor/meteor';
import {ActiveUser} from "../db/ActiveUser";

Meteor.publish('findAllUser', function findAll() {
    return ActiveUser.find({});
});

Meteor.publish('findAllUserBySenderAndRecipient', function findAllBySender(sender, recipient) {
    console.log(sender, recipient)
    return ActiveUser.findOne({
        $or: [
            { $and: [{ sender: sender }, { recipient: recipient }] },
            { $and: [{ sender: recipient }, { recipient: sender }] }
        ]
    });
})