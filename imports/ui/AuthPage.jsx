import React, {Fragment, useState} from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SnackBar from '@mui/material/Snackbar';
import {Typography} from "@mui/material";
import MuiAlert from '@mui/material/Alert';

export const AuthPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userNotFound, setUserNotFound] = useState(false);
    const [snackBarMessage, setSnackBarMessage] = useState({});
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const doLogin = () => {
        Meteor.loginWithPassword(
            username,
            password,
            error => {
                setSnackBarMessage(
                    {
                        message: "Username / Password is wrong",
                        severity: "error"
                    }
                );
                setUserNotFound(true);
            });
    }

    const submitLogin = () => {
        doLogin();
    };

    const submitRegistration = () => {
        Meteor.call(
            'accounts.findByUsername',
            username,
            (err) => {
                if (err) {
                    setSnackBarMessage(
                        {
                        message: "Username already taken",
                        severity: "error"
                    });
                    setUserNotFound(true);
                } else {
                    Meteor.call(
                        'accounts.createUser',
                        username,
                        password)
                    setSnackBarMessage(
                        {
                            message: "Registration success, you can login now",
                            severity: "success"
                        }
                    );
                    doLogin();
                }

            })
    }
    const handleCloseSnackbar = () => {
        setUserNotFound(false);
    }

    return (
        <Fragment>
            <CssBaseline />
            <SnackBar
                open={userNotFound}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert severity={snackBarMessage.severity}>{snackBarMessage.message}</Alert>
            </SnackBar>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in / Register
                </Typography>

                <Box component="form" noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoFocus
                        onChange={e => setUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={e => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={submitLogin}
                    >
                        Sign In
                    </Button>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={submitRegistration}
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
        </Fragment>
    );
};