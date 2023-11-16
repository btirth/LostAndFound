import React from 'react'
import imageIcon from './../../Assets/Images/boy-icon.png';
import { db } from "./../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import  { useContext, useEffect, useState } from "react";
import { Alert } from 'react-bootstrap';


// const userList = [
//     { name: "John Doe", lastmessage: "Hello world" },
//     { name: "Alex Adam", lastmessage: "Hello world" },
//     { name: "Adam Conter", lastmessage: "Hello world" },
//     { name: "Andrew smith", lastmessage: "Hello world" },
//     { name: "John Doe", lastmessage: "Hello world" },
//     { name: "Alex Adam", lastmessage: "Hello world" },
//     { name: "Adam Conter", lastmessage: "Hello world" },
//     { name: "Andrew smith", lastmessage: "Hello world" },
//     { name: "John Doe", lastmessage: "Hello world" },
//     { name: "Alex Adam", lastmessage: "Hello world" },
//     { name: "Adam Conter", lastmessage: "Hello world" },
//     { name: "Andrew smith", lastmessage: "Hello world" },
//     { name: "John Doe", lastmessage: "Hello world" },
//     { name: "Alex Adam", lastmessage: "Hello world" },
//     { name: "Adam Conter", lastmessage: "Hello world" },
//     { name: "Andrew smith", lastmessage: "Hello world" }

// ]

const SidePanel = (props) => {

    const currentUser=localStorage.getItem('user_email');
    const [usersForChat, setUsersForChat] = useState([]);
    const [showAlert,setShowAlert]=useState(false);

    const selectUserFunction=props.selectUserFunction;
    const selectedUser=props.selectedUser;


    const handleSelect = (user) => {
        
        selectUserFunction(user);
        // console.log(selectedUser);
      };
    

    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "chatConnections/"+currentUser), (doc) => {
  
            const usersData=doc.data();
            const userList=[]
            Object.keys(usersData).forEach(key => {

                userList.push({
                    name:usersData[key].name,
                    lastUpdatedTimestamp:usersData[key].lastUpdatedTimestamp,
                    lastMessage:usersData[key].lastMessage,
                    email:usersData[key].email,
                    photoUrl:usersData[key].photoUrl,
                    chatDocumentId:key,
                    lastMessageBy:usersData[key].lastMessageBy
                })
            });
            setUsersForChat(userList);

          });
    
          return () => {
            unsub();
          };
        };
    
        currentUser && getChats();
      }, [currentUser]);

      useEffect(()=>{
            // console.log(usersForChat[0])
            if(usersForChat.length>0 && usersForChat[0].lastMessageBy!=currentUser){
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 2000);
            }else{
                setShowAlert(false);
            }
      },[usersForChat])

    return (
        <div className='side-panel'>
            <div className='listHeader'>
                <p>Conversations</p>
            </div>
            {showAlert ? 
                <Alert variant="success">
                    You have received new messages!
                </Alert> : 
                <></>
                }
            {usersForChat.sort((a,b)=>b.lastUpdatedTimestamp - a.lastUpdatedTimestamp).map((user, index) => (
                <div className='userChatCard' key={index} onClick={()=>handleSelect(user)}>
                    <img src={user.photoUrl} style={{ height: '50px', width: '50px',borderRadius:"50%" }}></img>
                    <div className='messagerInfo'>
                        <span style={{ fontSize: "18px", fontWeight: "500" }}>{user.name}</span>
                        <p style={{ fontSize: "14px" }}>{user.lastMessage}</p>
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default SidePanel