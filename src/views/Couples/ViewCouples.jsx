import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCouples, deleteCouple } from '../../store/couplesSlice'; // Assuming you have a couplesSlice
import { Button, Table, Form, Pagination } from 'react-bootstrap';
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
    const [itemsPerPage] = useState(10);

    useEffect(() => {
        dispatch(fetchCouples());
    }, [dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleEdit = id => {
        navigate(`/couples/${id}/edit`);
    };

    const handleDelete = id => {
        dispatch(deleteCouple(id));
        navigate('/couples');
    };

    const handleAddCouple = () => {
        navigate('/couples/new');
    };

    const handleGetCouple = id => {
        navigate(`/couples/${id}`);
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

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div>
            <Button className="add-couple float-end" onClick={handleAddCouple} variant="warning">
                Add Couple
            </Button>
            <Form.Group controlId="search" className="mb-3 search-input">
                <Form.Control
                    type="text"
                    placeholder="Search couples..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>
            <Table striped bordered hover className="view-couples">
                <thead>
                    <tr>
                        <th>Leader</th>
                        <th>Follower</th>
                        <th>Dance</th>
                        <th>Age Category</th>
                        <th>Level</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentCouples.length > 0 ? currentCouples.map(couple => (
                        <tr key={couple._id} style={{ cursor: 'pointer' }} onClick={() => handleGetCouple(couple._id)}>
                            <td>{couple.leader.fullName}</td>
                            <td>{couple.follower.fullName}</td>
                            <td>{couple.dance.title} - {couple.dance.danceCategory.name}</td>
                            <td>{capitalizeWords(couple.ageCategory)}</td>
                            <td>{capitalizeWords(couple.level)}</td>
                            <td>
                                <Button onClick={(e) => { e.stopPropagation(); handleEdit(couple._id); }}>Edit</Button>
                                <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(couple._id); }}>Delete</Button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="6" className="text-center">No couples available</td>
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