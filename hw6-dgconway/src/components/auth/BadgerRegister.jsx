import React, {useState, useContext} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import loggedIn from './context/loggedInCtx';

export default function BadgerRegister() {

    const [username, setUsername] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");

    const [myName, setMyName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useContext(loggedIn);

    // adapted from https://www.geeksforgeeks.org/reactjs-usenavigate-hook/
    const navigate = useNavigate();

    // Is this a hacky solution? Yes, it is. Thank you for asking.
    function BreakSignal() {}

    const createUser = () => {
        if (!username || !password1) {
            alert("You must provide both a username and password!")
        }
        else if (password1!==password2) {
            alert("Your passwords do not match!")
        } else {
            fetch("https://www.cs571.org/s23/hw6/api/register/", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
            },
            body: JSON.stringify({
                "username": username,
                "password": password1,
            })
        }).then(res => {
            if (res.status === 409) {
                alert("That username has already been taken!");
                // adapted from https://stackoverflow.com/questions/28803287/how-to-break-promise-chain
                throw new BreakSignal();
            } else if (res.status===200) {
                setIsLoggedIn(true);
                setMyName(username);
                return res.json();
            }
            throw new BreakSignal();
        }).then(json => {
            alert(json.msg);
            navigate("/");
        }).catch(BreakSignal, function () {})
        }
    }

    return <>
        <h1>Register</h1>
        <Form.Label htmlFor="username">Username</Form.Label>
        <Form.Control
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Label htmlFor="password1">Password</Form.Label>
        <Form.Control
            id="password1"
            value={password1}
            type="password"
            onChange={(e) => setPassword1(e.target.value)}
        />
        <Form.Label htmlFor="password2">Re-enter Password</Form.Label>
        <Form.Control
            id="password2"
            value={password2}
            type="password"
            onChange={(e) => setPassword2(e.target.value)}
        />
        <br />
        <Button onClick={createUser}>Register</Button>

    </>
}