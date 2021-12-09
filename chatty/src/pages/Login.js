import LoginForm from "../components/LoginForm";
import React from 'react';
import 'antd/dist/antd.css';
import '../styles/Login.css';
import { loginUser } from "../store/actions";
import { useHistory } from 'react-router-dom';

function Login() {
    document.title = "Chatty - Logi sisse";

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
                if(data.isValid !== undefined) {
                    history.push("/home");
                }
            }
        )
    } catch (error) {
        alert(error);
    }

    function itemSubmitHandler(number, data) {
        if(number === 1) {
            loginUser(data);
        } else {
            alert("Sisselogimine ebaõnnestus!");
        }
    }

    return (
        <>
            <h1>Chatty</h1>
            <LoginForm onLoginUser={itemSubmitHandler} />
        </>
    )
}

export default Login;
