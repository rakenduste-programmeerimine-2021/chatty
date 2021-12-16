import { Layout, Input, Form } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import { useState, useEffect } from 'react';
import '../styles/Home.css';

function Home() {
    document.title = "Chatty - Avaleht";

    const [searchResults, setSearchResults] = useState([]);
    const [recentChatsResults, setRecentChatsResults] = useState([{
        _id: "X",
        bothNames: "Laadin..."
    }]);
    const [loggedInFullName, setLoggedInFullName] = useState('');
    const history = useHistory();
    const storageToken = sessionStorage.getItem('token');
    const tokenData = {
        token: storageToken
    }

    const [num, setNum] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            loadRecentChats(num)
        }, 1000);
    }, [num])

    if(!loggedInFullName) {
        try {
            fetch('http://localhost:8081/api/auth/verify', {
                method: 'POST',
                body: JSON.stringify(tokenData),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json())
                .then(
                    data => {
                        if (data.isValid === undefined) {
                            history.push("/");
                        } else {
                            setLoggedInFullName(data.isValid.firstName + " " + data.isValid.lastName);
                            sessionStorage.setItem('selfName', data.isValid.firstName + " " + data.isValid.lastName);
                            sessionStorage.setItem('selfID', data.isValid.id);
                        }
                    }
                )
        } catch (error) {
            alert(error);
        }
    }

    const loadRecentChats = (number) => {

        setNum(number + 1);

        const selfID = sessionStorage.getItem('selfID');
        const receiveChats = {
            userID: selfID
        }

        try {
            fetch('http://localhost:8081/api/search/recentchats', {
                method: 'POST',
                body: JSON.stringify(receiveChats),
                headers: { 'Content-Type': 'application/json' }
            }).then(
                response => response.json()
            ).then(
                data => {
                    const chats1 = data.result1;
                    const chats2 = data.result2;
                    const chatData = [];
                    var finalListofIDs = [];

                    chats1.forEach(element => {
                        chatData.push({
                            sender: 'you',
                            receiver: element.receiver,
                            createdAt: element.createdAt
                        })
                    });

                    chats2.forEach(element => {
                        chatData.push({
                            sender: element.sender,
                            receiver: 'you',
                            createdAt: element.createdAt
                        })
                    });

                    chatData.sort(function (a, b) {
                        return b.createdAt.localeCompare(a.createdAt);
                    });

                    chatData.forEach(element => {
                        if (element.sender === 'you' && !finalListofIDs.includes(element.receiver)) {
                            finalListofIDs.push(element.receiver);
                        } else if (element.receiver === 'you' && !finalListofIDs.includes(element.sender)) {
                            finalListofIDs.push(element.sender);
                        }
                    });
                    
                    const sendData = {
                        IDs: finalListofIDs
                    }

                    try {
                        fetch('http://localhost:8081/api/search/usersbyids', {
                            method: 'POST',
                            body: JSON.stringify(sendData),
                            headers: { 'Content-Type': 'application/json' }
                        }).then(
                            response => response.json()
                        ).then(
                            data => {
                                let listOfNamesAndIDs = [];
                                for(let i = 0; i < data.returnData.length; i++) {
                                    var obj = {
                                        _id: finalListofIDs[i],
                                        bothNames: data.returnData[i]
                                    }
                                    listOfNamesAndIDs.push(obj);
                                }
                                setRecentChatsResults(listOfNamesAndIDs.slice());
                            }
                        )
                    } catch (error) {
                        alert(error);
                    }
                }
            )
        } catch (error) {
            alert(error);
        }
    }

    function logOut() {
        sessionStorage.removeItem('token');
        history.push("/");
    }

    function sendToChatFromSearch(id, name) {
        if (searchResults[0]._id !== 'X') {
            sessionStorage.setItem('chatID', id);
            sessionStorage.setItem('chatName', name);
            history.push("/chat")
        }
    }

    function sendToChatFromRecents(id, name) {
        if (recentChatsResults[0]._id !== 'X') {
            sessionStorage.setItem('chatID', id);
            sessionStorage.setItem('chatName', name);
            history.push("/chat")
        }
    }

    function onSearch(value) {
        if (value.searchField === " " || value.searchField === undefined) {
            alert("Sisesta korrektne otsing!");
        } else {
            const valueData = {
                bothNames: value.searchField
            }

            try {
                fetch('http://localhost:8081/api/search/user', {
                    method: 'POST',
                    body: JSON.stringify(valueData),
                    headers: { 'Content-Type': 'application/json' }
                }).then(
                    response => response.json()
                ).then(
                    data => {
                        if (data.result.length === 0) {
                            setSearchResults([{
                                _id: 'X',
                                bothNames: 'Tulemusi ei leitud!'
                            }])
                        } else {
                            setSearchResults(data.result);
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
                <div style={{ color: "#FFFFFF", fontSize: "18px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginRight: "19vw" }}>Tere, {loggedInFullName}!</div>
                <Button type="danger" id="logoutButton" onClick={logOut}>Logi välja</Button>
            </Header>
            <Content id="content">
                <Form
                    name="searchform"
                    onFinish={(values) => onSearch(values)}
                >
                    <Form.Item
                        name="searchField"
                        required
                    >
                        <Input
                            placeholder="Otsi kasutajat"
                            style={{ width: 200 }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="searchButton"
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                        >
                            Otsi
                        </Button>
                    </Form.Item>
                </Form>
                <span>
                    <b style={{ fontSize: "20px" }}>Otsingutulemused</b>
                    {searchResults.map((e) => (
                        <div key={e._id} id={e._id} style={{ marginTop: "5px", fontSize: "18px" }}>
                            <span
                                style={{ cursor: "pointer" }}
                                onClick={() => sendToChatFromSearch(e._id, e.bothNames)}
                            >
                                {e.bothNames}
                            </span>
                        </div>
                    ))}
                </span>
                <br /><br />
                <span>
                    <b style={{ fontSize: "20px" }}>Hiljutised vestlused</b><br />
                    <span>
                        {recentChatsResults.map((e) => (
                            <div key={e._id} id={e._id} style={{ marginTop: "5px", fontSize: "18px" }}>
                                <span
                                    style={{ cursor: "pointer" }}
                                    onClick={() => sendToChatFromRecents(e._id, e.bothNames)}
                                >
                                    {e.bothNames}
                                </span>
                            </div>
                        ))}
                    </span>
                </span>
                <br />
            </Content>
        </Layout>
    )
}

export default Home;