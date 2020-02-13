import React, { Component } from "react";
import { Link, navigate } from "@reach/router";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import TopNavigationBar from "./../TopNavigationBar";
import { Button, Form, Input } from "antd";
import Notification from "../Notification";
const { TextArea } = Input;
const BASE_URL = "http://localhost:3000/dapp/"

class Invitation extends Component {

    state = {
        welcomeMessage: "",
        welcomeMessageHistory: '',
        invitationLink: "",
        emailAddresses: "",
    };

    componentDidMount() {
        if (this.props && this.props.loggedIn) {
            this.setState({ invitationLink: `${BASE_URL}welcome/${this.props.id}/${this.props.user.id}` })
        };

        this.loadWelcomeMessage();
    }

    handleChange = event => {
        let state = this.state
        state[event.target.name] = event.target.value
        this.setState({ state })
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
                welcomeMessageHistory: response.welcomeMessage,
            });
        } catch (error) {
            throw false;
        }
    }

    updataWelcomeMessage = async () => {
        const data = {
            message: this.state.welcomeMessage,
            countryId: this.props.id,
        }

        try {
            const response = await fetchAPI(
                ENDPOINTS.UPDATE_WELCOME_MESSAGE,
                "POST",
                data
            )

            if (!response) {
                throw Error("Error updating welcome message")
            }
            else {
                this.setState({ welcomeMessageHistory: data.message })
                Notification.displaySuccessMessage("Message saved")
            }

        }

        catch (error) {
            throw false;
        }
    }

    sendInvitationEmail = async () => {
        const data = {
            invitationLink: this.state.invitationLink,
            emailAddresses: this.state.emailAddresses,
        }

        try {
            const response = await fetchAPI(
                ENDPOINTS.SEND_INVITATION_EMAIL,
                "POST",
                data
            )

            console.log(response);
            if (!response) {
                throw Error("Error sendind invitation email");
            }
            else {
                this.setState({ emailAddresses: "" });
                Notification.displaySuccessMessage("Email sent");
            }

        }

        catch (error) {
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
                            <Form layout="vertical">
                                <Form.Item label="Invitation Message">
                                    <TextArea rows={4}
                                        placeholder="Enter Welcome Message"
                                        value={this.state.welcomeMessage}
                                        name="welcomeMessage"
                                        onChange={this.handleChange}
                                    />
                                    <Button onClick={() => {navigate(this.state.invitationLink);}}>
                                        Preview
                                    </Button>
                                    <Button style={{ marginLeft: 8 }}
                                        type="primary"
                                        onClick={this.updataWelcomeMessage}
                                        disabled={this.state.welcomeMessage == this.state.welcomeMessageHistory}
                                    >
                                        Save
                                    </Button>
                                </Form.Item>
                                <Form.Item label="Invitation Link">
                                    <Input placeholder="Invitation Link"
                                        value={this.state.invitationLink}
                                        addonAfter="Copy link"
                                    />
                                </Form.Item>
                                <Form.Item label="Invitation Email">
                                    <TextArea rows={4}
                                        placeholder={"Enter user emails, please separate them with \",\""}
                                        value={this.state.emailAddresses}
                                        name="emailAddresses"
                                        onChange={this.handleChange}
                                    />
                                    <Button onClick={() => { this.setState({ emailAddresses: "" }) }}>
                                        Cancel
                                    </Button>
                                    <Button
                                        style={{ marginLeft: 8 }}
                                        type="primary"
                                        onClick={this.sendInvitationEmail}
                                        disabled={!this.state.emailAddresses}
                                    > 
                                        Send
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </div>
                </div>
            </div>
        );

    }
}

export default DAppConnect(AuthConnect(Invitation));