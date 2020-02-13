import React, { Component } from "react";
import { DAppConnect } from "../DAppWrapper";
import TopNavigationBar from "../TopNavigationBar";
import SignupForm from "./../../components/Signup";


export default class AddAccountSetting extends Component {
    render() {
        return (
            <div className="ui vertical segment">
                <TopNavigationBar />
                <div className="ui divider" />
                <div className="ui container hero-content">
                    <div>
                        <div className="ui header center aligned">
                            <h2>Your Bit.Country Account</h2>
                            {/*this.state.address*/}
                            <p className="ui description">Edit your account details here.</p>
                        </div>
                        <SignupForm/>
                    </div>
                </div>
            </div>
        );
    }
}

