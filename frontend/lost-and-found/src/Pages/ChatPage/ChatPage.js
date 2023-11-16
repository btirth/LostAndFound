import React from 'react'
import SidePanel from './SidePanel'
import MessagePanel from './MessagePanel'
import './ChatPage.css'
import Navbar from '../../Components/Navbar'
import  { useContext, useEffect, useState } from "react";

const ChatPage = () => {
    const [selectedUser, setSelectedUser] = useState({
        name:"",
        photoUrl:"",
        chatDocumentId:"",
        email:"",
    });

    return (
        <div style={{height:"100vh",display:"flex",flexDirection:"column",backgroundColor:"#75e6a3"}}>
            <Navbar />
            <div className='chathome'>
                
                    <div className='chat-container'>
                        <SidePanel selectedUser={selectedUser} selectUserFunction={setSelectedUser}/>
                        <MessagePanel selectedUser={selectedUser} selectUserFunction={setSelectedUser}/>
                    </div>
            </div>
        </div>
    )
}

export default ChatPage