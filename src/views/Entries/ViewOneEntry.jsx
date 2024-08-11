import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCouple } from 'src/store/couplesSlice'; // Assuming you have a couplesSlice with getOneCouple action
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, Card, CardContent, Typography } from '@mui/material';
import { FaUser, FaChild, FaIdBadge } from 'react-icons/fa';
import { capitalize, capitalizeWords } from 'src/utils';

export default function ViewOneEntry() {
    const [couple, setCouple] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchCouple() {
            const response = await dispatch(getOneCouple(id));
            const couple = response.payload[0];
            setCouple({
                leader: couple.leader,
                follower: couple.follower,
                dance: couple.dance,
                ageCategory: capitalizeWords(couple.ageCategory),
                level: capitalizeWords(couple.level),
            });
        }
        fetchCouple();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const error = useSelector(state => state.couples.error);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    if (!couple) {
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
                    Edit Couple
                </Button>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={10}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h4">{`${couple.leader.fullName} & ${couple.follower.fullName}`}</Typography>
                                </Box>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <FaUser size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>Leader: {capitalize(couple.leader.fullName)}</Typography>
                                        <Typography>Follower: {capitalize(couple.follower.fullName)}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mt={2}>
                                    <Grid item>
                                        <FaChild size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>Age Category: {couple.ageCategory}</Typography>
                                        <Typography>Level: {couple.level}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mt={2}>
                                    <Grid item>
                                        <FaIdBadge size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>Dance: {couple.dance.title} - {couple.dance.danceCategory.name}</Typography>
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