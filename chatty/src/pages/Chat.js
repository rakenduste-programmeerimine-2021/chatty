import { Layout, Input } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useEffect, useState } from 'react';
import './Chat.css';

function Chat() {

    const [num, setNum] = useState(0);

    useEffect(()=>{
        setTimeout(() => {
            receiveMessages(num)
        }, 1000);
    }, [num])

    const history = useHistory();
    const [renderChats, setRenderChats] = useState([{
        createdAt: "rightNow",
        id: "xxx",
        message: "Laadin sõnumeid...",
        sender: "loading"
    }]);

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

    const receiveMessages = (number) => {
        
        setNum(number + 1);

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
                            createdAt: element.createdAt,
                            id: element._id
                        });
                    });

                    chats2.forEach(element => {
                        chatDates.push(element.createdAt);
                        chatData.push({
                            message: element.message,
                            sender: 'other',
                            createdAt: element.createdAt,
                            id: element._id
                        });
                    });

                    chatDates.sort();

                    chatDates.forEach(element1 => {
                        chatData.forEach(element2 => {
                            if(element2.createdAt === element1) {
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
                <div style={{ color: "#FFFFFF", fontSize: "18px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "12vw" }}>Vestlus kasutajaga {chatName}</div>
                <Button type="danger" id="backButton" onClick={exitChat}>Tagasi</Button>
            </Header>
            <Content>
                <div style={{ padding: "15px" }}>
                    <div style={{ width: "73%" }}>
                        {renderChats.map((e) => {
                            if(e.sender === "you") {
                                return  <>
                                    <div key={e.id} id={e.id} style={{
                                        display: 'inline-block',
                                        border: '2px solid gray',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        marginTop: '10px' }}>
                                                <b>{yourName}:</b><br />
                                                {e.message}
                                            </div>
                                            <br />
                                        </>
                            } else if(e.sender === "loading") {
                                return  <>
                                    <div key={e.id} id={e.id} style={{
                                        display: 'inline-block',
                                        border: '2px solid #d1a54d',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        marginTop: '10px' }}>
                                                {e.message}
                                            </div>
                                            <br />
                                        </>
                            } else {
                                return  <>
                                    <div key={e.id} id={e.id} style={{
                                        display: 'inline-block',
                                        border: '2px solid #d1a54d',
                                        borderRadius: '5px',
                                        padding: '5px',
                                        marginTop: '10px' }}>
                                                <b>{elseName}:</b><br />
                                                {e.message}
                                            </div>
                                            <br />
                                        </>
                            }
                        })}
                    </div>
                    <div className="site-input-group-wrapper" style={{ marginTop: "15px" }}>
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