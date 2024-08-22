import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
    Box, Button, Card, CardContent, Container, Grid, Paper,
    Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, Typography
} from '@mui/material';
import BusinessIcon from '@mui/icons-material/Business';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { getOneStudio } from 'src/store/studiosSlice';
import { capitalize, capitalizeWords, formatPhoneNumber } from 'src/utils';

const StudioInfoItem = ({ icon: Icon, text }) => (
    <Grid container spacing={2} alignItems="center" mb={2}>
        <Grid item>
            <Icon size={20} />
        </Grid>
        <Grid item>
            <Typography>{text}</Typography>
        </Grid>
    </Grid>
);

export default function ViewOneStudio() {
    const [studio, setStudio] = useState({});
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchStudio = async () => {
            const response = await dispatch(getOneStudio(id));
            const studioData = response.payload[0];

            setStudio({
                name: capitalize(studioData.name),
                location: capitalize(studioData.location),
                phone: formatPhoneNumber(studioData.phone),
                studioType: capitalize(studioData.studioType),
                email: studioData.email,
                website: studioData.website,
            });

            setPeople(response.payload.dancers);
        };

        fetchStudio();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    const handlePersonClick = (id) => navigate(`/admin/dancers/${id}`);

    const handleChangePage = (event, newPage) => setPage(newPage);

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
                <Button variant="contained" color="secondary" sx={{ ml: 2 }} onClick={() => navigate(`/admin/studios/edit/${id}`)}>
                    Edit Studio
                </Button>

                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h1">{studio.name}</Typography>
                                </Box>
                                <StudioInfoItem icon={LocationOnIcon} text={studio.location} />
                                <StudioInfoItem icon={PhoneIcon} text={studio.phone} />
                                <StudioInfoItem icon={EmailIcon} text={studio.email} />
                                <StudioInfoItem
                                    icon={LanguageIcon}
                                    text={studio.website}
                                />
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Card elevation={3}>
                            <CardContent>
                                <Box textAlign="center" mb={4}>
                                    <Typography variant="h2">Dancers</Typography>
                                </Box>
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
                                            {people.length > 0 ? (
                                                people.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(person => (
                                                    <TableRow key={person._id} onClick={() => handlePersonClick(person._id)} sx={{ cursor: 'pointer' }}>
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