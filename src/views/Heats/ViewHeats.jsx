import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeats, deleteHeat } from 'src/store/heatsSlice';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Container, Grid, Button, CircularProgress, TextField, Pagination
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from 'src/utils';

const ViewHeats = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const heats = useSelector(state => state.heats.heats);
    const loading = useSelector(state => state.heats.status) === 'loading';
    const error = useSelector(state => state.heats.error);

    useEffect(() => {
        dispatch(fetchHeats());
    }, [dispatch]);

    const handleAddHeat = () => {
        navigate('/admin/heats/new');
    };

    const handleGenerateHeat = () => {
        navigate('/admin/heats/generate');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const handleDelete = (id) => {
        dispatch(deleteHeat(id));
        dispatch(fetchHeats());
        navigate('/admin/heats');
    }

    const filteredHeats = heats.filter(heat => {
        const couplesString = heat.couples.map(couple =>
            `${couple.follower.fullName} & ${couple.leader.fullName}`).join(' ');
        return couplesString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHeats = filteredHeats.slice(indexOfFirstItem, indexOfLastItem).sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    const totalPages = Math.ceil(filteredHeats.length / itemsPerPage);

    const paginate = (event, value) => setCurrentPage(value);

    if (loading) {
        return (
            <Container sx={{ textAlign: 'center' }}>
                <CircularProgress />
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ textAlign: 'center' }}>
                <p>{error}</p>
            </Container>
        );
    }

    if (heats.length === 0) {
        return (
            <Container sx={{ textAlign: 'center' }}>
                <Button variant="contained" color="warning" onClick={handleGenerateHeat} sx={{ mb: 3 }}>
                    Generate Heats
                </Button>
                <p>No Heats</p>
            </Container>
        );
    }

    return (
        <Container>
            <Button variant="contained" color="warning" onClick={handleAddHeat} sx={{ mb: 3 }}>
                Add Heat
            </Button>
            <TextField
                id="search"
                label="Search heats..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                fullWidth
                sx={{ mb: 3 }}
            />
            <Grid container>
                <Grid item xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Date/Time</TableCell>
                                    <TableCell>Dance</TableCell>
                                    <TableCell>Age Category</TableCell>
                                    <TableCell>Level</TableCell>
                                    <TableCell>Couples</TableCell>
                                    <TableCell>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {currentHeats.map((heat, index) => (
                                    <TableRow key={heat._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{new Date(heat.dateTime).toLocaleString()}</TableCell>
                                        <TableCell>{`${heat.couples[0].dance.danceCategory.name} - ${heat.couples[0].dance.title}`}</TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>{capitalizeWords(heat.couples[0].ageCategory)}</TableCell>
                                        <TableCell>{capitalizeWords(heat.couples[0].level)}</TableCell>
                                        <TableCell>
                                            {heat.couples.map(({ follower, leader }, i) => (
                                                <div key={i}>
                                                    {follower.fullName} & {leader.fullName}
                                                </div>
                                            ))}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={(e) => { e.stopPropagation(); handleEdit(heat._id); }}
                                                sx={{ mr: 1 }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={(e) => { e.stopPropagation(); handleDelete(heat._id); }}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={paginate}
                sx={{ mt: 3, justifyContent: 'center', display: 'flex' }}
            />
        </Container>
    );
};

export default ViewHeats;