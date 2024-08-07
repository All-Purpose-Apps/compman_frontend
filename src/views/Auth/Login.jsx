import React, { useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
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
            <Card.Body>
                <Card.Title>Login</Card.Title>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formEmail" className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            autoComplete='email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formPassword" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            autoComplete='current-password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mb-4">
                        Login
                    </Button>
                    <p>Don't have an account? <a href="/auth/signup">Sign up</a></p>
                </Form>
            </Card.Body>
        </Card >
    );
}