import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { loginRoute } from './APIRoutes';
import { useEffect } from 'react';

export const Login = () => {

    const navigate = useNavigate();

    const [value, setValue] = useState({
        username: '',
        password: '',
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, password } = value;

            const { data } = await axios.post(loginRoute, {
                username, password
            });

            if (data.status === false) {
                toast.error(data.message, toastOptions)
            }

            if (data.status === true) {
                localStorage.setItem('chat-app-user', JSON.stringify(data.user))
                navigate('/')
            }

        }
    }

    const handleChange = (e) => {
        setValue({
            ...value, [e.target.name]: e.target.value
        })
    }

    const toastOptions = {
        position: 'bottom-right',
        autoClose: 8000
    }


    const handleValidation = () => {
        const { username, password } = value;
        if (username.length === '' || password === '') {
            toast.error('Please fill all the fields!', toastOptions);
            return false;
        }
        return true;
    }

    return (
        <>
            <Box
                component="form"
                autoComplete="off"
            >
                <Grid container
                    display='flex'
                    flexDirection="column"
                    justifyContent='center'
                    alignItems='center'
                    height='95vh'
                    margin='0px'
                    padding='0px'
                    gap={2}
                >
                    <TextField label="Username" name='username' variant="outlined" type='text'
                        InputProps={{
                            style: { color: 'white', border: '1px solid white' }
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField label="Password" name='password' variant="outlined" type='password'
                        InputProps={{
                            style: { color: 'white', border: '1px solid white' }
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        onChange={(e) => handleChange(e)}
                    />
                    <Button
                        size='large'
                        type='submit'
                        sx={{ backgroundColor: 'black', color: 'white', fontWeight: 'bold' }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Typography color='white'>
                        Don't have an account?
                        <Link to='/register' style={{ textDecoration: 'none', color: '#03A9F4' }} >
                            <Typography component='span'>
                                { }  REGISTER
                            </Typography>
                        </Link>
                    </Typography>
                </Grid>

                <ToastContainer />

            </Box>
        </>
    )
}