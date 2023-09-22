import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {Accounts} from 'meteor/accounts-base';
import {ActiveUser} from "../db/ActiveUser";

Meteor.methods({
    'accounts.findByUsername'(username) {
        check(username, String);

        if (Accounts.findUserByUsername(username)) {
            throw new Meteor.Error('Username Exists')
        }
    },

    'accounts.createUser'(username, password) {
        check(username, String);
        check(password, String);

        Accounts.createUser({
            username: username,
            password: password,
        });

        ActiveUser.insert(
            {username: username}
        )
    }
});