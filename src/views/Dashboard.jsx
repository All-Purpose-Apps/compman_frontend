import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchStudios } from 'src/store/studiosSlice';
import { fetchHeats } from 'src/store/heatsSlice';
import { Card, CardContent, CardHeader, Grid, Button, Box, Typography } from '@mui/material';
import MainCalendar from 'src/components/MainCalendar';

export default function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dancers = useSelector(state => state.dancers.dancers);
    const studios = useSelector(state => state.studios.studios);
    const heats = useSelector(state => state.heats.heats);

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchStudios());
        dispatch(fetchHeats());
    }, [dispatch]);

    const handleClick = () => {
        navigate('/admin/dancers/new');
    }

    return (
        <Box>
            <Grid container spacing={4} className="mb-4">
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader title="Total Dancers" />
                        <CardContent>
                            <Typography variant="h6">{dancers.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader title="Total Studios" />
                        <CardContent>
                            <Typography variant="h6">{studios.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Card>
                        <CardHeader title="Total Heats" />
                        <CardContent>
                            <Typography variant="h6">{heats.length}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid item xs={12}>
                    <Card>
                        <CardHeader title="Calendar" />
                        <CardContent>
                            <MainCalendar />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}