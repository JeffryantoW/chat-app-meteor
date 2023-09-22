import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from "react";


export const ChatBubble = (props) => {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {props.sender} - {props.timestamp}
                </Typography>
                <Typography variant="body2">
                    {props.message}
                </Typography>
            </CardContent>
        </Card>
    );
}