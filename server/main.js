import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import '/imports/api/accountMethods';
import '/imports/api/activeUserPublications';
import '/imports/api/activeChatPublications';
import '/imports/api/activeChatMethods';
import { ActiveChat } from "../imports/db/ActiveChat";

Meteor.startup(async () => {
    const SEED_USERNAME = 'meteorite';
    const SEED_PASSWORD = 'password';

    if (!Accounts.findUserByUsername(SEED_USERNAME)) {
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }
});
