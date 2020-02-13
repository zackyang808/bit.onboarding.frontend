import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import TopNavigationBar from "./../TopNavigationBar";
import { Row, Col, Button, Form, Input, Tooltip, Select, Icon } from "antd";
import Login from "../Account/Login";
import SignupForm from "./../../components/Signup";
const BASE_URL = "http://localhost:3000/dapp/"

class WelcomePage extends Component {

    state = {
        welcomeMessage: "",
    };

    componentDidMount() {
        this.loadWelcomeMessage();
    }

    loadWelcomeMessage = async () => {
        try {
            const response = await fetchAPI(
                `${ENDPOINTS.GET_WELCOME_MESSAGE}?countryId=${this.props.id}`
            );

            if (!response.isSuccess) {
                throw Error("Error loading welcome message");
            }

            this.setState({
                welcomeMessage: response.welcomeMessage,
            });
        } catch (error) {
            throw false;
        }
    }

    render() {
        return (
            <div>
                <div>
                    <TopNavigationBar />
                    <div className="ui divider" />
                    <div className="ui container hero-content">
                        <div className="ui header center aligned">
                            <p>{this.state.welcomeMessage}</p>
                            <br />
                            {this.props.loggedIn ? (
                                <Button
                                    type="primary"
                                    onClick={() => { navigate(`${BASE_URL}country/${this.props.id}`); }}
                                >
                                    Go to country >>
                                </Button>
                            ) : 
                                <SignupForm/>
                            }
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

export default DAppConnect(AuthConnect(WelcomePage));