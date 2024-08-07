import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaBuilding, FaUsers, FaFire } from 'react-icons/fa';
import { app } from 'src/firebase';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { clearUser } from 'src/store/userSlice';
import { useDispatch } from 'react-redux';
import twoPeople from 'src/assets/images/two-people-ballroom-dancing.svg';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        const auth = getAuth(app);
        signOut(auth).then(() => {
            dispatch(clearUser());
            navigate('/auth/login');
        }).catch((error) => {
            console.log(error);
        });
    }


    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Item>
                    <div className="two-people-container">
                        <img src={twoPeople} alt="" className="two-people" />
                    </div>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/dashboard">
                        <FaHome className="icon" /> Dashboard
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/studios">
                        <FaBuilding className="icon" /> Studios
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/dancers">
                        <FaUsers className="icon" /> Dancers
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/couples">
                        <FaUser className="icon" /> Couples
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/heats">
                        <FaFire className="icon" /> Heats
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/admin/settings">
                        <FaCog className="icon" /> Settings
                    </Nav.Link>
                </Nav.Item>
                <Button variant="danger" onClick={() => handleLogout()} >Logout</Button>
                <Nav.Item className="sidebar-footer">
                    <p>&copy; 2024 All-Purpose Apps</p>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;