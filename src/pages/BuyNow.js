import React, { Component } from "react";
import { Link } from "@reach/router";

export default class BuyNow extends Component {
  render() {
    return (
      <div className="ui start-now center aligned segment">
        <div className="ui text container">
          <h1 className="ui header title">Start your own world</h1>
          <h2 className="ui header sub-title">
            Rule your country and economy on the Blockchain
          </h2>
          <Link
            className="ui black big button"
            to="/dapp/createWorld"
          >
            Create your country
            <i aria-hidden="true" className="angle right icon" />
          </Link>
        </div>
      </div>
    );
  }
}
