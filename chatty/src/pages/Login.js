import LoginForm from "../components/LoginForm";
import React from 'react';
import 'antd/dist/antd.css';
import './Login.css';
import { useContext } from 'react';
import { loginUser } from "../store/actions";
import { Context } from "../store";

function Login() {
    const [state, dispatch] = useContext(Context)

    function itemSubmitHandler(number, data) {
        if(number === 1) {
            dispatch(loginUser(data));
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
