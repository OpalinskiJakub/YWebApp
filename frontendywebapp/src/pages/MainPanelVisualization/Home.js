import { Outlet, Link } from "react-router-dom"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import {Badge,Button,Dropdown,Form,Offcanvas} from "react-bootstrap";
import React, {Component} from "react";
import UserPanel from "../UserPanelVisualization/UserPanel";
import UnsecuredTokenStorageSystem from "../StorageSystem/TokenStorageSystem/UnsecuredTokenStorageSystem";
import UserService from "../Authorisation/UserAuthorisation/UserService";
import i18n from "i18next";

class Home extends Component{
    constructor() {
        super();
        this.tokenStorage = new UnsecuredTokenStorageSystem();
        this.state = {
            encodedSearchValue:'',
            searchValue:'',
            isAdmin:false
        }

        this.userService = UserService.getInstance();
    }

    async componentDidMount() {
        let response =await this.userService.checkIsAdmin();
        this.setState({
            isAdmin:response
        })
    }

    close = () => {
        this.tokenStorage.removeToken();
    }

    handleInputChange = (event) => {
        const {value} = event.target;
        let encodedValue = btoa(value);
        this.setState({
            encodedSearchValue:encodedValue,
            searchValue:value
        })
        console.log(encodedValue);
    };

    changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        localStorage.setItem('selectedLanguage', lng);
    };
    render() {
        return (
            <div data-bs-theme="dark" sticky="top">
                {[false].map((expand) => (
                    <Navbar key={expand} expand={expand} className="bg-body-tertiary" data-bs-theme="dark" sticky="top">
                        <Container fluid>
                            <Navbar.Brand href="/home">
                                <Badge variant="dark" style={{width:"50px", height:"37px"}}>
                                    <h4 style={{ color: "black", fontFamily: "sans-serif" }}>Y</h4>
                                </Badge>
                            </Navbar.Brand>
                            <div style={{width:"50%"}}>
                                <Form className="d-flex">
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="Enter your email"
                                        aria-label="Wyszukaj"
                                        name="searchValue"
                                        value={this.state.searchValue}
                                        onChange={this.handleInputChange}
                                    />
                                    <Button variant="outline-primary"
                                        href={`/home/search/${this.state.encodedSearchValue}`}
                                    >
                                        Search
                                    </Button>
                                </Form>
                            </div>
                            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                            <Navbar.Offcanvas
                                id={`offcanvasNavbar-expand-${expand}`}
                                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                                placement="end"
                                data-bs-theme="dark"
                            >
                                <Offcanvas.Header closeButton>
                                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                                        Panel użytkownika
                                    </Offcanvas.Title>
                                </Offcanvas.Header>
                                <Offcanvas.Body data-bs-theme="dark">
                                    <Nav className="justify-content-end flex-grow-1 pe-3" data-bs-theme="dark">
                                        <Nav.Link href="/home/UserPanel">Dane użytkownika</Nav.Link>
                                        <Nav.Link href="/home/postCreator">Stworz post</Nav.Link>
                                        <Nav.Link href="/home/userPosts">Twoje posty</Nav.Link>
                                        {this.state.isAdmin ?
                                            <Nav.Link href="/home/AdminPanel">Panel administratora</Nav.Link>
                                            : null}

                                        <Nav.Link href="/access" onClick={this.close}>Wyloguj sie</Nav.Link>
                                        <NavDropdown
                                            title="Wybierz język"
                                            id={`offcanvasNavbarDropdown-expand-${expand}`}
                                        >
                                            <NavDropdown.Item
                                            onClick={() => this.changeLanguage('en')}
                                            >
                                                Angielski
                                            </NavDropdown.Item>
                                            <NavDropdown.Item
                                                onClick={() => this.changeLanguage('pol')}
                                            >
                                                Polski
                                            </NavDropdown.Item>

                                        </NavDropdown>
                                    </Nav>

                                </Offcanvas.Body>
                            </Navbar.Offcanvas>
                        </Container>
                    </Navbar>

                ))}
                <Outlet />
            </div>
        );
    }


}

export default Home;


