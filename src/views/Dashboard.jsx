import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchStudios } from 'src/store/studiosSlice';
import { fetchHeats } from 'src/store/heatsSlice';
import { fetchEntries } from 'src/store/entriesSlice';
import { fetchSchedules } from 'src/store/schedulesSlice';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import dayjs from 'dayjs';
import InfoCards from 'src/components/Dashboard/InfoCards';
import CurrentSchedule from 'src/components/Dashboard/CurrentSchedule';
import NextHeats from 'src/components/Dashboard/NextHeats';

export default function Dashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dancers = useSelector((state) => state.dancers.dancers);
    const studios = useSelector((state) => state.studios.studios);
    const heats = useSelector((state) => state.heats.heats);
    const entries = useSelector((state) => state.entries.entries);
    const schedules = useSelector((state) => state.schedules.schedules);

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchStudios());
        dispatch(fetchHeats());
        dispatch(fetchEntries());
        dispatch(fetchSchedules());
    }, [dispatch]);

    const upcomingHeats = useMemo(() => {
        return heats
            .filter((heat) => dayjs(heat.dateTime).isAfter(dayjs()))
            .sort((a, b) => dayjs(a.dateTime).diff(dayjs(b.dateTime)))
            .slice(0, 3);
    }, [heats]);

    return (
        <Box p={2}>
            <Paper elevation={3} sx={{ padding: '16px' }}>
                <Grid container spacing={2}>
                    <InfoCards onClick={() => navigate('/admin/studios')} title="Total Studios" icon={<HomeIcon sx={{ mt: 2 }} fontSize="large" />} amount={studios.length} />
                    <InfoCards onClick={() => navigate('/admin/dancers')} title="Total Dancers" icon={<PersonIcon sx={{ mt: 2 }} fontSize="large" />} amount={dancers.length} />
                    <InfoCards onClick={() => navigate('/admin/entries')} title="Total Entries" icon={<AssignmentIcon sx={{ mt: 2 }} fontSize="large" />} amount={entries.length} />
                    <InfoCards onClick={() => navigate('/admin/heats')} title="Total Heats" icon={<WhatshotIcon sx={{ mt: 2 }} fontSize="large" />} amount={heats.length} />
                </Grid>
            </Paper>

            <Grid container spacing={2} mt={2}>
                <Grid item xs={12} md={6}>
                    <CurrentSchedule schedules={schedules} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <NextHeats upcomingHeats={upcomingHeats} />
                </Grid>
            </Grid>
        </Box>
    );
}