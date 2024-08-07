import { fetchDances } from 'src/store/dancesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Row, Col, Button, ListGroup, Tab } from 'react-bootstrap';
import { useEffect } from 'react';

export default function Settings() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchDances());
    }
        , [dispatch]);

    const user = useSelector((state) => state.user.user);
    const dances = useSelector((state) => state.dances.dances);
    return (
        <div className="dashboard">
            <Row className="mb-4">
                <Col>
                    <Card>
                        <Card.Body>
                            <Card.Title>User</Card.Title>
                            <Card.Text style={{ fontSize: '24px' }}>{user?.email}</Card.Text>
                            <Card.Text><Button>Change Password</Button> <Button>Report/Request Feature</Button></Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card style={{ padding: '10px' }}>
                        <Card.Title>Dances Currently in System</Card.Title>
                        <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
                            <Row>
                                <Col sm={4}>
                                    <ListGroup>
                                        <ListGroup.Item action href="#link1">American Smooth</ListGroup.Item>
                                        <ListGroup.Item action href="#link2">American Rhythm</ListGroup.Item>
                                        <ListGroup.Item action href="#link3">Specialty</ListGroup.Item>
                                        <ListGroup.Item action href="#link4">International Ballroom</ListGroup.Item>
                                        <ListGroup.Item action href="#link5">International Latin</ListGroup.Item>
                                        <ListGroup.Item action href="#link6">Country Western</ListGroup.Item>
                                    </ListGroup>
                                </Col>
                                <Col sm={8}>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="#link1">{dances.filter(dance => dance.danceCategory.name === 'American Smooth').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                        <Tab.Pane eventKey="#link2">{dances.filter(dance => dance.danceCategory.name === 'American Rhythm').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                        <Tab.Pane eventKey="#link3">{dances.filter(dance => dance.danceCategory.name === 'Specialty').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                        <Tab.Pane eventKey="#link4">{dances.filter(dance => dance.danceCategory.name === 'International Ballroom').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                        <Tab.Pane eventKey="#link5">{dances.filter(dance => dance.danceCategory.name === 'International Latin').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                        <Tab.Pane eventKey="#link6">{dances.filter(dance => dance.danceCategory.name === 'Country Western').map(dance => <div key={dance._id}>{dance.title}</div>)}</Tab.Pane>
                                    </Tab.Content>
                                </Col>
                            </Row>
                        </Tab.Container>
                    </Card>
                </Col>
            </Row>
        </div >
    )
}
