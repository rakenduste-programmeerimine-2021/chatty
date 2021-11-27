import { Layout } from "antd";
import { Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useState } from 'react';
import './Chat.css';

function Chat() {

    const history = useHistory();
    const [chatName, setChatName] = useState('');
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
                }
            }
        )
    } catch (error) {
        alert(error);
    }

    function exitChat() {
        history.push("/");
    }

    return (
        <Layout>
            <Header>
                <span style={{ color: "#FFFFFF", fontSize: "22px" }}>Vestlus kasutajaga {chatName}</span>
                <Button type="danger" id="backButton" onClick={exitChat}>Tagasi</Button>
            </Header>
        </Layout>
    )
}

export default Chat;