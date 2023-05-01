import React from "react"
import { Button } from "react-bootstrap";

function BadgerMessage(props) {

    const dt = new Date(props.created);

    return <>
        <h2>{props.title}</h2>
        <sub>Posted on {dt.toLocaleDateString()} at {dt.toLocaleTimeString()}</sub>
        <br/><br/>
        <i>{props.poster}</i>
        <p>{props.content}</p>
        {props.showDelete && <Button variant="danger" onClick={() => props.deletePost(props.id)}>Delete</Button>}
    </>
}

export default BadgerMessage;