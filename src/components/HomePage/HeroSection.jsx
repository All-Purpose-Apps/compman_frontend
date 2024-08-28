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
                    src="images/companlogo.png"
                    width="600px"
                    style={{
                        maxWidth: '100%', // Responsive width
                        height: 'auto'
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