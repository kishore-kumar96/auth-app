import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useHistory } from 'react-router-dom';
import * as actions from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { Box, List, ListItem, ListItemText } from '@material-ui/core';
import { getLocalStorage, removeLocalStorage } from '../../utils';
import { localKeyName } from '../../constants';

import PersonIcon from '@material-ui/icons/Person';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    root: {
        minWidth: 500,
    },
}));


export default function User() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const [userDetails, setUserDetails] = useState({})
    const { user = {} } = getLocalStorage(localKeyName) || {}
    const { user: userData = {} } = useSelector(state => state.dashboard)
    const userInfo = userData?.user || {}
    useEffect(() => {
        user?.id && actions.userFetchRequested(dispatch, { id: user?.id })
    }, [])
    useEffect(() => {
        setUserDetails(userInfo || {})
    }, [userInfo])

    const handleLogout = () => {
        removeLocalStorage(localKeyName)
        history.push("/login")
    }
    const { name = '', email = '', phone = '' } = userDetails || {}
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PersonIcon />
                </Avatar>
                <Box>
                    <Button variant='contained' color="primary" onClick={handleLogout}>Logout</Button>
                </Box>
                <Card className={classes.root}>
                    <CardContent>
                        <List>
                            <ListItem>
                                <ListItemText><b>Name</b></ListItemText>
                                <ListItemText >{name || '-'}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText ><b>Email</b></ListItemText>
                                <ListItemText >{email || '-'}</ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemText ><b>Phone</b></ListItemText>
                                <ListItemText >{phone || '-'}</ListItemText>
                            </ListItem>
                        </List>
                    </CardContent>
                </Card>
            </div>
        </Container>
    );
}
