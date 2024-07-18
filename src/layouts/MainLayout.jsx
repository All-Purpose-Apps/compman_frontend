import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { capitalize } from '../utils';

export default function MainLayout({ children }) {
  return (
    <Container fluid>
      <Row>
        <Col md={2} className='sidebar-container'>
          <Sidebar />
        </Col>
        <Col className='main-container'>
          <Row className='header-container'>
            <Header />
          </Row>
          <Row id="content">
            {children}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}