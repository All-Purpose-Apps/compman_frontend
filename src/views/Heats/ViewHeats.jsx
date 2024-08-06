import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHeats, deleteHeat } from 'src/store/heatsSlice';
import { Table, Container, Row, Col, Button, Spinner, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

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
    console.log(currentHeats)
    const totalPages = Math.ceil(filteredHeats.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <Container className="text-center">
                <Spinner animation="border" />
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="text-center">
                <p>{error}</p>
            </Container>
        );
    }

    if (heats.length === 0) {
        return (
            <Container className="text-center">
                <Button className="add-heat mb-3" onClick={handleAddHeat} variant="warning">
                    Add Heat
                </Button>
                <p>No Heats</p>
            </Container>
        );
    }


    return (
        <Container>
            <Button className="add-heat mb-3" onClick={handleAddHeat} variant="warning">
                Add Heat
            </Button>
            <Form.Group controlId="search" className="mb-3 search-input">
                <Form.Control
                    type="text"
                    placeholder="Search heats..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </Form.Group>

            <Row>
                <Col>
                    <Table striped bordered hover responsive className='view-heats'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date/Time</th>
                                <th>Dance</th>
                                <th>Couples</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentHeats.map((heat, index) => (
                                <tr key={heat._id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(heat.dateTime).toLocaleString()}</td>
                                    <td>{heat.couples[0].dance.danceCategory.name} - {heat.couples[0].dance.title} </td>
                                    <td>
                                        {heat.couples.map(({ follower, leader }, i) => (
                                            <div key={i}>
                                                {follower.fullName} & {leader.fullName}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <Button onClick={(e) => { e.stopPropagation(); handleEdit(heat._id); }}>Edit</Button>
                                        <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(heat._id); }}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Pagination className="justify-content-center">
                {Array.from({ length: totalPages }, (_, index) => (
                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </Container>
    );
};

export default ViewHeats;
