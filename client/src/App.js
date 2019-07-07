// Libraries
import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// Components
import TopMenu from "./components/topMenu";
import NotingContainer from "./components/notingContainer";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Logout from "./components/logOut";
import HomeUserGraph from "./components/homeUserGraph";
// Services
import auth from "./services/authService";
import { getNotingStatus } from "./services/userService";
// Styles
import "./styles/App.css";

class App extends Component {
  state = {
    user: "",
    thisDayNoted: false
  };

  async componentDidMount() {
    // Get current user
    const user = auth.getCurrentUser();
    if (user) {
      const thisDayNoted = await getNotingStatus();
      this.setState({ user: user, thisDayNoted: thisDayNoted });
    }
  }

  // Put thisDayNoted state to false then refresh components
  updateThisDayNoted = () => {
    this.setState({ thisDayNoted: true });
  };

  render() {
    const { user, thisDayNoted } = this.state;
    return (
      <React.Fragment>
        <div className="App">
          <ToastContainer />
          <TopMenu user={user} />
          <div className="container">
            <Switch>
              <Route
                path="/home"
                render={() => (
                  <React.Fragment>
                    {!thisDayNoted && user && (
                      <NotingContainer
                        user={user}
                        updateParentState={this.updateThisDayNoted}
                      />
                    )}
                    {user && <HomeUserGraph dayNoted={thisDayNoted} />}
                  </React.Fragment>
                )}
              />

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
