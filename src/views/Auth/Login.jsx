import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
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
            await handleUserAuthorization(user);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, new GoogleAuthProvider());
            const user = result.user;
            await handleUserAuthorization(user);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUserAuthorization = async (user) => {
        const userDocRef = doc(db, 'authorizedUsers', user.email);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const { authority } = userDoc.data();
            const serializedUser = {
                email: user.email,
                uid: user.uid,
                role: authority,
            };
            dispatch(setUser(serializedUser));
            if (authority === 'admin') {
                navigate('/admin/dashboard');
            } else {
                navigate('/user/entry-form');
            }
        } else {
            setError('You are not authorized to log in.');
            auth.signOut();
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
                        autoComplete="email"
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
                        autoComplete="current-password"
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
                    {/* <Box mt={2}>
                        <Typography>
                            Don't have an account? <a href="/auth/signup">Sign up</a>
                        </Typography>
                    </Box> */}
                </Box>
            </CardContent>
        </Card>
    );
}