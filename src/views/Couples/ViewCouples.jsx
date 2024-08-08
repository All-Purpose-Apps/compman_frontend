import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples, deleteCouple } from '../../store/couplesSlice'; // Assuming you have a couplesSlice
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../../utils';

export default function ViewCouples() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const couples = useSelector(state => state.couples.couples);
    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const error = useSelector(state => state.couples.error);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(9);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ mt: 4 }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    const handleEdit = id => {
        navigate(`/admin/couples/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteCouple(id));
        navigate('/admin/couples');
    };

    const handleAddCouple = () => {
        navigate('/admin/couples/new');
    };

    const handleGetCouple = id => {
        navigate(`/admin/couples/${id}`);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // Filter and paginate the couples
    const filteredCouples = couples.filter(couple =>
        couple.leader.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        couple.follower.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCouples = filteredCouples.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredCouples.length / itemsPerPage);

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    return (
        <Box>
            <Button
                variant="contained"
                color="warning"
                onClick={handleAddCouple}
                sx={{ float: 'right', mb: 2 }}
            >
                Add Couple
            </Button>
            <TextField
                id="search"
                label="Search couples..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow className="text-center">
                            <TableCell>Leader</TableCell>
                            <TableCell>Follower</TableCell>
                            <TableCell>Dance</TableCell>
                            <TableCell>Age Category</TableCell>
                            <TableCell>Level</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentCouples.length > 0 ? currentCouples.map(couple => (
                            <TableRow key={couple._id} sx={{ cursor: 'pointer' }} onClick={() => handleGetCouple(couple._id)} className="align-middle">
                                <TableCell>{couple.leader.fullName}</TableCell>
                                <TableCell>{couple.follower.fullName}</TableCell>
                                <TableCell>{couple.dance.title} - {couple.dance.danceCategory.name}</TableCell>
                                <TableCell className="text-center">{capitalizeWords(couple.ageCategory)}</TableCell>
                                <TableCell>{capitalizeWords(couple.level)}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => { e.stopPropagation(); handleEdit(couple._id); }}>Edit</Button>
                                    <Button variant="contained" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(couple._id); }} sx={{ ml: 1 }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan="6" align="center">No couples available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={paginate}
                sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}
            />
        </Box>
    );
}