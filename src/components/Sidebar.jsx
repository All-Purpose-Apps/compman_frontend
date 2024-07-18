import React from 'react';
import { Nav } from 'react-bootstrap';
import { FaHome, FaUser, FaCog, FaBuilding, FaUsers } from 'react-icons/fa';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <Nav className="flex-column">
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
            </Nav>
        </div>
    );
};

export default Sidebar;