import React, {useRef, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loggedIn from './context/loggedInCtx';
import usersname from './context/usersnameCtx';

export default function BadgerLogin() {

    const uname = useRef();

    const pass = useRef();

    const navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useContext(loggedIn);
    const [myname, setMyName] = useContext(usersname)

    function BreakSignal() {}

    const createUser = () => {
        const username=uname.current.value;
        const password=pass.current.value;
        if (!username || !password) {
            alert("You must provide both a username and password!")
        }
        else {
            fetch("https://www.cs571.org/s23/hw6/api/login/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
            })
        }).then(res => {
            if (res.status === 401) {
                alert("Incorrect password!");
                // adapted from https://stackoverflow.com/questions/28803287/how-to-break-promise-chain
                throw new BreakSignal();
            } else if (res.status===404) {
                alert("Incorrect username!");
                throw new BreakSignal();
            } else if (res.status===200) {
                return res.json();
            }
            throw new BreakSignal();
        }).then(json => {
            alert(json.msg);
            navigate("/");
            setIsLoggedIn(true);
            setMyName(username)
        }).catch(BreakSignal, function () {})
        }
    }

    return <>
        <h1>Login</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
            id="username"
            ref={uname}
        />
        <Form.Label htmlFor="password">Password</Form.Label>
        <Form.Control
            id="password"
            type="password"
            ref={pass}
        />
        <br />
        <Button onClick={createUser}>Login</Button>
    </>
}