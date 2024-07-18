import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneDancer } from '../../store/dancersSlice'; // Create this action to fetch a single dancer
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Row, Card, Col, Table } from 'react-bootstrap';
import { FaUser, FaChild, FaIdBadge, FaBuilding } from 'react-icons/fa';
import { capitalize, capitalizeWords } from 'src/utils';

export default function ViewOneDancer() {
    const [dancer, setDancer] = useState({});

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        async function fetchDancer() {
            const response = await dispatch(getOneDancer(id));
            const dancer = response.payload[0]
            setDancer({
                fullName: capitalize(dancer.fullName),
                age: dancer.age,
                identifier: capitalizeWords(dancer.identifier, '/'),
                studio: dancer.studio
            });

        }
        fetchDancer();
    }, [dispatch, id]);
    const isLoading = useSelector(state => state.dancers.status) === 'loading';
    const error = useSelector(state => state.dancers.error);

    const handleStudioClick = (id) => {
        navigate(`/studios/${id}`);
    }

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="card-container">
            <Container className="mt-4">
                <Button className="mb-4" onClick={() => navigate('/dancers')} variant="secondary">
                    Back to Dancers
                </Button>
                <Row>
                    <Col md={6}>
                        <Card className="shadow-sm">
                            <Card.Body>
                                <Row>
                                    <Col md={12} className="text-center mb-4">
                                        <img src="https://i.pravatar.cc/100" alt={`${dancer.fullName}'s avatar`} style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12} className="text-center mb-4">
                                        <h1>{dancer.fullName}</h1>
                                    </Col>
                                </Row>
                                <Row className="mb-3 text-center">
                                    <Col md={11}>
                                        <Card.Text>{dancer.age} - {dancer.identifier}</Card.Text>
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
                                        <h2>Associated Studio</h2>
                                    </Col>
                                </Row>
                                {dancer.studio ? (
                                    <Table striped bordered hover>
                                        <tbody>
                                            <tr onClick={() => handleStudioClick(dancer.studio._id)} style={{ cursor: 'pointer' }}>
                                                <td>Name</td>
                                                <td>{dancer.studio.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Location</td>
                                                <td>{dancer.studio.location}</td>
                                            </tr>
                                            <tr>
                                                <td>Phone</td>
                                                <td>{dancer.studio.phone}</td>
                                            </tr>
                                            <tr>
                                                <td>Studio Type</td>
                                                <td>{dancer.studio.studioType}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{dancer.studio.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Website</td>
                                                <td>
                                                    <a href={dancer.studio.website} target="_blank" rel="noopener noreferrer">
                                                        {dancer.studio.website}
                                                    </a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                ) : (
                                    <div>No studio associated</div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Button className="mt-4" onClick={() => navigate(`/dancers/${id}/edit`)} variant="primary">Edit Dancer</Button>
            </Container>
        </div>
    );
}