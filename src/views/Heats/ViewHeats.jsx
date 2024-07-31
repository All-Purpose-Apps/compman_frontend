import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button, Spinner, Form, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ViewHeats = () => {
    const [heats, setHeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchHeats = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api_v1/heats');
                setHeats(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchHeats();
    }, []);

    const handleAddHeat = () => {
        navigate('/admin/heats/new');
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const filteredHeats = heats.filter(heat => {
        const couplesString = heat.couples.map(couple =>
            `${couple.follower.fullName} & ${couple.leader.fullName}`).join(' ');
        return couplesString.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHeats = filteredHeats.slice(indexOfFirstItem, indexOfLastItem);
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
                                <th>Couples</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentHeats.map((heat, index) => (
                                <tr key={heat._id}>
                                    <td>{index + 1}</td>
                                    <td>{new Date(heat.dateTime).toLocaleString()}</td>
                                    <td>
                                        {heat.couples.map(({ follower, leader }, i) => (
                                            <div key={i}>
                                                {follower.fullName} & {leader.fullName}
                                            </div>
                                        ))}
                                    </td>
                                    <td>
                                        <Button onClick={(e) => { e.stopPropagation(); handleEdit(dancer._id); }}>Edit</Button>
                                        <Button variant="danger" onClick={(e) => { e.stopPropagation(); handleDelete(dancer._id); }}>Delete</Button>
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
