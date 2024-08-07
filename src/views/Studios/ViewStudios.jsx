import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios, deleteStudio } from '../../store/studiosSlice';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination, Container } from '@mui/material';
import { formatPhoneNumber, capitalize } from '../../utils';
import { useNavigate } from 'react-router-dom';

export default function ViewStudios() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const studios = useSelector(state => state.studios.studios);
    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchStudios());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error} <Button onClick={(e) => location.reload()}>Go Back</Button></div>;
    }

    const handleEdit = id => {
        navigate(`/admin/studios/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteStudio(id));
        navigate('/admin/studios');
    };

    const handleAddStudio = () => {
        navigate('/admin/studios/new');
    };

    const handleGetStudio = id => {
        navigate(`/admin/studios/${id}`);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // Filter and paginate the studios
    const filteredStudios = studios.filter(studio =>
        studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studio.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        studio.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentStudios = filteredStudios.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredStudios.length / itemsPerPage);

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <Button variant="contained" color="warning" onClick={handleAddStudio}>
                Add Studio
            </Button>
            <TextField
                id="search"
                label="Search studios..."
                variant="outlined"
                fullWidth
                margin="normal"
                value={searchTerm}
                onChange={handleSearch}
            />
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell >Phone</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Website</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentStudios.length > 0 ? currentStudios.map(studio => (
                            <TableRow key={studio._id} style={{ cursor: 'pointer' }} onClick={() => handleGetStudio(studio._id)}>
                                <TableCell>{studio.name}</TableCell>
                                <TableCell>{studio.location}</TableCell>
                                <TableCell sx={{ minWidth: '150px' }}>{formatPhoneNumber(studio.phone)}</TableCell>
                                <TableCell>{studio.email}</TableCell>
                                <TableCell>{studio.website}</TableCell>
                                <TableCell>
                                    <Button variant="outlined" onClick={(e) => { e.stopPropagation(); handleEdit(studio._id); }} sx={{ marginBottom: '10px' }}>Edit</Button>
                                    <Button variant="outlined" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(studio._id); }}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center">No studios available</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={paginate}
                color="primary"
                className="justify-content-center"
                style={{ marginTop: '20px' }}
            />
        </Container>
    );
}