import { Contacts } from "./Contacts"
import { Button, Grid, Typography } from '@mui/material';
import { useState, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { allUsersRoute, host } from "./APIRoutes";
import axios from 'axios';
import { Welcome } from "./Welcome";
import { ChatContainer } from "./ChatContainer";
import io from 'socket.io-client';

export const Chat = () => {

    const socket = useRef();

    const [currUser, setCurrUser] = useState(undefined);
    const [contacts, setContacts] = useState([]);
    const [currChat, setCurrChat] = useState(undefined);
    const [isLoaded, setIsLoaded] = useState(false);

    const navigate = useNavigate();

    console.log(currUser)

    useEffect(() => {
        const fetch = async () => {
            if (!localStorage.getItem('chat-app-user')) {
                navigate('/login')
            } else {
                setCurrUser(JSON.parse(localStorage.getItem('chat-app-user')))
                setIsLoaded(true)
            }
        }
        fetch();
    }, [])

    useEffect(() => {
        if (currUser) {
            socket.current = io(host);
            socket.current.emit('add-user', currUser._id);
        }
    }, [currUser])

    useEffect(() => {
        const fetchUsers = async () => {
            if (currUser) {
                const data = await axios.get(`${allUsersRoute}/${currUser._id}`);

                console.log("contacts", data)
                setContacts(data.data);
            }
        }
        fetchUsers();
    }, [currUser]);

    const handleChat = (chat) => {
        setCurrChat(chat);
    }

    return (
        <>
            <Grid container display='flex' alignItems='center' justifyContent='center' height='97vh'>
                <Grid item md={9} sm={12} xs={12} display='flex' flexDirection='row' backgroundColor='#0b0914' height='80vh' borderRadius={3} >
                    <Grid item md={3} height='inherit' overflow='auto' className="contacts-container" borderRadius={2}>
                        {isLoaded &&
                            <Contacts contacts={contacts} currUser={currUser} handleChat={handleChat} />
                        }

                    </Grid>
                    <Grid item md={9} sm={12} xs={12} height='inherit'>

                        {isLoaded && currChat === undefined ?
                            <Welcome currUser={currUser} /> :
                            <ChatContainer currChat={currChat} currUser={currUser} socket={socket} />
                        }


                    </Grid>
                </Grid>


            </Grid>
        </>
    )
}