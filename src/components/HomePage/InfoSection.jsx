import { Container, Grid, Typography } from '@mui/material'

export default function InfoSection() {
    return (
        <Container maxWidth="lg" sx={{ padding: '20px 0', flex: '1', display: 'flex', justifyContent: 'center', alignItems: 'center', maxHeight: '200px' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        Accessible on all devices
                    </Typography>
                    <Typography variant="body1">
                        This is a responsive design that works on all devices. It's easy to use and just
                        works out of the box.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        Auto Generate Heats
                    </Typography>
                    <Typography variant="body1">
                        The system will automatically generate heats based on the number of entries and schedule of events. Easy to use, easy to manage.
                    </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h5" gutterBottom>
                        Track Everything
                    </Typography>
                    <Typography variant="body1">
                        From Studios to Finances and everything in between. The app is designed to help you manage your competition with ease.
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    )
}
