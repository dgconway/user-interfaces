import React, {useContext} from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import loggedIn from "../auth/context/loggedInCtx";

import crest from '../../assets/uw-crest.svg'

function BadgerLayout(props) {
    const [isLoggedIn, setIsLoggedIn] = useContext(loggedIn);
    return (
        <div>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img
                            alt="BadgerChat Logo"
                            src={crest}
                            width="30"
                            height="30"
                            className="d-inline-block align-top"
                        />{' '}
                        BadgerChat
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        {!isLoggedIn && <Nav.Link as={Link} to="login">Login</Nav.Link>}
                        {isLoggedIn && <Nav.Link as={Link} to="logout">Logout</Nav.Link>}
                        {!isLoggedIn && <Nav.Link as={Link} to="register">Register</Nav.Link>}
                        <NavDropdown title="Chatrooms">
                            {
                                props.chatrooms.map((chatroom) => {
                                    // adapted from https://stackoverflow.com/questions/57954964/onselect-on-navdropdown-item-in-react-js
                                    return <NavDropdown.Item key={chatroom} to={`chatrooms/${chatroom}`} as={Link}>{chatroom}</NavDropdown.Item>
                                })
                            }
                        </NavDropdown>

                    </Nav>
                </Container>
            </Navbar>
            <div className="body-spacer">
                <Outlet />
            </div>
        </div>
    );
}

export default BadgerLayout;