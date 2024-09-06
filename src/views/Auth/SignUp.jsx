import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { setUser } from 'src/store/userSlice';
import { app, db } from 'src/firebase';
import { doc, getDoc } from 'firebase/firestore/lite';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const auth = getAuth(app);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const userDocRef = doc(db, 'authorizedUsers', email);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                const serializableUser = {
                    uid: user.uid,
                    email: user.email,
                };
                dispatch(setUser(serializableUser));
                navigate('/admin/dashboard');
            } else {
                setError('You are not authorized to signup.');
                await auth.signOut();
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <Card>
            <CardHeader title="Signup" />
            <CardContent>
                {error && <Alert severity="error">{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        id="formEmail"
                        label="Email address"
                        type="email"
                        placeholder="Enter email"
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        id="formConfirmPassword"
                        label="Confirm Password"
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Box mt={2}>
                        <Button variant="contained" color="primary" type="submit" fullWidth>
                            Signup
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Typography>
                            Already have an account? <a href="/auth/login">Login</a>
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}