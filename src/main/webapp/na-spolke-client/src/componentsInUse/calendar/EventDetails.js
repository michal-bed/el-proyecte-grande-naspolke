import * as React from 'react';
import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
}));

function EventDetails({ savedEvents }) {

    const axiosPrivate = useAxiosPrivate();
    let {companyId} = useParams();
    const[loadEvents, setLoadEvents] = useState([]);

    const loadSavedEvents = () => {
        setLoadEvents(savedEvents);
    }

    useEffect(() =>{
        loadSavedEvents();
    }, [])

    const deleteCurrentEvent = (eventId) => {
        console.log(eventId);
        axiosPrivate.delete(`/delete-event/${companyId}/${eventId}`)
            .then((response) => {
                if (response.status === 200) {
                    let listElement = document.getElementById(`eventId${eventId}`)
                    listElement.remove();
                    console.log(loadEvents);
                }
            }).catch((error) => {
                console.log(error);
        })
    }

    return (
        <Box sx={{ flexGrow: 1, maxWidth: 752 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                        Zaplanowane wydarzenia
                    </Typography><br/>
                    <Demo>
                        <List>
                            {loadEvents.map((loadEvent) =>
                                (<ListItem
                                    id={'eventId' + loadEvent.eventId}
                                    key={loadEvent.eventId}
                                    secondaryAction={
                                        <IconButton edge="end" aria-label="delete">
                                            <DeleteIcon onClick={() => {deleteCurrentEvent(loadEvent.eventId)}}/>
                                        </IconButton>}>
                                    <ListItemAvatar>
                                        <Avatar>
                                            <EventAvailableIcon />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={loadEvent.eventType}
                                    />
                                </ListItem>)
                            )}
                        </List>
                    </Demo>
                </Grid>
            </Grid>
        </Box>
    );
}

export default EventDetails
