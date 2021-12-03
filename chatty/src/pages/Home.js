import { Layout, Input, Form } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useState } from 'react';
import './Home.css';

function Home() {

    const [results, setResults] = useState([]);
    const [loggedInFullName, setLoggedInFullName] = useState('');
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
                } else {
                    setLoggedInFullName(data.isValid.firstName + " " + data.isValid.lastName);
                    sessionStorage.setItem('selfName', data.isValid.firstName + " " + data.isValid.lastName);
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

    function sendToChat(id, name) {
        if(results[0]._id != 'X') {
            sessionStorage.setItem('chatID', id);
            sessionStorage.setItem('chatName', name);
            history.push("/chat")
        }
    }

    function onSearch(value) {
        if(value.searchField == " " || value.searchField == undefined) {
            alert("Sisesta korrektne otsing!");
        } else {
            const valueData = {
                bothNames: value.searchField
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
                        if(data.result.length == 0) {
                            setResults([{
                                _id: 'X',
                                bothNames: 'Tulemusi ei leitud!'
                            }])
                        } else {
                            setResults(data.result);
                        }
                    }
                )
            } catch (error) {
                alert(error);
            }
        }
    }

    return (
        <Layout>
            <Header>
                <span style={{ color: "#FFFFFF", fontSize: "22px" }}>Tere, {loggedInFullName}!</span>
                <Button type="danger" id="logoutButton" onClick={logOut}>Logi välja</Button>
            </Header>
            <Content id="content">
                <Form
                    name = "searchform"
                    onFinish = {(values) => onSearch(values)}
                >
                    <Form.Item
                        name = "searchField"
                        required
                    >
                        <Input 
                            placeholder = "Otsi kasutajat"
                            style={{ width: 200 }}
                        />
                    </Form.Item>
                    <Form.Item
                        name = "searchButton"
                    >
                        <Button
                            type = "primary"
                            htmlType = "submit"
                        >
                            Otsi
                        </Button>
                    </Form.Item>
                </Form>
                <br />
                <span>
                    {results.map((e) => (
                        <div key={e._id} id={e._id}>
                            <span
                                style={{ cursor: "pointer", fontSize: "20px" }}
                                onClick={() => sendToChat(e._id, e.bothNames)}
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