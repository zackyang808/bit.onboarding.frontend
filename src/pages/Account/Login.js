import React, { Component } from "react";
import { navigate } from "@reach/router";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";
import TopNavigationBar from "../TopNavigationBar";
import $ from "jquery";

class Login extends Component {
  state = {
    emailAddress: "",
    password: ""
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  }

  login = async e => {
    const loginButton = e.target;
    $(loginButton).addClass("loading");

    const loggedIn = await this.props.sendLogin(
      this.state.emailAddress,
      this.state.password,
      this.props.address
    )
    
    $(loginButton).removeClass("loading");
    
    if (loggedIn) {
      navigate("/dapp/myCountry");
    }
  }

  redirectToSetting() {
    navigate("/dapp/setting");
  }

  render() {
    const {
      emailAddress,
      password
    } = this.state;
    const {
      address
    } = this.props;

    return (
      <div className="ui vertical segment">
        <TopNavigationBar />
        <div className="ui divider" />
        <div className="ui container hero-content">
          <div>
            <div className="ui header center aligned">
              <h2>Login to your Bit.Country Account</h2>
              {this.state.address}
              <p className="ui description">Access your Bit.Country account</p>
            </div>
            <div className="ui segment">
              <div className="ui large form setting-form">
                <div className="field">
                  <label>Wallet address</label>
                  <input
                    className="ui disabled input"
                    disabled
                    value={address}
                    placeholder="Wallet address"
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Email address</label>
                  <input
                    placeholder="Email address"
                    type="text"
                    onChange={this.handleChange}
                    value={emailAddress}
                    name="emailAddress"
                  />
                </div>
                <div className="field">
                  <label>Password</label>
                  <input
                    placeholder="Password"
                    type="password"
                    onChange={this.handleChange}
                    value={password}
                    name="password"
                  />
                </div>
                {/* <div className="ui big message error-warning">
                  Make sure to save your MetaMask login information and account
                  recovery details! We can’t help you regain access if you lose it.
                </div> */}
                <div className="ui header center aligned">
                  <button
                    className="ui black large inverted button"
                    onClick={this.login}
                  >
                    Login
                  </button>
                </div>
                <div className="ui extra center aligned">
                  <a className="" onClick={this.redirectToSetting}>
                    Create an account
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DAppConnect(AuthConnect(Login));
