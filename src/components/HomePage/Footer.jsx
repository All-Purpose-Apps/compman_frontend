import { Box, Container, Grid, Link, Typography } from '@mui/material'
import { BRAND } from 'src/utils'

export default function Footer() {
    return (
        < Box
            sx={{
                backgroundColor: '#343a40',
                color: 'white',
                padding: '20px 0',
                marginTop: 'auto', // Ensures the footer stays at the bottom
            }
            }
        >
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
        </ Box>
    )
}
