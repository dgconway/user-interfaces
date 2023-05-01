import React, {useState} from "react";
import { Form, Button } from "react-bootstrap";

function CreatePost(props) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    function BreakSignal() {}

    const post = () => {
        if (!title || !content) {
            alert("You must provide both a title and content!")
        } else {
            fetch(`https://www.cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
            },
            body: JSON.stringify({
                "title": title,
                "content": content,
            })
        }).then(res => {
            if (res.status===200 || res.status===304) {
                return res.json();
            }
            throw new BreakSignal();
        }).then(json => {
            alert("Successfully Posted");
            props.loadMessages();
        }).catch(BreakSignal, function () {})
        }
    }
    
    return <>
    <Form.Label htmlFor="title">Title</Form.Label>
        <Form.Control
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <Form.Label htmlFor="content">Content</Form.Label>
        <Form.Control
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <Button onClick={post}>Post</Button>
        </>
}

export default CreatePost;