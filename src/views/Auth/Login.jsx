import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, CardHeader, Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { app } from 'src/firebase';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'src/store/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                const serializedUser = {
                    email: user.email,
                    uid: user.uid,
                }
                dispatch(setUser(serializedUser));
                navigate('/admin/dashboard');
            })
            .catch((error) => {
                setError(error.message);
            });
    };

    return (
        <Card>
            <CardHeader title="Login" />
            <CardContent>
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        id="formEmail"
                        label="Email address"
                        type="email"
                        placeholder="Enter email"
                        autoComplete='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="formPassword"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Login
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Typography>
                            Don't have an account? <a href="/auth/signup">Sign up</a>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}