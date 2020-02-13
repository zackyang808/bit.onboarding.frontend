import React, { PureComponent } from "react";
import Notification from "./Notification";
import { fetchAPI } from "../utils/FetchUtil";
import { navigate } from "@reach/router";
import ENDPOINTS from "../config/endpoints";
import Cookies from "js-cookie";
import { Spin } from "antd";

const defaultState = {
  authLoading: true,
  loggedIn: false,
  user: null,
  countries: []
};

const AuthContext = React.createContext(defaultState);

export default class AuthWrapper extends PureComponent {
  state = defaultState;

  componentDidMount() {
    this.checkToken();
  }

  checkToken = async () => {
    try {
      const response = await fetchAPI(ENDPOINTS.GET_USER);

      if (response.isSuccess) {
        this.setState({
          authLoading: false,
          loggedIn: true,
          user: response.user
        });
      }
    } catch (error) {
      console.error(error);
      navigate("/dapp/login");
    } finally {
      this.setState({
        authLoading: false
      });
    }
  }

  sendLogin = async (email, password, address) => {
    const settingObj = {
      email,
      password,
      walletAddress: address
    };

    try {
      const response = await fetchAPI(
        ENDPOINTS.SIGN_IN,
        "POST",
        settingObj
      );

      if (!response.isSuccess) {
        Notification.displayErrorMessage(response.message);

        return false;
      }

      Cookies.set("bitToken", response.token.token);

      this.setState({
        loggedIn: true
      });

      return true;
    } catch (error) {
      Notification.displayErrorMessage(
        "Error trying to login to your account"
      );

      return false;
    }
  }

  sendLogout = async () => {
    Cookies.remove("bitToken");

    this.setState({
      loggedIn: false
    });

    return true;
  }

  render() {
    const {
      authLoading
    } = this.state;

    return (
      <AuthContext.Provider value={{...this.state, sendLogin: this.sendLogin, sendLogout: this.sendLogout}}>
        {authLoading ?
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
            <Spin size="large" />
          </div>
        :
          this.props.children}
      </AuthContext.Provider>
    )
  }
}

export const AuthConnect = WrappedComponent => props => (
  <AuthContext.Consumer>
    {value => <WrappedComponent {...value} {...props} />}
  </AuthContext.Consumer>
);
