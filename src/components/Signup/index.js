import React, { Component } from "react";
import { navigate } from "@reach/router";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import $ from "jquery";
import Cookies from "js-cookie";
import Notification from "../../pages/Notification";
import { DAppConnect } from "../../pages/DAppWrapper"

class SignupForm extends Component {
    state = {
        emailAddress: "",
        nickName: "",
        password: ""
    };
    handleChange = e => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            [name]: value
        });
    };
    saveSetting = async (e) => {
        let saveButton = e.target;
        $(saveButton).addClass("loading");
        let settingObj = {
            email: this.state.emailAddress,
            walletAddress: this.props.address,
            nickName: this.state.nickName,
            password: this.state.password
        };
        try {
            const response = await fetchAPI(ENDPOINTS.SIGN_UP, "POST", settingObj);
            if (!response.isSuccess) {
                Notification.displayErrorMessage(response.message);
                $(saveButton).removeClass("loading");
                return;
            }
            Cookies.set("bitToken", response.token.token);
            setTimeout(() => {
                navigate("/dapp/createWorld", { state: { user: settingObj } });
            }, 3000);
        }
        catch (error) {
            Notification.displayErrorMessage("Error trying to create a new account");
            $(saveButton).removeClass("loading");
        }
    };
    redirectToLogin() {
        navigate("/dapp/login");
    }
    render() {
        return (<div className="ui segment">
            <div className="ui large form setting-form">
                <div className="field">
                    <label>Wallet address</label>
                    <input className="ui disabled input" disabled value={this.props.address} placeholder="Wallet address" type="text" />
                </div>
                <div className="field">
                    <label>Email address</label>
                    <input placeholder="Email address" type="text" onChange={this.handleChange} value={this.state.emailAddress} name="emailAddress" />
                </div>
                <div className="field">
                    <label>Nickname</label>
                    <input placeholder="Nickname" type="text" onChange={this.handleChange} value={this.state.nickName} name="nickName" />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input placeholder="Password" type="password" onChange={this.handleChange} value={this.state.password} name="password" />
                </div>

                <div className="ui header center aligned">
                    <button className="ui black large inverted button" onClick={this.saveSetting.bind(this)}>
                        Create Account
                  </button>
                </div>
                <div className="ui extra center aligned">
                    Already had an account?{" "}
                    <a className="" onClick={this.redirectToLogin.bind(this)}>
                        Login
                  </a>
                </div>
            </div>
        </div>);
    }
}

export default DAppConnect(SignupForm);
