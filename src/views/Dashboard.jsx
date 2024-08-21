import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchStudios } from 'src/store/studiosSlice';
import { fetchHeats } from 'src/store/heatsSlice';
import { Card, CardContent, Grid, Box, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { fetchEntries } from 'src/store/entriesSlice';
import { fetchSchedules } from 'src/store/schedulesSlice'; // Assuming this exists
import moment from 'moment';
import { BarChart } from '@mui/x-charts/BarChart'; // Import the BarChart component from MUI X Charts
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WhatshotIcon from '@mui/icons-material/Whatshot';

export default function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dancers = useSelector(state => state.dancers.dancers);
    const studios = useSelector(state => state.studios.studios);
    const heats = useSelector(state => state.heats.heats);
    const entries = useSelector(state => state.entries.entries);
    const schedules = useSelector(state => state.schedules.schedules); // Assuming this exists

    // Mock data for money collected, replace with your actual data
    const moneyData = [
        { month: 'January', amount: 4000 },
        { month: 'February', amount: 3000 },
        { month: 'March', amount: 5000 },
        { month: 'April', amount: 7000 },
        { month: 'May', amount: 2000 },
        { month: 'June', amount: 6000 },
    ];

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchStudios());
        dispatch(fetchHeats());
        dispatch(fetchEntries());
        dispatch(fetchSchedules()); // Fetch schedules
    }, [dispatch]);

    return (
        <Box p={2}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/studios')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="subtitle1">Total Studios</Typography>
                                    <HomeIcon fontSize="large" />
                                </Box>
                                <Typography variant="h4">{studios.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/dancers')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="subtitle1">Total Dancers</Typography>
                                    <PersonIcon fontSize="large" />
                                </Box>
                                <Typography variant="h4">{dancers.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/entries')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="subtitle1">Total Entries</Typography>
                                    <AssignmentIcon fontSize="large" />
                                </Box>
                                <Typography variant="h4">{entries.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/heats')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="subtitle1">Total Heats</Typography>
                                    <WhatshotIcon fontSize="large" />
                                </Box>
                                <Typography variant="h4">{heats.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Box mt={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6" gutterBottom>Current Schedule</Typography>
                    <List>
                        {schedules.length === 0 ? (
                            <Typography>No schedule available.</Typography>
                        ) : (
                            schedules.map((schedule, index) => (
                                <React.Fragment key={schedule.id}>
                                    <ListItem>
                                        <ListItemText
                                            primary={`${moment(schedule.startDate).format('MM/DD/YYYY - h:mm A')}`}
                                            secondary={`Event: ${schedule.dances.map((dance) => `${dance.title} - ${dance.danceCategory.name}`)}, Location: ${schedule.location}`}
                                        />
                                    </ListItem>
                                    {index < schedules.length - 1 && <Divider />}
                                </React.Fragment>
                            ))
                        )}
                    </List>
                </Paper>
            </Box>

            {/* <Box mt={4}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                    <Typography variant="h6" gutterBottom>Money Collected</Typography>
                    <BarChart
                        data={moneyData}
                        xKey={['month']}
                        yKeys={['amount']}
                        series={[
                            {
                                data: [2, 5, 3],
                            },
                        ]}
                        width={600}
                        height={300}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    />
                </Paper>
            </Box> */}
        </Box>
    );
}