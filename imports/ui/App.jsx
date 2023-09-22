import React, {Fragment} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';
import { AuthPage } from './AuthPage';
import { ChatPage } from './ChatPage';

export const App = () => {
    const user = useTracker(() => Meteor.user());
    return (
        <div className="main">
            {user ?
                <ChatPage/>
                :
                <AuthPage/>
            }
        </div>
    );
};
