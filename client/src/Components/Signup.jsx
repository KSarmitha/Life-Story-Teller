import { Button, Link, Paper, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_PATHS } from '../utils/constants/api';

export const Signup = () => {
  const heading = { margin: "5px 0", fontSize: "2rem", fontWeight: "600", textAlign: "center" };
  const paperStyle = { padding: "2rem", margin: '100px auto', borderRadius: "1rem", boxShadow: "10px 10px 10px rgba(0,0,0,0.1)" };
  const row = { display: "flex", marginTop: "2rem" };
  const btnStyle = { marginTop: "2rem", fontWeight: "700" };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(API_PATHS.SIGNUP, {name, email, password})
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        window.alert('User created successfully');
        navigate('/login');
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response && err.response.status === 400) {
        window.alert('User already exists');
      } else {
        window.alert('Internal server error');
      }
    });
  }

  return (
    <>
      <div>
        <Paper elevation={10} style={paperStyle}
          sx= {{width: {
            xs: "80vw",
            sm: "50vw",
            md: "40vw",
            lg: "30vw",
            xl: "20vw"
          },
            height: "60vh",
          }}>
          <h2 style={heading}>Sign Up</h2>
          <form onSubmit={handleSubmit}>
          <TextField onChange={(e) => setName(e.target.value)} name="name" style={row} label='Username' placeholder='Enter username' type='text' fullWidth required />
          <TextField onChange={(e) => setEmail(e.target.value)} name="email" style={row} label='Email' placeholder='Enter email' type='email' fullWidth required />
          <TextField onChange={(e) => setPassword(e.target.value)} name="password" style={row} label='Password' placeholder='Enter password' type='password' fullWidth required />
          <Button style={btnStyle} type='submit' color='primary' variant='contained' fullWidth>Sign up</Button>
          <Typography>
            <Link href='#'>Already have an account?</Link>
          </Typography>
          </form>
          </Paper>
      </div>
    </>
  )
}
