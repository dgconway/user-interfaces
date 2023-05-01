import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import BadgerLayout from './BadgerLayout';
import BadgerLogin from '../auth/BadgerLogin';
import BadgerRegister from '../auth/BadgerRegister';
import BadgerLogout from '../auth/BadgerLogout';
import BadgerChatroom from '../content/BadgerChatroom';
import BadgerChatHome from '../content/BadgerChatHome';
import BadgerNoMatch from '../content/BadgerNoMatch';
import loggedIn from '../auth/context/loggedInCtx';
import usersname from '../auth/context/usersnameCtx';


function BadgerApp() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [myUsername, setMyUserName] = useState([]);

  const [chatrooms, setChatrooms] = useState([]);

  useEffect(() => {
    fetch('https://cs571.org/s23/hw6/api/chatroom', {
      headers: {
        "X-CS571-ID": "bid_4c2e0a660c7168a42f85",
      }
    }).then(res => res.json()).then(json => {
      setChatrooms(json)
    })
  }, []);

  return (
    <BrowserRouter>
    <usersname.Provider value={[myUsername, setMyUserName]}>
    <loggedIn.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <Routes>
      
        <Route path="/" element={<BadgerLayout chatrooms={chatrooms} />}> 
          <Route index element={<BadgerChatHome />} />
          <Route path="/login" element={<BadgerLogin />}></Route>
          <Route path="/register" element={<BadgerRegister />}></Route>
          <Route path="/logout" element={<BadgerLogout />}></Route>
          {
            chatrooms.map(chatroom => {
              return <Route key={chatroom} path={`chatrooms/${chatroom}`} element={<BadgerChatroom name={chatroom} />} />
            })
          }
          <Route path="*" element={<BadgerNoMatch />} />
        </Route>
        
      </Routes>
      </loggedIn.Provider>
      </usersname.Provider>
    </BrowserRouter>
  );
}

export default BadgerApp;
