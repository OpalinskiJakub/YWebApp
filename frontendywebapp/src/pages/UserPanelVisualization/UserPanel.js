import React, { Component } from "react";
import { Card, Nav } from "react-bootstrap";
import {Link, Outlet} from "react-router-dom";

class UserPanel extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: "/UserPanel",
        };
    }

    handleTabChange = (selectedTab) => {
        this.setState({ activeTab: selectedTab });
    };

    render() {
        const { activeTab } = this.state;

        return (
            <Card className="mx-auto" style={{ width: "80%", margin: "10px" }}>
                <Card.Header>
                    <Nav variant="tabs" activeKey={activeTab}>
                        <Nav.Item>
                            <Link
                                to="/UserPanel"
                                className="nav-link"
                                onClick={() => this.handleTabChange("/UserPanel")}
                            >
                                Twoje Dane
                            </Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link
                                to="/UserPanel/UserDataEditPanel"
                                className="nav-link"
                                onClick={() => this.handleTabChange("/UserPanel/UserDataEditPanel")}
                            >
                                Zmień dane
                            </Link>
                        </Nav.Item>
                    </Nav>
                </Card.Header>
                <Card.Body>
                    <Outlet/>
                </Card.Body>
            </Card>
        );
    }
}

export default UserPanel;