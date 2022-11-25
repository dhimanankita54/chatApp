import { useState } from "react"
import { useEffect } from "react"
import { Button, Grid, Typography } from '@mui/material';
import { Logout } from "./Logout";

export const Contacts = ({ contacts, currUser, handleChat }) => {

    const [currUsername, setCurrUsername] = useState(undefined);
    const [currChat, setCurrChat] = useState(undefined);

    useEffect(() => {
        if (currUser) {
            setCurrUsername(currUser.username);
        }
    }, [currUser]);

    console.log(currChat)

    const changeCurrChat = (i, contact) => {
        setCurrChat(i);
        handleChat(contact)
    };

    return (
        <>
            {currUsername && (
                <Grid container gap={1} >
                    <Grid item
                        sx={{ backgroundColor: '#546E7A' }}
                        display='flex'
                        flexDirection="row"
                        p={2}
                        gap={2}
                        alignItems='center'
                        width='100%'
                        justifyContent='space-between'>
                        <Grid item
                            display='flex'
                            flexDirection="row"
                            alignItems='center'
                            gap={2}
                        >
                            <img src='https://cdn-icons-png.flaticon.com/128/236/236832.png' alt="avatar"
                                style={{
                                    width: '40px',
                                    borderRadius: '50px'
                                }} />
                            <Typography
                                sx={{ color: 'white', fontWeight: 'bold' }}
                            >
                                {currUsername}
                            </Typography>
                        </Grid>
                        <Logout />
                    </Grid>
                    <Grid container display='flex' flexDirection="column" >
                        {contacts.map((item, i) => {
                            return (
                                <Grid item
                                    key={i}
                                    display='flex'
                                    flexDirection="row"
                                    p={2}
                                    gap={2}
                                    borderRadius={1}
                                    alignItems='center'
                                    onClick={() => changeCurrChat(i, item)}
                                    borderBottom='1px solid'
                                    backgroundColor={currChat === i ? '#8f71e0' : '#3f3b52'}
                                    sx={{ cursor: 'pointer' }}
                                >
                                    <img src='https://cdn-icons-png.flaticon.com/128/236/236832.png' alt="avatar"
                                        style={{
                                            width: '40px',
                                            borderRadius: '50px'
                                        }} />
                                    <Typography
                                        sx={{ color: 'white', fontWeight: 'bold' }}
                                    >
                                        {item.username}
                                    </Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            )}

        </>
    )
}