import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneEntry } from 'src/store/entriesSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { FaUser, FaChild, FaIdBadge } from 'react-icons/fa';
import PeopleIcon from '@mui/icons-material/People';
import { capitalize, capitalizeWords } from 'src/utils';

export default function ViewOneEntry() {
    const [entry, setEntry] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchEntry() {
            const response = await dispatch(getOneEntry(id));
            const entry = response.payload[0];
            setEntry({
                leader: entry.leader,
                follower: entry.follower,
                dance: entry.dance,
                ageCategory: capitalizeWords(entry.ageCategory),
                level: capitalizeWords(entry.level),
            });
        }
        fetchEntry();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.entries.status) === 'loading';
    const error = useSelector(state => state.entries.error);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    if (!entry) {
        return null; // Or you can return a loading indicator here
    }

    return (
        <Box className="card-container" sx={{ mt: 4 }}>
            <Container>
                <Button variant="contained" color="secondary" onClick={() => navigate('/admin/entries')}
                    sx={{ mb: 4 }}
                >
                    Back to Entries
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => navigate(`/admin/entries/edit/${id}`)}
                    sx={{ mb: 4, ml: 4 }}
                >
                    Edit Entry
                </Button>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h1">{`${entry.leader.fullName} & ${entry.follower.fullName}`}</Typography>
                                </Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <PeopleIcon size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3">Leader: {capitalize(entry.leader.fullName)}</Typography>
                                        <Typography variant="h3">Follower: {capitalize(entry.follower.fullName)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mt={2}>
                                    <Grid item>
                                        <FaChild size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3">Age Category: {entry.ageCategory}</Typography>
                                        <Typography variant="h3">Level: {entry.level}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mt={2}>
                                    <Grid item>
                                        <FaIdBadge size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h3">Dance: {entry.dance.title} - {entry.dance.danceCategory.name}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}