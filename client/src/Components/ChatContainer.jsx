import { Typography, Grid } from "@mui/material"
import { useEffect, useRef, useState } from "react";
import { Logout } from "./Logout";
import { ChatInput } from "./ChatInput";
import axios from 'axios';
import { sendMessageRoute, getAllMessageRoute } from "./APIRoutes";

export const ChatContainer = ({ currChat, currUser, socket }) => {

    const [messages, setMessages] = useState([]);
    const [arrivalMessages, setArrivalMessages] = useState(null);

    const scrollRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            if (currChat) {
                const res = await axios.post(getAllMessageRoute, {
                    from: currUser._id,
                    to: currChat._id
                })
                setMessages(res.data);
            }
        }
        fetch();
    }, [currChat])


    const handleSendMsg = async (msg) => {
        await axios.post(sendMessageRoute, {
            from: currUser._id,
            to: currChat._id,
            message: msg
        });
        socket.current.emit('send-msg', {
            to: currChat._id,
            from: currUser._id,
            message: msg
        });
        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg })
        setMessages(msgs)
    };


    useEffect(() => {
        if (socket.current) {
            socket.current.on('msg-receive', (msg) => {
                setArrivalMessages({
                    fromSelf: false,
                    message: msg
                })
            })
        }
    }, []);

    useEffect(() => {
        arrivalMessages && setMessages((prev) => [...prev, arrivalMessages])
    }, [arrivalMessages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages])

    return (
        <>

            {currChat && (
                <Grid container display='flex' flexDirection='column'>
                    <Grid item display='flex' alignItems='center' justifyContent='space-between'>
                        <Grid item display='flex' alignItems='center' p={2} gap={2}>
                            <img src='https://cdn-icons-png.flaticon.com/128/236/236832.png' alt="avatar" style={{
                                width: '30px', borderRadius: '50px'
                            }} />
                            <Typography sx={{ color: 'white', fontWeight: 'bolder' }}>
                                {currChat.username}
                            </Typography>
                        </Grid>
                        <Logout />
                    </Grid>
                    <Grid item height="79vh" p={2} gap={2} display='flex' flexDirection='column' overflow='auto'
                        className="message-container" ref={scrollRef}
                    >
                        {messages.map((msg) => {
                            return (
                                <Grid container justifyContent={msg.fromSelf ? 'flex-end' : 'flex-start'}
                                >
                                    <Grid item
                                        display='flex' width='fit-content' p={1.5} borderRadius={5}
                                        backgroundColor={msg.fromSelf ? '#120b34' : '#1a0a31'} maxWidth='300px'
                                        sx={{ wordBreak: 'break-all' }}
                                    >
                                        <Typography sx={{
                                            color: 'lightgrey'
                                        }}>
                                            {msg.message}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item>
                        <ChatInput handleSendMsg={handleSendMsg} />
                    </Grid>
                </Grid>
            )}

        </>
    )
}