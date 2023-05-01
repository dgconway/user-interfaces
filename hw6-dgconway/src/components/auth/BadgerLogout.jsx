import React, { useEffect, useContext } from 'react';
import loggedIn from './context/loggedInCtx';
import usersname from './context/usersnameCtx';

export default function BadgerLogout() {

    const [isLoggedIn, setIsLoggedIn] = useContext(loggedIn);
    const [myName, setMyName] = useContext(usersname)

    useEffect(() => {
        fetch('https://cs571.org/s23/hw6/api/logout', {
            method: 'POST',
            headers: {
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85"
            },
            credentials: "include"
        }).then(res => res.json()).then(json => {
            setIsLoggedIn(false);
            setMyName("");
        })
    }, []);

    return <>
        <h1>Logout</h1>
        <p>You have been successfully logged out.</p>
    </>
}