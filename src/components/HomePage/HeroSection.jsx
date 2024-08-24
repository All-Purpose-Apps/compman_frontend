import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { BRAND, VERSION } from 'src/utils';
import { useNavigate } from 'react-router-dom';

const HeroSection = React.memo(() => {
    const navigate = useNavigate();

    const handleGoToApp = React.useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    const handleGoToPricing = React.useCallback(() => {
        navigate('/pricing');
    }, [navigate]);

    return (
        <Box className="hero-section">
            <Container maxWidth="md" className="hero-content">
                <Typography variant="h3" gutterBottom className="hero-title">
                    {BRAND}
                </Typography>
                <Typography variant="h6" gutterBottom className="hero-subtitle">
                    The only competition manager you'll ever need.
                </Typography>
                <Box className="hero-buttons">
                    <Button variant="contained" className="hero-button" onClick={handleGoToApp}>
                        Get started
                    </Button>
                    <Button variant="contained" className="hero-button" onClick={handleGoToPricing}>
                        Pricing & Features
                    </Button>
                </Box>
                <Typography variant="body2" className="hero-version">
                    Current version: {VERSION}
                </Typography>
            </Container>
        </Box>
    );
});

export default HeroSection;