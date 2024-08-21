import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneStudio } from 'src/store/studiosSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, Grid, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaBuilding } from 'react-icons/fa';
import { capitalize, formatPhoneNumber, capitalizeWords } from 'src/utils';

export default function ViewOneStudio() {
    const [studio, setStudio] = useState({});
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchStudio() {
            const response = await dispatch(getOneStudio(id));
            setPeople(response.payload.dancers);
            setStudio({
                name: capitalize(response.payload[0].name),
                location: capitalize(response.payload[0].location),
                phone: formatPhoneNumber(response.payload[0].phone),
                studioType: capitalize(response.payload[0].studioType),
                email: response.payload[0].email,
                website: response.payload[0].website,
            });
        }
        fetchStudio();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    if (isLoading) {
        return <Typography>Loading...</Typography>;
    }

    if (error) {
        return <Typography>{error}</Typography>;
    }

    const handlePersonClick = (id) => {
        navigate(`/admin/dancers/${id}`);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box className="card-container" sx={{ mt: 4 }}>
            <Container>
                <Button variant="contained" color="secondary" onClick={() => navigate('/admin/studios')}>
                    Back to Studios
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ ml: 2 }}
                    onClick={() => navigate(`/admin/studios/edit/${id}`)}
                >
                    Edit Studio
                </Button>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h4">{studio.name}</Typography>
                                </Box>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item>
                                        <FaMapMarkerAlt size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{studio.location}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item>
                                        <FaPhone size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{studio.phone}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item>
                                        <FaBuilding size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{studio.studioType}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item>
                                        <FaEnvelope size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>{studio.email}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} alignItems="center" mb={2}>
                                    <Grid item>
                                        <FaGlobe size={20} />
                                    </Grid>
                                    <Grid item>
                                        <Typography>
                                            <a href={studio.website} target="_blank" rel="noopener noreferrer">
                                                {studio.website}
                                            </a>
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h5">Dancers</Typography>
                                </Box>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mb: 2 }}
                                    onClick={() => navigate('/admin/dancers/new')}
                                >
                                    Add Dancer
                                </Button>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Full Name</TableCell>
                                                <TableCell>Age</TableCell>
                                                <TableCell>Identifier</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {people && people.length > 0 ? (
                                                people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(person => (
                                                    <TableRow
                                                        key={person._id}
                                                        onClick={() => handlePersonClick(person._id)}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        <TableCell>{capitalize(person.fullName)}</TableCell>
                                                        <TableCell>{person.age}</TableCell>
                                                        <TableCell>{capitalizeWords(person.identifier, "/")}</TableCell>
                                                    </TableRow>
                                                ))
                                            ) : (
                                                <TableRow>
                                                    <TableCell colSpan={3} align="center">No people found</TableCell>
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                    <TablePagination
                                        rowsPerPageOptions={[5]}
                                        component="div"
                                        count={people.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Container>
        </Box>
    );
}