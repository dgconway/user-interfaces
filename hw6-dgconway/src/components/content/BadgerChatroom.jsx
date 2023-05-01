import React, { useEffect, useState, useContext } from "react"
import BadgerMessage from "./BadgerMessage";
import loggedIn from "../auth/context/loggedInCtx";
import CreatePost from "./CreatePost";
import usersname from "../auth/context/usersnameCtx";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [myName, setMyName] = useContext(usersname);
    const [isLoggedIn, setIsLoggedIn] = useContext(loggedIn);

    function BreakSignal() {}

    const loadMessages = () => {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages`, 
        {
            credentials: "include",
            headers: {
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
                "Content-Type": "application/json",
            }
        }).then(res => {
            if (res.status===200 || res.status===304) {
                return res.json();
            } 
            throw new BreakSignal();
        }).then(json => {
            setMessages(json.messages)
        }).catch(BreakSignal, function () {})
    };

    function deletePost(msgId) {
        fetch(`https://cs571.org/s23/hw6/api/chatroom/${props.name}/messages/${msgId}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
            },
        }).then(res => {
            // if (res.status===200) {
            //     return res.json();
            // } 
            // throw new BreakSignal();
            return res.json()
        }).then(json => {
            alert("Successfully deleted the post!");
            loadMessages();
        }).catch(BreakSignal, function () {})
    }
    

    useEffect(() => {
        loadMessages()
    }, [props]);

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            isLoggedIn ? 
            <CreatePost 
            loadMessages={loadMessages}
            name={props.name}
            /> 
            : "You must be logged in to post!"
        }
        <hr/>
        {
            messages.length > 0 ?
                <>
                    {
                        messages.map((message) => {
                            return <BadgerMessage 
                            key={message.id}
                            id={message.id}
                            title={message.title}
                            poster={message.poster}
                            content={message.content}
                            created={message.created}
                            showDelete={message.poster===myName}
                            deletePost={deletePost}
                            />
                        })
                    }
                </>
                :
                <>
                    <p>There are no messages in this chatroom yet!</p>
                </>
        }
    </>
}