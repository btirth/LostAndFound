import React, { useEffect, useState, useRef } from 'react'
import {  Send } from 'react-bootstrap-icons'
import Message from './Message';
import { Alert, Form } from 'react-bootstrap';
import { db } from "./../../firebase-config";
import { v4 as uuid } from "uuid";
import { arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";


function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp, 10));
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
}



const MessagePanel = (props) => {

    const [chats, setChats] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const chatSubscriptionRef = useRef(null);

    const selectedUser = props.selectedUser;
    const currentUserEmail = localStorage.getItem('user_email');
    const currentUserName = localStorage.getItem('username');


    const handleChange = (e) => {
        setInputMessage(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (inputMessage === "") {
            // setShowAlert(true);
            // setTimeout(() => {
            //     setShowAlert(false);
            // }, 2000);
            return;
        }
        await updateDoc(doc(db, "chats/" + selectedUser.chatDocumentId), {
            messages: arrayUnion({
                id: uuid(),
                message: inputMessage,
                sender: currentUserEmail,
                timestamp: Date.now(),
            }),
        });
        
        var secondUser;
        if(selectedUser.postedBy===currentUserEmail){
            secondUser=selectedUser.requestBy;
        }else{
            secondUser=selectedUser.postedBy;
        }


        const chatId = selectedUser.chatDocumentId;
        await updateDoc(doc(db, "chatConnections", currentUserEmail), {
            [chatId + ".lastMessage"]: inputMessage,
            [chatId + ".lastUpdatedTimestamp"]: Date.now(),
            [chatId + ".lastMessageBy"]: currentUserEmail
        });

        await updateDoc(doc(db, "chatConnections", secondUser), {
            [chatId + ".lastMessage"]: inputMessage,
            [chatId + ".lastUpdatedTimestamp"]: Date.now(),
            [chatId + ".lastMessageBy"]: currentUserEmail
        });


        setInputMessage("");
    }



    useEffect(() => {


        const getChats = () => {

            if (chatSubscriptionRef.current) {
                chatSubscriptionRef.current();
            }

            if (selectedUser.chatDocumentId.length > 0) {
                const unsub = onSnapshot(doc(db, "chats/" + selectedUser.chatDocumentId), (doc) => {
                    // console.log(doc.data().messages);
                    const messageList = [];

                    if (doc.exists()) {
                        const result = doc.data().messages;
                        // console.log(result);
                        result.map((msg, index) => {
                            messageList.push({
                                message: msg.message,
                                sender: msg.sender,
                                timestamp: formatTimestamp(msg.timestamp),
                                isOutgoing: msg.sender === currentUserEmail,
                            })
                        });
                    }
                    setChats(messageList);

                });

                chatSubscriptionRef.current = unsub;
                // return () => {
                //     unsub();
                // };
            }

        };

        selectedUser && getChats();

        return () => {
            // Unsubscribe from the current subscription when the component is unmounted or selectedUser changes
            if (chatSubscriptionRef.current) {
                chatSubscriptionRef.current();
            }
        };
    }, [selectedUser]);




    // console.log("user:",selectedUser);
    return (
        <div className='message-part'>
            {selectedUser.name == "" ?
                <div className='emptyMessagePanel'>
                    <p>Select a user to chat</p>
                </div> :
                <div className='message-panel'>
                    <div className='userInfo'>
                        <img src={selectedUser.photoUrl} style={{ height: '50px', width: '50px', borderRadius: "50%" }}></img>
                        <p style={{ marginTop: "10px" }}>{selectedUser.name}</p>
                    </div>
                    {showAlert ?
                        <Alert variant="danger">Cannot send empty message</Alert> : <></>}

                    {chats.length === 0 ?
                        <div className='emptyChat'>
                            <p>Start a new conversation</p>
                        </div> :
                        <div className='chats'>
                            {
                            chats.map((currMessage, index) => (
                                
                            <Message key={index} sender={currMessage.sender === currentUserEmail ? currentUserName : selectedUser.requestBy === currentUserEmail ? selectedUser.postedBy:selectedUser.requestBy} message={currMessage.message} timestamp={currMessage.timestamp} isOutgoing={currMessage.isOutgoing} />
                            ))}
                        </div>
                    }
                    <Form onSubmit={handleSubmit}>
                        <div className='messageInput'>
                            <input type='text' placeholder='Type something...' onChange={handleChange} value={inputMessage} style={{ width: "100%", border: "none", outline: "none", fontSize: "18px" }}></input>
                            <button type='submit' style={{ backgroundColor: "#35ac65", border: "none", height: "40px", width: "40px" }}><Send /></button>
                        </div>
                    </Form>
                </div>
            }
        </div>
    )
}

export default MessagePanel