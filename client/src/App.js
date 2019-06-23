import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TopMenu from "./components/topMenu";
import NotingContainer from "./components/notingContainer";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logOut";
import auth from "./services/authService";
import "./styles/App.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <ToastContainer />
          <TopMenu user={user} />
          <div className="container">
            <Switch>
              {user && (
                <Route
                  path="/home"
                  render={() => <NotingContainer user={user} />}
                />
              )}
              <Route path="/logout" exact component={Logout} />
              <Route path="/login" exact component={LoginForm} />
              <Route path="/register" exact component={RegisterForm} />
              <Redirect from="/" to="/home" />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
