import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneDancer } from '../../store/dancersSlice'; // Create this action to fetch a single dancer
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import { capitalize, capitalizeWords } from 'src/utils';

export default function ViewOneDancer() {
    const [dancer, setDancer] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchDancer() {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0];
            setDancer({
                fullName: capitalize(dancer.fullName),
                age: dancer.age,
                identifier: capitalizeWords(dancer.identifier, '/'),
                studio: dancer.studio
            });
        }
        fetchDancer();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const handleStudioClick = (id) => {
        navigate(`/admin/studios/${id}`);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Container sx={{ mt: 4 }}>
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate('/admin/dancers')}
                sx={{ mb: 4 }}
            >
                Back to Dancers
            </Button>
            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h4" component="h1" align="center" gutterBottom>
                                {dancer.fullName}
                            </Typography>
                            <Typography variant="h6" align="center">
                                {dancer.age} - {dancer.identifier}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h5" component="h2" align="center" gutterBottom>
                                Associated Studio
                            </Typography>
                            {dancer.studio ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow hover onClick={() => handleStudioClick(dancer.studio._id)} sx={{ cursor: 'pointer' }}>
                                                <TableCell>Name</TableCell>
                                                <TableCell>{dancer.studio.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Location</TableCell>
                                                <TableCell>{dancer.studio.location}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Phone</TableCell>
                                                <TableCell>{dancer.studio.phone}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Email</TableCell>
                                                <TableCell>{dancer.studio.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Website</TableCell>
                                                <TableCell>
                                                    <a href={dancer.studio.website} target="_blank" rel="noopener noreferrer">
                                                        {dancer.studio.website}
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography>No studio associated</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/admin/dancers/edit/${id}`)}
                sx={{ mt: 4 }}
            >
                Edit Dancer
            </Button>
        </Container>
    );
}