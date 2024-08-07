import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers, deleteDancer } from '../../store/dancersSlice';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Pagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { capitalizeWords } from '../../utils';

export default function ViewDancers() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dancers = useSelector(state => state.dancers.dancers);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    useEffect(() => {
        dispatch(fetchDancers());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error} <Button onClick={(e) => location.reload()}>Go Back</Button></div>;
    }

    const handleEdit = id => {
        navigate(`/admin/dancers/edit/${id}`);
    };

    const handleDelete = id => {
        dispatch(deleteDancer(id));
        navigate('/admin/dancers');
    };

    const handleAddDancer = () => {
        navigate('/admin/dancers/new');
    };

    const handleGetDancer = id => {
        navigate(`/admin/dancers/${id}`);
    };

    const handleStudioClick = id => {
        navigate(`/admin/studios/${id}`);
    };

    const handleSearch = event => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    // Filter and paginate the dancers
    const filteredDancers = dancers.filter(dancer =>
        dancer.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dancer.identifier.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dancer.studio.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDancers = filteredDancers.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredDancers.length / itemsPerPage);

    const paginate = (event, pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <Button variant="contained" color="warning" onClick={handleAddDancer} sx={{ mb: 2 }} className="add-dancer">
                Add Dancer
            </Button>
            <TextField
                id="search"
                label="Search dancers..."
                variant="outlined"
                value={searchTerm}
                onChange={handleSearch}
                sx={{ ml: 2, mb: 2, width: 250 }}
            />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Full Name</TableCell>
                            <TableCell>Age</TableCell>
                            <TableCell>Identifier</TableCell>
                            <TableCell>Studio</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentDancers.length > 0 ? currentDancers.map(dancer => (
                            <TableRow key={dancer._id} onClick={() => handleGetDancer(dancer._id)} sx={{ cursor: 'pointer' }}>
                                <TableCell>{dancer.fullName}</TableCell>
                                <TableCell>{dancer.age}</TableCell>
                                <TableCell>{capitalizeWords(dancer.identifier, "/")}</TableCell>
                                <TableCell onClick={(e) => { e.stopPropagation(); handleStudioClick(dancer.studio._id); }}>
                                    {dancer.studio.name}
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={(e) => { e.stopPropagation(); handleEdit(dancer._id); }} sx={{ mr: 1 }}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" onClick={(e) => { e.stopPropagation(); handleDelete(dancer._id); }}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan="5" align="center">No dancers available</TableCell>
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
        </div>
    );
}