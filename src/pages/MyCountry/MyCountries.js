import React, { Component } from "react";
import { Link, redirectTo, navigate } from "@reach/router";
import TopNavigationBar from "./../TopNavigationBar";
import country from "./../../ethereum/country";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import Cookies from "js-cookie";
import Utils from "../../utils/Utils";
import Country from "./Country";
import ENDPOINTS from "../../config/endpoints";
import { fetchAPI } from "../../utils/FetchUtil";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";

class MyCountries extends Component {
  state = {
    user: null,
    hasCountry: false,
    countries: [],
    balance: 0
  };    

  createCountry = () => {
    navigate("/dapp/createWorld", { state: { user: this.state.user } });
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      navigate("/dapp/login");
      
      return;
    }

    this.loadUserAndCountries();
    this.loadTokenBalance();
  }

  loadTokenBalance = async () => {
    try {
      const response = await fetchAPI(ENDPOINTS.GET_TOKEN_BALANCE);

      if (response.isSuccess) {
        this.setState({
          balance: response.balance
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  loadUserAndCountries = async () => {
    try {
      const responseUser = await fetchAPI(ENDPOINTS.GET_USER);

      if (!responseUser.isSuccess) {
        throw Error("Error retrieving user");
      }
  
      const responseCountry = await fetchAPI(
        `${ENDPOINTS.GET_COUNTRIES_BY_USER}?userId=${responseUser.user.id}`
      );
  
      this.setState({
        user: responseUser.user,
        hasCountry: responseCountry.isSuccess,
        countries:  
          this.state.countries.concat(responseCountry.countries || [])
      });
    } catch (error) {
      console.error(error);
      navigate("/dapp/login");
    }
  }
  
  getTotalResidentsByBlock(blockNumber) {
    return blockNumber * 256;
  }

  getEstimateValueByBlock(blockNumber) {
    return (blockNumber * 0.01 + blockNumber * 0.01 * 0.2).toFixed(2);
  }

  loadCountriesSection = () => {
    if (this.state.hasCountry) {
    }
  }

  render() {
    if (!this.props.loggedIn) {
      return null;
    }

    const countries = this.state.countries.map(
      country => <Country key={country.id} country={country} navigate={this.props.navigate} />
    );

    return (
      <div className="ui vertical segment welcome-world">
        <TopNavigationBar />
        <div className="ui divider" />
        <div className="ui container hero-content">
          <div className="ui header center aligned">
            <h2>Your Bit.Country</h2>
            {this.state.address}
            <p className="ui description">Your countries at a glance</p>
          </div>
          <div className="ui header center aligned">
            <h3>BIT Token Balance: {this.state.balance}</h3>
          </div>
        </div>
        <div className="ui grid country-detail container">
          <div className="column ui segment">
            <div className="ui basic segment button-group-section">
              <a className="ui black button" onClick={this.createCountry}>
                Create country
                <i aria-hidden="true" className="angle right icon" />
              </a>
            </div>
            <div className="ui stackable four cards">
              {countries.length > 0 ? (
                countries
              ) : (
                  <h3 className="ui header center aligned margined">
                    You currently don't own any countries.
                </h3>
                )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DAppConnect(AuthConnect(MyCountries));
