import Box from '@mui/material/Box';
import { Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import InputBase from '@mui/material/InputBase';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { registerRoute } from './APIRoutes';

export const Register = () => {

    const navigate = useNavigate();

    const [value, setValue] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (handleValidation()) {
            const { username, email, password } = value;

            const users = [];

            const { data } = await axios.post(registerRoute, {
                username, email, password
            });

            if (!data.status) {
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

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const handleValidation = () => {
        const { username, email, password, confirmPassword } = value;

        if (password !== confirmPassword) {
            toast.error('Password and confirm password does not match', toastOptions)
            return false;
        }

        else if (email === '' || username === '' || password === '' || confirmPassword === '') {
            toast.error('Please fill all the fields!', toastOptions);
            return false;
        }

        else if (username.length < 3) {
            toast.error('Username should be more than 3 characters', toastOptions);
            return false;
        }

        else if (password.length < 8) {
            toast.error('Password should be more than 8 characters', toastOptions);
            return false;
        }

        else if (!validateEmail(email)) {
            toast.error('Enter a valid email', toastOptions);
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
                    <TextField label="Email" name='email' variant="outlined" type='email'
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
                    <TextField label="Confirm Password" name='confirmPassword' variant="outlined" type='password'
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
                        Create User
                    </Button>
                    <Typography color='white'>
                        Already a user?
                        <Link to='/login' style={{ textDecoration: 'none', color: '#03A9F4' }} >
                            <Typography component='span'>
                                { }  LOGIN
                            </Typography>
                        </Link>
                    </Typography>
                </Grid>

                <ToastContainer />

            </Box>
        </>
    )
}