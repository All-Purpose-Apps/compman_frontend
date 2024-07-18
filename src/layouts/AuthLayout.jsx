import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

export default function AuthLayout() {
    return (
        <Container fluid className="auth-layout">
            <Row className="justify-content-center align-items-center min-vh-100">
                <Col md={4}>
                    <Outlet />
                </Col>
            </Row>
        </Container>
    );
}