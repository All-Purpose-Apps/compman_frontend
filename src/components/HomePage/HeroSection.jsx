import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import compman from 'src/assets/images/companlogo.png';

const HeroSection = React.memo(() => {
    const navigate = useNavigate();

    const handleGoToApp = React.useCallback(() => {
        navigate('/auth/login');
    }, [navigate]);

    const handleGoToPricing = React.useCallback(() => {
        navigate('/pricing');
    }, [navigate]);

    return (
        <Box
            className="hero-section"
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh', // Full viewport height
                textAlign: 'center'
            }}
        >
            <Container maxWidth="md" className="hero-content">
                <img
                    src={compman}
                    height="auto"
                    width="600px"
                    alt="Compan Logo"
                    style={{
                        maxWidth: '100%', // Responsive width
                    }}
                />
                <Box className="hero-buttons" sx={{ marginTop: 2 }}>
                    <Button variant="contained" className="hero-button" onClick={handleGoToApp}>
                        Get started
                    </Button>
                    <Button variant="contained" className="hero-button" onClick={handleGoToPricing} sx={{ marginLeft: 1 }}>
                        Pricing & Features
                    </Button>
                </Box>
            </Container>
        </Box>
    );
});

export default HeroSection;