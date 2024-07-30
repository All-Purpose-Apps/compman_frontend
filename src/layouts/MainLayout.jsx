import { Outlet } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <Container fluid>
      <Row>
        <Col className='sidebar-container' md={2}>
          <Sidebar />
        </Col>
        <Col className='main-container'>
          <Row className='header-container'>
            <Header />
          </Row>
          <Row id="content">
            <Outlet />
          </Row>
        </Col>
      </Row>
    </Container>
  );
}