import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneDancer } from '../../store/dancersSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { capitalize, capitalizeWords, formatPhoneNumber } from 'src/utils';

export default function ViewOneDancer() {
    const [dancer, setDancer] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    const isLoading = useSelector((state) => state.dancers.status) === 'loading';
    const error = useSelector((state) => state.dancers.error);

    useEffect(() => {
        const fetchDancer = async () => {
            const response = await dispatch(getOneDancer(id));
            const dancerData = response.payload[0];
            if (dancerData) {
                setDancer({
                    number: dancerData.number,
                    fullName: capitalize(dancerData.fullName),
                    age: dancerData.age,
                    identifier: capitalizeWords(dancerData.identifier, '/'),
                    studio: dancerData.studio,
                });
            }
        };

        fetchDancer();
    }, [dispatch, id]);

    const handleStudioClick = (studioId) => {
        navigate(`/admin/studios/${studioId}`);
    };

    if (isLoading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>Error: {error}</Typography>;

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
            <Button
                variant="contained"
                color="secondary"
                onClick={() => navigate(`/admin/dancers/edit/${id}`)}
                sx={{ mb: 4, ml: 4 }}
            >
                Edit Dancer
            </Button>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h2" align="center" gutterBottom>
                                # {dancer.number}
                            </Typography>
                            <Typography variant="h1" align="center" gutterBottom>
                                {dancer.fullName}
                            </Typography>
                            <Typography variant="h3" align="center">
                                {dancer.age} - {dancer.identifier}
                            </Typography>
                        </CardContent>
                    </Card>

                    <Card sx={{ boxShadow: 3, mt: 4 }}>
                        <CardContent>
                            <Typography variant="h3" align="center" gutterBottom>
                                Purchases and Payments
                            </Typography>
                            <Typography variant="h5" align="center">
                                Financial details will be displayed here.
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Card sx={{ boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h2" align="center" gutterBottom>
                                Associated Studio
                            </Typography>
                            {dancer.studio ? (
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow
                                                hover
                                                onClick={() => handleStudioClick(dancer.studio._id)}
                                                sx={{ cursor: 'pointer' }}
                                            >
                                                <TableCell>Name</TableCell>
                                                <TableCell>{dancer.studio.name}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Location</TableCell>
                                                <TableCell>{dancer.studio.location}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Phone</TableCell>
                                                <TableCell>{formatPhoneNumber(dancer.studio.phone)}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell>Email</TableCell>
                                                <TableCell>{dancer.studio.email}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell >Website</TableCell>
                                                <TableCell>
                                                    {dancer.studio.website}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            ) : (
                                <Typography align="center">No studio associated</Typography>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container >
    );
}