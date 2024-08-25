import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function InfoCards({ onClick, title, icon, amount }) {
    return (
        <Grid item xs={12} sm={3}>
            <Card onClick={onClick} sx={{ cursor: 'pointer' }}>
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box textAlign="center">
                        <Typography variant="h5">{title}</Typography>
                        {icon}
                    </Box>
                    <Typography variant="h1">{amount}</Typography>
                </CardContent>
            </Card>
        </Grid>
    );
}