import { Layout, Input } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useState } from 'react';
import './Home.css';

function Home() {

    const [results, setResults] = useState([]);
    const { Search } = Input;
    const history = useHistory();
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
                }
            }
        )
    } catch (error) {
        alert(error);
    }

    function logOut() {
        sessionStorage.removeItem('token');
        history.push("/");
    }

    function sendToChat(id) {
        sessionStorage.setItem('chatID', id);
        history.push("/chat")
    }

    function onSearch(value) {

        const valueData = {
            bothNames: value
        }

        try {
            fetch('http://localhost:8081/api/search', {
                method: 'POST',
                body: JSON.stringify(valueData),
                headers: { 'Content-Type' : 'application/json' }
            }).then(
                response => response.json()
            ).then(
                data => {
                    setResults(data.result);
                }
            )
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Layout>
            <Header>
                <Button type="danger" id="logoutButton" onClick={logOut}>Logi välja</Button>
            </Header>
            <Content id="content">
                <Search id="search" placeholder="Otsi kasutajat" onSearch={onSearch} style={{ width: 200 }} />
                <br /><br />
                <span>
                    {results.map((e) => (
                        <div key={e._id} id={e._id}>
                            <span
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => sendToChat(e._id)}
                            >
                                {e.bothNames}
                            </span>
                        </div>
                    ))}
                </span>
                <br />
            </Content>
        </Layout>
    )
}

export default Home;