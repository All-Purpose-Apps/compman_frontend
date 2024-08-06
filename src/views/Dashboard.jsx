import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDancers } from 'src/store/dancersSlice';
import { fetchStudios } from 'src/store/studiosSlice';
import { fetchHeats } from 'src/store/heatsSlice';
import { Card, Row, Col, Button } from 'react-bootstrap';
import MainCalendar from 'src/components/MainCalendar'

export default function Dashboard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const dancers = useSelector(state => state.dancers.dancers);
    const studios = useSelector(state => state.studios.studios);
    const heats = useSelector(state => state.heats.heats);

    useEffect(() => {
        dispatch(fetchDancers());
        dispatch(fetchStudios());
        dispatch(fetchHeats());
    }, [dispatch]);

    const handleClick = () => {
        navigate('/admin/dancers/new');
    }

    return (
        <div className="dashboard">
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Dancers</Card.Title>
                            <Card.Text>{dancers.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Studios</Card.Title>
                            <Card.Text>{studios.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Total Heats</Card.Title>
                            <Card.Text>{heats.length}</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>Calendar</Card.Title>
                            <MainCalendar />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}
