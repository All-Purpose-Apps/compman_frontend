import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaBuilding, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
                <Nav.Item>
                    <Nav.Link href="/">
                        <FaHome className="icon" /> Dashboard
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/studios">
                        <FaBuilding className="icon" /> Studios
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/dancers">
                        <FaUsers className="icon" /> Dancers
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/couples">
                        <FaUser className="icon" /> Couples
                    </Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    );
};

export default Sidebar;