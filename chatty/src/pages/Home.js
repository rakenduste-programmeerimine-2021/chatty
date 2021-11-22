import { Layout } from "antd";
import { Content, Header } from "antd/lib/layout/layout";
import { useHistory } from "react-router-dom";
import { Button } from 'antd';
import './Home.css';

function Home() {

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

    return (
        <Layout>
            <Header>
                <Button type="danger" id="logoutButton" onClick={logOut}>Logi välja</Button>
            </Header>
            <Content>
                Tere
            </Content>
        </Layout>
    )
}

export default Home;