import React, { Component } from "react";
import { Link } from "@reach/router";
import TopNavigationBar from "./../TopNavigationBar";
import country from "./../../ethereum/country";
import web3 from "./../../web3";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import BlockGrid from "./../Blocks/BlockGrid";
import Utils from "../../utils/Utils";
import Notification from "./../Notification";
import ENDPOINTS from "../../config/endpoints";
import { fetchAPI } from "../../utils/FetchUtil";

export default class ViewCountry extends Component {
  state = {
    country: {},
    blockDetails: [],
    themeUrl: ""
  };

  getTotalResidentsByBlock(blockNumber) {
    return blockNumber * 256;
  }

  getEstimateValueByBlock(blockNumber) {
    return (blockNumber * 0.01 + blockNumber * 0.01 * 0.2).toFixed(2);
  }

  loadCountryById = async () => {
    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_COUNTRY}?countryId=${this.props.id}`
      );

      if (!response.isSuccess) {
        throw Error("Error retrieving country details");
      }

      console.log(response.country);

      this.setState({
        country: response.country,
      });
    } catch (error) {
      Notification.displayErrorMessage("Error while loading country!");
    }
  }

  getTheme = () => {
    return Utils.getTheme(this.state.country.theme);
  }

  componentDidMount() {
    this.loadCountryById();
  }

  render() {
    return (
      <div className="ui vertical segment welcome-world">
        <TopNavigationBar />
        <div className="ui divider" />
        <div className="top-header" data-text="Billboard">
          <div className="banner-theme">Banner of country theme</div>
        </div>
        <div className="ui container hero-content">
          <div className="ui header center aligned">
            <h2>Welcome to {this.state.country.name}</h2>
            <p className="ui description">{this.state.country.description}</p>
          </div>
        </div>
        <div className="ui grid country-detail">
          <div className="four wide column">
            <div className="ui card">
              <div className="image">
                <img src={this.getTheme()} />
              </div>
              <div className="ui header center aligned">
                <h2>{this.state.country.name}</h2>
              </div>
              <div className="ui list">
                <div className="item">
                  <div className="content">
                    <span>
                      President:{" "}
                      <span className="ui link owner">
                        {this.state.country.president}
                      </span>
                    </span>
                    {/* <p>{this.state.country.ownerAddress}</p> */}
                    <p className="ui description">
                      {this.state.country.description}
                    </p>
                  </div>
                  <div className="extra content value-content">
                    <div role="list" className="ui list">
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">
                            {this.state.country.theme}
                          </div>
                          <div>Country theme </div>
                        </div>
                      </div>
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">
                            {this.state.country.population}
                          </div>
                          <div>Population </div>
                        </div>
                      </div>
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">
                            {this.getTotalResidentsByBlock(
                              this.state.country.blockNumber
                            )}{" "}
                            residents
                          </div>
                          <div>Max capacity</div>
                        </div>
                      </div>
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">
                            Bit: {this.state.country.bankBalance}
                          </div>
                          <div>Reserved bank</div>
                        </div>
                      </div>
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">15 more days</div>
                          <div>Next digital assets airdrop</div>
                        </div>
                      </div>
                      <div className="listitem" className="item">
                        <div className="content">
                          <div className="right floated">
                            Eth:{" "}
                            {this.getEstimateValueByBlock(
                              this.state.country.blockNumber
                            )}{" "}
                            (20% up)
                          </div>
                          <div>Estimated sale value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="ui basic segment button-group-section">
                <a className="ui black button" href="/dapp/createWorld">
                  Invite resident<i
                    aria-hidden="true"
                    className="angle right icon"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="twelve wide column ui segment">
            <div className="ui header centered aligned">
              <h4>
                Block dimension {Math.sqrt(this.state.country.blockNumber)} x{" "}
                {Math.sqrt(this.state.country.blockNumber)}
              </h4>
              <h5>Total blocks: {this.state.country.blockNumber}</h5>
            </div>
            <BlockGrid
              numberOfBlock={Math.sqrt(this.state.country.blockNumber)}
              countryName={this.state.country.name}
              countryId={this.state.country.id}
              countryBlockDetails={this.state.blockDetails}
              navigate={this.props.navigate}
            />
          </div>
        </div>
      </div>
    );
  }
}
