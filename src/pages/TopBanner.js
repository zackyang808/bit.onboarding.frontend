import React, { Component } from "react";
import { Router, Link } from "@reach/router";
import Cookies from "js-cookie";
import ENDPOINTS from "../config/endpoints";
import { fetchAPI } from "../utils/FetchUtil";
import { FormattedMessage } from "react-intl";
import BCLogoImage from "../assets/images/BG1png.png";

export default class TopBanner extends Component {
  state = {
    isLogin: false
  };

  // TODO: Check if there's a nicer implementation
  // Confirm that login can't occur without this component knowing.
  componentDidMount() {
    this.checkUserLogin();
  }

  checkUserLogin = async () => {
    try {
      const response = await fetchAPI(ENDPOINTS.GET_USER);
  
      if (response.isSuccess) {
        this.setState({
          isLogin: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div className="ui vertical center aligned segment hero">
        <div className="ui container">
          <div className="ui huge topbar topbar-inverted menu">
            <a className="item">
              <div className="bit-logo">
                <img src={BCLogoImage} alt="Bit.Country" />
              </div>
            </a>
            <div className="right menu">
              <Link className="item" to="/dapp/marketplace">
                <FormattedMessage id="app.marketplace"></FormattedMessage>
              </Link>
              {this.state.isLogin ? (
                <Link className="item" to="/dapp/myCountry">
                  <FormattedMessage id="app.mycountries"></FormattedMessage>
                </Link>
              ) : (
                  <Link className="item" to="/dapp/login">
                    <FormattedMessage id="app.login"></FormattedMessage>
                  </Link>
                )}
            </div>
          </div>
        </div>
        <div className="ui container">
          <div className="ui basic segment">
            <h2 className="headline-slogan">
              <FormattedMessage id="app.title"></FormattedMessage>
            </h2>
            <div className="ui basic segment">
              <Link
                className="ui create world large inverted button"
                to="/dapp/createWorld"
              >
                <FormattedMessage id="app.createYourWorld"></FormattedMessage>
              </Link>
            </div>
            <div className="ui basic segment">
              <h4 className="ui inverted header">
                <FormattedMessage id="app.followus"></FormattedMessage>
              </h4>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i
                  aria-hidden="true"
                  className="facebook square large inverted link icon"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i
                  aria-hidden="true"
                  className="twitter square large inverted link icon"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i
                  aria-hidden="true"
                  className="medium large inverted link icon"
                />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <i
                  aria-hidden="true"
                  className="chat square large inverted link icon"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
