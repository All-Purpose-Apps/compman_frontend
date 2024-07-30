import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCouple } from 'src/store/couplesSlice'; // Assuming you have a couplesSlice with getOneCouple action
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Card, Col } from 'react-bootstrap';
import { FaUser, FaChild, FaIdBadge } from 'react-icons/fa';
import { capitalize, capitalizeWords } from 'src/utils';

export default function ViewOneCouple() {
    const [couple, setCouple] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchCouple() {
            const response = await dispatch(getOneCouple(id));
            const couple = response.payload[0];
            setCouple({
                leader: couple.leader,
                follower: couple.follower,
                dance: couple.dance,
                ageCategory: capitalizeWords(couple.ageCategory),
                level: capitalizeWords(couple.level),
            });
        }
        fetchCouple();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.couples.status) === 'loading';
    const error = useSelector(state => state.couples.error);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!couple) {
        return null; // Or you can return a loading indicator here
    }

    return (
        <div className="card-container">
            <Container className="mt-4">
                <Button className="mb-4" onClick={() => navigate('/admin/couples')} variant="secondary">
                    Back to Couples
                </Button>
                <Row>
                    <Col md={10}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Row>
                                    <Col md={12} className="text-center mb-4">
                                        <h1>{`${couple.leader.fullName} & ${couple.follower.fullName}`}</h1>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaUser size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>Leader: {capitalize(couple.leader.fullName)}</Card.Text>
                                        <Card.Text>Follower: {capitalize(couple.follower.fullName)}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaChild size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>Age Category: {couple.ageCategory}</Card.Text>
                                        <Card.Text>Level: {couple.level}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaIdBadge size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>Dance: {couple.dance.title} - {couple.dance.danceCategory.name}</Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button className="mt-4" onClick={() => navigate(`/admin/couples/edit/${id}`)} variant="primary">Edit Couple</Button>
            </Container>
        </div>
    );
}