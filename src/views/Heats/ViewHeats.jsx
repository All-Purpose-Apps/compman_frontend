import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, Container, Row, Col, Button, Spinner } from 'react-bootstrap';

const ViewHeats = () => {
    const [heats, setHeats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
            <Row className="my-4">
                <Col>
                    <h2>Heats</h2>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Table striped bordered hover responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Date/Time</th>
                                <th>Couples</th>
                            </tr>
                        </thead>
                        <tbody>
                            {heats.map((heat, index) => (
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
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default ViewHeats;