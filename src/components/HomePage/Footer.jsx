import { memo } from 'react'; // Named import for React.memo
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { BRAND } from 'src/utils';

const Footer = memo(() => {
    return (
        <Box className="homepage-footer">
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Docs
                        </Typography>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                How {BRAND} works
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                API
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Support
                        </Typography>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                FAQ
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Typography variant="h6" gutterBottom>
                            Social
                        </Typography>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                Instagram
                            </Link>
                        </Box>
                        <Box>
                            <Link href="#" color="inherit" underline="none">
                                Twitter
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
});

export default Footer;