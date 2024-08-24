import { memo } from 'react';
import Footer from 'src/components/HomePage/Footer';
import HeroSection from 'src/components/HomePage/HeroSection';
import InfoSection from 'src/components/HomePage/InfoSection';
import TopBar from 'src/components/HomePage/TopBar';
import Box from '@mui/material/Box';

const Homepage = memo(() => {
    return (
        <Box className="homepage">
            <TopBar />
            <HeroSection />
            <InfoSection />
            <Footer />
        </Box>
    );
});

export default Homepage;