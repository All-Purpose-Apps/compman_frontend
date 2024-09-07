import React from 'react';
import { useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
const NotFound = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1)
    }
    return (
        <Container
            style={{
                textAlign: 'center',
                marginTop: '50px',
            }}
        >
            <Typography variant="h1" component="h2" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="p" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                It looks like you might have taken a wrong turn.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
                style={{ marginTop: '20px' }}
            >
                Go Back
            </Button>
        </Container>
    );
};

export default NotFound;