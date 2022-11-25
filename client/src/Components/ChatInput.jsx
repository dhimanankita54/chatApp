import { Typography, Grid } from "@mui/material"
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';
import Picker from 'emoji-picker-react';
import { useState } from "react";
import InputEmoji from 'react-input-emoji'

export const ChatInput = ({ handleSendMsg }) => {

    const [msg, setMsg] = useState("");

    const sendChat = (e) => {
        e.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }



    return (
        <>
            <Grid container >
                <Grid item width='100%' display='flex' gap={2} alignItems='center' px={2} >
                    <InputEmoji
                        value={msg}
                        onChange={setMsg}
                    />
                    <IoMdSend style={{
                        color: 'white',
                        fontSize: '25px',
                        backgroundColor: '#3f3b52',
                        padding: '10px',
                        borderRadius: '50px',
                    }}
                        onClick={(e) => sendChat(e)}
                    />

                </Grid>
            </Grid>
        </>
    )
}