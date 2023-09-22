import React, {Fragment, useState} from "react";
import {Typography} from "@mui/material";
import Grid from '@mui/material/Grid';
import {useTracker} from 'meteor/react-meteor-data';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {ActiveUser} from "../db/ActiveUser";
import {ActiveChat} from "../db/ActiveChat";
import {ChatBubble} from "./ChatBubble";
import Button from '@mui/material/Button';
import moment from "moment";

export const ChatPage = () => {
    const [targetUsername, setTargetUsername] = React.useState('');
    const [message, setMessage] = useState('');
    const user = useTracker(() => Meteor.user());
    const logout = () => Meteor.logout();

    const { activeUsers } = useTracker(() => {
        const handler = Meteor.subscribe('findAllUser');

        if (!handler.ready()) {
            return {activeUsers: []}
        }

        const activeUsers = ActiveUser.find({}).fetch();

        return {activeUsers: activeUsers.map(val => val.username)}
    })

    const onUserSelected = (e, newValue) => {
        setTargetUsername(newValue);
    }

    const { chatDetail } = useTracker (() => {
        if (targetUsername) {
            const handler = Meteor.subscribe('findAllChat');

            if (!handler.ready()) {
                return {}
            }
        }

        const chatDetail = ActiveChat.find({
            $or: [
                { $and: [{ sender: user.username }, { recipient: targetUsername }] },
                { $and: [{ sender: targetUsername }, { recipient: user.username }] }
            ]
        }).fetch()
        console.log(chatDetail)
        return {chatDetail}
    });

    const onSendChat = () => {
        Meteor.call(
            'insert-chat',
            {
                sender: user.username,
                recipient: targetUsername,
                message: message
            }
        )
        setMessage('')
    }

    const onEnterPressed = (event) => {
        if (event.keyCode === 13) {
            onSendChat();
        }
    }

    return (
        <Fragment>
            <Grid container spacing={3}>
                <Grid item container xs={10}>
                    <Typography component="h1" variant="h5">
                        Welcome Back {user.username}!
                    </Typography>
                </Grid>
                <Grid item container xs={2}>
                    <Typography component="h1" variant="h5" onClick={logout}>
                        Logout
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {
                        chatDetail?.map(val => (
                            <ChatBubble
                                sender={val.sender}
                                timestamp={moment(val.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                                message={val.message}
                            />))
                    }
                </Grid>
                <Grid item xs={4}>
                    <Autocomplete
                        disablePortal
                        options={activeUsers}
                        onChange={(event, value) => onUserSelected(event, value)}
                        id="combo-box-demo"
                        renderInput={(params) => <TextField {...params} label="List of Users" />}
                    />
                </Grid>
                <Grid item xs={8}>
                    <TextField
                        id="outlined-multiline-flexible"
                        label="Message"
                        fullWidth
                        value={message}
                        onChange={event => setMessage(event.target.value)}
                        onKeyUp={event => onEnterPressed(event)}
                    />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        fullWidth
                        onClick={onSendChat}
                        variant="contained"
                        disabled={!message || !targetUsername}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Fragment>
    );
};
