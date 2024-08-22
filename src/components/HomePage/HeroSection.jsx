import { Box, Button, Container, Typography } from '@mui/material';
import { BRAND, VERSION } from 'src/utils';
import { useNavigate } from 'react-router-dom';

export default function HeroSection() {
    const navigate = useNavigate();
    const handleGoToApp = () => {
        navigate('/admin/dashboard', { replace: true });
    };

    return (
        <Box
            sx={{
                position: 'relative', // Ensure the Box is a containing block for the pseudo-element
                backgroundColor: '#1E1E1E',
                color: 'white',
                padding: '30px 0',
                textAlign: 'center',
                flex: '1',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden', // Ensure the pseudo-element doesn't overflow
                zIndex: 0, // Ensure that content is above the background
                '::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url('https://images.pexels.com/photos/2057273/pexels-photo-2057273.jpeg')`, // Replace with your image URL
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    opacity: 0.1, // Adjust opacity as needed
                    zIndex: -1, // Position the pseudo-element behind the content
                },
            }}
        >
            <Container maxWidth="md" sx={{ zIndex: 1 }}> {/* Ensure the content is above the background */}
                <Typography variant="h3" gutterBottom sx={{ color: '#E0E0E0' }}>
                    {BRAND}
                </Typography>
                <Typography variant="h6" gutterBottom sx={{ color: '#9C9C9C' }}>
                    The only competition manager you'll ever need.
                </Typography>
                <Box sx={{ marginTop: 3 }}>
                    <Button variant="contained" sx={{ margin: 1, backgroundColor: '#4E18A2' }} onClick={handleGoToApp}>
                        Get started
                    </Button>
                    <Button variant="contained" sx={{ margin: 1, backgroundColor: '#4E18A2' }}>
                        Pricing & Features
                    </Button>
                </Box>
                <Typography variant="body2" sx={{ marginTop: 2, color: '#9C9C9C' }}>
                    Current version: {VERSION}
                </Typography>
            </Container>
        </Box>
    );
}