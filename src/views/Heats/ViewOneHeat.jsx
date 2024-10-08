import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import { FaCalendarAlt } from 'react-icons/fa';
import PeopleIcon from '@mui/icons-material/People';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { getOneHeat } from 'src/store/heatsSlice';
import { capitalizeWords } from 'src/utils';
import dayjs from 'dayjs';

export default function ViewOneHeat() {
    const [heat, setHeat] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchHeat() {
            const response = await dispatch(getOneHeat(id));
            const heatData = response.payload;
            setHeat({
                number: heatData.number,
                dance: heatData.dance,
                ageCategory: capitalizeWords(heatData.ageCategory),
                level: capitalizeWords(heatData.level),
                dateTime: new Date(heatData.dateTime).toLocaleString(),
                entries: heatData.entries.map((entry) => ({
                    id: entry._id,
                    leader: entry.leader.fullName,
                    follower: entry.follower.fullName,
                })),
            });
        }
        fetchHeat();
    }, [dispatch, id]);

    const isLoading = useSelector((state) => state.heats.status) === 'loading';
    const error = useSelector((state) => state.heats.error);

    if (isLoading) {
        return (
            <Box textAlign="center" sx={{ mt: 4 }}>
                <Typography variant="h6">Loading...</Typography>
            </Box>
        );
    }

    if (error) {
        return (
            <Box textAlign="center" sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">
                    {error}
                </Typography>
            </Box>
        );
    }

    if (!heat) {
        return null;
    }

    return (
        <Box sx={{ mt: 4 }}>
            <Container>
                <Grid container spacing={2} justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
                    <Grid item>
                        <Button
                            variant="contained"
                            color="secondary"
                            startIcon={<ArrowBackIcon />}
                            onClick={() => navigate('/admin/heats')}
                        >
                            Back to Heats
                        </Button>
                    </Grid>
                </Grid>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={8}>
                        <Card elevation={3} sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h1" color="secondary">
                                        HEAT #{heat.number}
                                    </Typography>
                                </Box>
                                <Grid container spacing={2} alignItems="center" sx={{ mb: 4 }}>
                                    <Grid item>
                                        <FaCalendarAlt size={24} />
                                    </Grid>
                                    <Grid item xs>
                                        <Typography variant="h6">
                                            <Box display="flex">
                                                <Box width="200px" fontWeight="bold" mr={4} sx={{ textAlign: 'right' }}>
                                                    Dance:
                                                </Box>
                                                <Box>
                                                    {heat.dance.title} - {heat.dance.danceCategory.name}
                                                </Box>
                                            </Box>
                                        </Typography>
                                        <Typography variant="h6">
                                            <Box display="flex">
                                                <Box width="200px" fontWeight="bold" mr={4} sx={{ textAlign: 'right' }}>
                                                    Date & Time:
                                                </Box>
                                                <Box>
                                                    {dayjs(heat.dateTime).format('MM/DD/YYYY, h:mm A')}
                                                </Box>
                                            </Box>
                                        </Typography>
                                        <Typography variant="h6">
                                            <Box display="flex">
                                                <Box width="200px" fontWeight="bold" mr={4} sx={{ textAlign: 'right' }}>
                                                    Age Category:
                                                </Box>
                                                <Box>
                                                    {heat.ageCategory}
                                                </Box>
                                            </Box>
                                        </Typography>
                                        <Typography variant="h6">
                                            <Box display="flex">
                                                <Box width="200px" fontWeight="bold" mr={4} sx={{ textAlign: 'right' }}>
                                                    Level:
                                                </Box>
                                                <Box>
                                                    {heat.level}
                                                </Box>
                                            </Box>
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Divider />
                                <Box mt={4}>
                                    <Typography variant="h5" gutterBottom>
                                        Entries
                                    </Typography>
                                    {heat.entries.map((entry, index) => (
                                        <Card
                                            key={index}
                                            elevation={1}
                                            sx={{
                                                my: 2,
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: 'action.hover',
                                                },
                                                borderRadius: 2,
                                            }}
                                            onClick={() => navigate(`/admin/entries/${entry.id}`)}
                                        >
                                            <CardContent>
                                                <Grid container spacing={2} alignItems="center">
                                                    <Grid item>
                                                        <PeopleIcon size={24} color="secondary" />
                                                    </Grid>
                                                    <Grid item xs>
                                                        <Typography variant="body1">
                                                            {entry.leader} & {entry.follower}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={(e) => { e.stopPropagation(); navigate(`/admin/entries/edit/${entry.id}`) }}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box >
    );
}