import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudios, deleteStudio } from '../../store/studiosSlice';
import { Button, Table, Form, Pagination } from 'react-bootstrap';
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
        return <div>{error}</div>;
    }

    const handleEdit = id => {
        navigate(`/studios/${id}/edit`);
    };

    const handleDelete = id => {
        dispatch(deleteStudio(id));
        navigate('/studios');
    };

    const handleAddStudio = () => {
        navigate('/studios/new');
    };

    const handleGetStudio = id => {
        navigate(`/studios/${id}`);
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

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Button className="add-studio" onClick={handleAddStudio} variant="warning">
                Add Studio
            </Button>
            <Form.Group controlId="search" className="mb-3 search-input">
                <Form.Control
                    type="text"
                    placeholder="Search studios..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover className="view-studios">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Phone</th>
                        <th>Studio Type</th>
                        <th>Email</th>
                        <th>Website</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudios.length > 0 ? currentStudios.map(studio => (
                        <tr key={studio._id} style={{ cursor: 'pointer' }} onClick={() => handleGetStudio(studio._id)}>
                            <td>{studio.name}</td>
                            <td>{studio.location}</td>
                            <td>{formatPhoneNumber(studio.phone)}</td>
                            <td>{capitalize(studio.studioType)}</td>
                            <td>{studio.email}</td>
                            <td>{studio.website}</td>
                            <td>
                                <Button onClick={(e) => { e.stopPropagation(); handleEdit(studio._id); }}>Edit</Button>
                                <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(studio._id); }}>Delete</Button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" className="text-center">No studios available</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <Pagination className="justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
}