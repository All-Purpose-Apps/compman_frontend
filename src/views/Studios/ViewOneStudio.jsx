import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneStudio } from 'src/store/studiosSlice';
import { setLocation } from 'src/store/locationSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Card, Col, Table } from 'react-bootstrap';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaBuilding } from 'react-icons/fa';
import { capitalize, formatPhoneNumber, capitalizeWords } from 'src/utils';

export default function ViewOneStudio() {
    const [studio, setStudio] = useState({});
    const [people, setPeople] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchStudio() {
            const response = await dispatch(getOneStudio(id));
            setPeople(response.payload.people)
            setStudio({
                name: capitalize(response.payload[0].name),
                location: capitalize(response.payload[0].location),
                phone: formatPhoneNumber(response.payload[0].phone),
                studioType: capitalize(response.payload[0].studioType),
                email: response.payload[0].email,
                website: response.payload[0].website
            });
        }
        fetchStudio();
    }, [dispatch, id]);

    const isLoading = useSelector(state => state.studios.status) === 'loading';
    const error = useSelector(state => state.studios.error);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handlePersonClick = (id) => {
        navigate(`/admin/dancers/${id}`);
    }

    return (
        <div className="card-container">
            <Container className="mt-4">
                <Button className="mb-4" onClick={() => navigate('/admin/studios')} variant="secondary">
                    Back to Studios
                </Button>
                <Row>
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Row>
                                    <Col md={12} className="text-center mb-4">
                                        <h1>{studio.name}</h1>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaMapMarkerAlt size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>{studio.location}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaPhone size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>{studio.phone}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaBuilding size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>{studio.studioType}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaEnvelope size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>{studio.email}</Card.Text>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col md={1} className="d-flex align-items-center justify-content-center">
                                        <FaGlobe size={20} />
                                    </Col>
                                    <Col md={11}>
                                        <Card.Text>
                                            <a href={studio.website} target="_blank" rel="noopener noreferrer">
                                                {studio.website}
                                            </a>
                                        </Card.Text>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Row>
                                    <Col md={12} className="text-center mb-4">
                                        <h2>Dancers</h2>
                                    </Col>
                                    <Col>
                                        <Button className="mb-4 float-end" onClick={() => navigate('/dancers/new')} variant="primary">
                                            Add Dancer
                                        </Button>
                                    </Col>
                                </Row>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Full Name</th>
                                            <th>Age</th>
                                            <th>Identifier</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {people && people.length > 0 ? (
                                            people.map(person => (
                                                <tr key={person._id} onClick={() => handlePersonClick(person._id)} style={{ cursor: 'pointer' }}>
                                                    <td>{capitalize(person.fullName)}</td>
                                                    <td>{person.age}</td>
                                                    <td>{capitalizeWords(person.identifier, "/")}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3" className="text-center">No people found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button className="mt-4" onClick={() => navigate(`/studios/${id}/edit`)} variant="primary">Edit Studio</Button>
            </Container>
        </div>
    );
}