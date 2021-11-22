import { Layout, Form, Input, Button } from 'antd';
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.css";

function LoginForm(props) {

    const history = useHistory();

    const onFinish = (values) => {
        try {
            fetch('http://localhost:8081/api/auth/login', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: { 'Content-Type' : 'application/json' }
            }).then(
                response => response.json())
            .then(
                data => {
                    if(data.error || data.msg) {
                        alert("Vale e-mail või parool!");
                    } else if(data.token) {
                        sessionStorage.setItem('token', data.token);
                        props.onLoginUser(1, data);
                        history.push("/home");
                    }
                });
        } catch(error) {
            alert(error);
        }
    };

    const onFinishFailed = (errorInfo) => {
        alert('Ebaõnnestus: ' + errorInfo);
        props.onLoginUser(0);
    };

    return (
        <Layout>
            <Form
                labelCol = {{span: 8}}
                wrapperCol = {{span: 8}}
                name = "basic"
                initialValues = {{ remember: true }}
                onFinish = {onFinish}
                onFinishFailed = {onFinishFailed}
                autoComplete = "off"
            >
                <Form.Item
                    label = "E-maili aadress"
                    name = "email"
                    required
                >
                    <Input
                        placeholder = "email@domain.com"
                        type = "email"
                        required
                    />
                </Form.Item>
                <Form.Item
                    label = "Parool"
                    name = "password"
                    required
                >
                    <Input.Password
                        type = "password"
                        required
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="danger primary" htmlType="submit" id="login_button">
                        Logi sisse
                    </Button>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" id="newAccount"><Link to="/register">Loo uus kasutaja</Link></Button>
                </Form.Item>
            </Form>
        </Layout>
    )
}

export default LoginForm;