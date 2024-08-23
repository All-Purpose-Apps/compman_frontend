import React, { useState } from 'react';
import { TextField, Button, Card, CardContent, CardHeader, Alert, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { app, db } from 'src/firebase';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';
import { setUser } from 'src/store/userSlice';
import { useDispatch } from 'react-redux';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(app);
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Check if the user is in the whitelist
            const userDocRef = doc(db, 'authorizedUsers', user.email);
            const userDoc = await getDoc(userDocRef);
            const { authority } = await userDoc.data();
            if (userDoc.exists() && authority === 'admin') {
                // User is authorized
                const serializedUser = {
                    email: user.email,
                    uid: user.uid,
                    role: authority,
                };
                dispatch(setUser(serializedUser));
                navigate('/admin/dashboard');
            } else if (userDoc.exists() && authority === 'user') {
                const serializedUser = {
                    email: user.email,
                    uid: user.uid,
                    role: authority,
                };
                dispatch(setUser(serializedUser));
                navigate('/user/entry-form');
            } else {
                // User is not authorized
                setError('You are not authorized to log in.');
                auth.signOut();
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            // Check if the user is in the whitelist
            const userDocRef = doc(db, 'authorizedUsers', user.email);
            const userDoc = await getDoc(userDocRef);
            const { authority } = await userDoc.data();
            if (userDoc.exists()) {
                // User is authorized
                const serializedUser = {
                    email: user.email,
                    uid: user.uid,
                    role: authority,
                };
                dispatch(setUser(serializedUser));
                navigate('/user/entry-form');
            } else {
                // User is not authorized
                setError('You are not authorized to log in.');
                auth.signOut();
            }
        } catch (error) {
            setError(error.message);
        }
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
                        <Button variant="contained" color="secondary" onClick={handleGoogleSignIn} fullWidth>
                            Sign in with Google
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