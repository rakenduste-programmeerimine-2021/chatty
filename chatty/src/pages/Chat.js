import { Layout, Input } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './Chat.css';

function Chat() {

    useEffect(receiveMessages, []);
    //setInterval(useEffect(receiveMessages, []), 2000);

    const history = useHistory();
    const [renderChats, setRenderChats] = useState([]);
    const [currentChat, changeCurrentChat] = useState('');
    const [chatName, setChatName] = useState('');
    const yourName = sessionStorage.getItem('selfName');
    const elseName = sessionStorage.getItem('chatName');
    const storageToken = sessionStorage.getItem('token');
    const tokenData = {
        token: storageToken
    }

    try {
        fetch('http://localhost:8081/api/auth/verify', {
            method: 'POST',
            body: JSON.stringify(tokenData),
            headers: { 'Content-Type' : 'application/json' }
        }).then(
            response => response.json())
        .then(
            data => {
                if(data.isValid === undefined) {
                    history.push("/");
                } else {
                    setChatName(sessionStorage.getItem('chatName'));
                    sessionStorage.setItem('selfID', data.isValid.id);
                }
            }
        )
    } catch (error) {
        alert(error);
    }

    function exitChat() {
        history.push("/");
    }

    function handleChange(e) {
        changeCurrentChat(e.target.value);
    }

    function sendMessage() {
        const senderID = sessionStorage.getItem('selfID');
        const receiverID = sessionStorage.getItem('chatID');

        const messageData = {
            sender: senderID,
            receiver: receiverID,
            message: currentChat
        }

        try {
            fetch('http://localhost:8081/api/chat/sendchat', {
                method: 'POST',
                body: JSON.stringify(messageData),
                headers: { 'Content-Type' : 'application/json' }
            }).then(
                response => response.json()
            )
            changeCurrentChat();
            setTimeout(receiveMessages, 200);
        } catch (error) {
            alert(error);
        }
    }

    function receiveMessages() {

        console.log('received');

        const senderID = sessionStorage.getItem('selfID');
        const receiverID = sessionStorage.getItem('chatID');

        const receiveData = {
            ID1: senderID,
            ID2: receiverID
        }

        try {
            fetch('http://localhost:8081/api/chat/receivechats', {
                method: 'POST',
                body: JSON.stringify(receiveData),
                headers: { 'Content-Type' : 'application/json' }
            }).then(
                response => response.json()
            ).then (
                data => {
                    const chats1 = data.result1;
                    const chats2 = data.result2;

                    const chatDates = [];
                    const chatData = [];
                    const chatsOrdered = [];

                    chats1.forEach(element => {
                        chatDates.push(element.createdAt);
                        chatData.push({
                            message: element.message,
                            sender: 'you',
                            createdAt: element.createdAt
                        });
                    });

                    chats2.forEach(element => {
                        chatDates.push(element.createdAt);
                        chatData.push({
                            message: element.message,
                            sender: 'other',
                            createdAt: element.createdAt
                        });
                    });

                    chatDates.sort();

                    chatDates.forEach(element1 => {
                        chatData.forEach(element2 => {
                            if(element2.createdAt == element1) {
                                chatsOrdered.push(element2);
                            }
                        });
                    });

                    setRenderChats(chatsOrdered);
                }
            )
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Layout>
            <Header>
                <span style={{ color: "#FFFFFF", fontSize: "22px" }}>Vestlus kasutajaga {chatName}</span>
                <Button type="danger" id="backButton" onClick={exitChat}>Tagasi</Button>
            </Header>
            <Content>
                <div>
                    <div style={{ width: "73%" }}>
                        {renderChats.map((e) => {
                            if(e.sender === "you") {
                                return  <>
                                    <div key={e.createdAt} id={e.createdAt} style={{
                                        display: 'inline-block',
                                        border: '2px solid gray',
                                        borderRadius: '5px',
                                        padding: '5px' }}>
                                                <b>{yourName}:</b><br />
                                                {e.message}
                                            </div>
                                            <br />
                                        </>
                            } else {
                                return  <>
                                    <div key={e.createdAt} id={e.createdAt} style={{
                                        display: 'inline-block',
                                        border: '2px solid #d1a54d',
                                        borderRadius: '5px',
                                        padding: '5px' }}>
                                                <b>{elseName}:</b><br />
                                                {e.message}
                                            </div>
                                            <br />
                                        </>
                            }
                        })}
                    </div>
                    <div className="site-input-group-wrapper">
                        <Input.Group compact>
                            <Input style={{ width: '75%' }} placeholder="Sisesta sõnum" value={currentChat} onChange={handleChange} />
                            <Button type="primary" onClick={sendMessage}>Saada</Button>
                        </Input.Group>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}

export default Chat;