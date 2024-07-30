import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers, deleteDancer } from '../../store/dancersSlice';
import { Button, Table, Form, Pagination } from 'react-bootstrap';
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
    const [itemsPerPage] = useState(10);

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

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Button className="add-dancer" onClick={handleAddDancer} variant="warning">
                Add Dancer
            </Button>
            <Form.Group controlId="search" className="mb-3 search-input">
                <Form.Control
                    type="text"
                    placeholder="Search dancers..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover className="view-dancers">
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Age</th>
                        <th>Identifier</th>
                        <th>Studio</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentDancers.length > 0 ? currentDancers.map(dancer => (
                        <tr key={dancer._id} style={{ cursor: 'pointer' }} onClick={() => handleGetDancer(dancer._id)}>
                            <td>
                                <img src="https://i.pravatar.cc/50" alt={`${dancer.fullName}'s avatar`} style={{ width: '50px', height: '50px', borderRadius: '50%', margin: '10px' }} />{dancer.fullName}</td>
                            <td>{dancer.age}</td>
                            <td>{capitalizeWords(dancer.identifier, "/")}</td>
                            <td onClick={(e) => { e.stopPropagation(); handleStudioClick(dancer.studio._id); }}>{dancer.studio.name}</td>
                            <td>
                                <Button onClick={(e) => { e.stopPropagation(); handleEdit(dancer._id); }}>Edit</Button>
                                <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(dancer._id); }}>Delete</Button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="5" className="text-center">No dancers available</td>
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