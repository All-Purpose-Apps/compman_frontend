import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

const UnauthorizedPage = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                textAlign: 'center',
                backgroundColor: '#f0f0f0',
                padding: 3,
            }}
        >
            <LockOutlinedIcon sx={{ fontSize: 80, color: '#ff1744', mb: 2 }} />
            <Typography variant="h3" component="h1" gutterBottom>
                Unauthorized
            </Typography>
            <Typography variant="body1" color="textSecondary" paragraph>
                You don't have permission to access this page.
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleGoBack}
                sx={{ mt: 2 }}
            >
                Go Back
            </Button>
        </Box>
    );
};

export default UnauthorizedPage;