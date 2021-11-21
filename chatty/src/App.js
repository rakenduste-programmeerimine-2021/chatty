import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Layout } from 'antd';
import "antd/dist/antd.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";

const { Content } = Layout;

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Content>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/home" component={Home} />
          </Switch>
        </Content>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
