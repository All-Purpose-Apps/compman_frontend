import { Container, Grid, Typography } from '@mui/material'

export default function InfoSection() {
    return (
        <Container maxWidth="lg" className="homepage-infosection">
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Accessible on all devices
                    </Typography>
                    <Typography variant="body2">
                        This is a responsive design that works on all devices. It's easy to use and just
                        works out of the box.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Auto Generate Heats
                    </Typography>
                    <Typography variant="body2">
                        The system will automatically generate heats based on the number of entries and schedule of events. Easy to use, easy to manage.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" gutterBottom>
                        Track Everything
                    </Typography>
                    <Typography variant="body2">
                        From Studios to Finances and everything in between. The app is designed to help you manage your competition with ease.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
