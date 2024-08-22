import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchStudios } from 'src/store/studiosSlice';
import { fetchHeats } from 'src/store/heatsSlice';
import { Card, CardContent, Grid, Box, Typography, Paper, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { fetchEntries } from 'src/store/entriesSlice';
import { fetchSchedules } from 'src/store/schedulesSlice';
import moment from 'moment';
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
    const schedules = useSelector(state => state.schedules.schedules);

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchStudios());
        dispatch(fetchHeats());
        dispatch(fetchEntries());
        dispatch(fetchSchedules());
    }, [dispatch]);

    const upcomingHeats = heats
        .filter(heat => moment(heat.dateTime).isAfter(moment()))
        .sort((a, b) => moment(a.dateTime).diff(moment(b.dateTime)))
        .slice(0, 3);

    return (
        <Box p={2}>
            <Paper elevation={3} style={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/studios')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="h5">Total Studios</Typography>
                                    <HomeIcon sx={{ marginTop: '20px' }} fontSize="large" />
                                </Box>
                                <Typography variant="h1">{studios.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/dancers')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="h5">Total Dancers</Typography>
                                    <PersonIcon sx={{ marginTop: '20px' }} fontSize="large" />
                                </Box>
                                <Typography variant="h1">{dancers.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/entries')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="h5">Total Entries</Typography>
                                    <AssignmentIcon sx={{ marginTop: '20px' }} fontSize="large" />
                                </Box>
                                <Typography variant="h1">{entries.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Card>
                            <CardContent style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} onClick={() => navigate('/admin/heats')} sx={{ cursor: 'pointer' }}>
                                <Box textAlign="center">
                                    <Typography variant="h5">Total Heats</Typography>
                                    <WhatshotIcon sx={{ marginTop: '20px' }} fontSize="large" />
                                </Box>
                                <Typography variant="h1">{heats.length}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h3" gutterBottom>Current Schedule</Typography>
                        <List>
                            {schedules.length === 0 ? (
                                <ListItem>
                                    <Typography variant="body1">No schedule available.</Typography>
                                </ListItem>
                            ) : (
                                schedules.map((schedule, index) => (
                                    <React.Fragment key={schedule._id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h2" mb={2}>
                                                        {moment(schedule.startDate).format('MMMM Do YYYY, h:mm A')}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Box display="flex" flexDirection="column" mt={1}>
                                                        <Typography component="span" variant="h3">
                                                            <strong>Event:</strong> {schedule.dances.map((dance) => `${dance.title} - ${dance.danceCategory.name}`).join(', ')}
                                                        </Typography>
                                                        <Typography component="span" variant="h3" mt={1}>
                                                            <strong>Location:</strong> {schedule.location}
                                                        </Typography>
                                                    </Box>
                                                }
                                            />
                                        </ListItem>
                                        {index < schedules.length - 1 && <Divider />}
                                    </React.Fragment>
                                ))
                            )}
                        </List>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper elevation={3} style={{ padding: '16px' }}>
                        <Typography variant="h3" gutterBottom>Next Three Heats</Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Start Time</TableCell>
                                        <TableCell>Dance</TableCell>
                                        <TableCell>Entries</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {upcomingHeats.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={3} align="center">
                                                No upcoming heats.
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        upcomingHeats.map((heat) => (
                                            <TableRow key={heat._id}>
                                                <TableCell>{moment(heat.dateTime).format('MMMM Do YYYY, h:mm A')}</TableCell>
                                                <TableCell>{heat.dance.title} - {heat.dance.danceCategory.name}</TableCell>
                                                <TableCell>
                                                    <List>
                                                        {heat.entries.map((entry) => (
                                                            <ListItem key={entry._id} disablePadding>
                                                                <ListItemText primary={`${entry.leader.fullName} & ${entry.follower.fullName}`} />
                                                            </ListItem>
                                                        ))}
                                                    </List>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}