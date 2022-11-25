import { Typography, Grid } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Welcome = ({ currUser }) => {



    return (
        <>
            <Grid container>
                <Grid item md={12} height='97vh' display='flex' flexDirection='column' alignItems='center' justifyContent='center' >
                    <img src='https://i.gifer.com/7V3E.gif' />
                    <Typography sx={{
                        color: 'white', fontWeight: 'bolder'
                    }}>
                        Welcome, <span style={{ color: '#2902d3' }}>{currUser.username} !</span>
                    </Typography>
                    <Typography sx={{
                        color: 'white', fontWeight: 'bolder'
                    }}>
                        Please select a chat to start messaging
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}