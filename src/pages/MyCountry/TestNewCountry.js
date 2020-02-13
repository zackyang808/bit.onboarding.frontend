import React, { Component } from "react";
import { DAppConnect } from "../DAppWrapper";
import { Link, navigate } from "@reach/router";
import TopNavigationBar from "./../TopNavigationBar";
import country from "./../../ethereum/country";
import web3 from "./../../web3";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import BlockGrid from "./../Blocks/BlockGrid";
import Utils from "../../utils/Utils";
import goldenCrown from "./../../assets/digital-asset-icon/goldenCrown.jpg";
import greenCountry from "./../../assets/digital-asset-icon/greenCountry.jpg";
import honoredKingdom from "./../../assets/digital-asset-icon/honoredKingdom.jpg";
import independenceTreaty from "./../../assets/digital-asset-icon/independenceTreaty.jpg";
import peaceAward from "./../../assets/digital-asset-icon/peaceAward.jpg";
import { resolve } from "url";
import { AuthConnect } from "../AuthWrapper";
import ENDPOINTS from "../../config/endpoints";
import { fetchAPI } from "../../utils/FetchUtil";
import { Spin } from "antd";

class TestNewCountry extends Component {
  state = {
    country: {},
    blockDetails: [],
    isOwner: false,
    loading: true
  };

  componentDidMount() {
    if (!this.props.loggedIn) {
      navigate("/dapp/login");

      return;
    }

    this.loadData();

    $(window).scroll(function () {
      const height = $(window).scrollTop();
      if (height > 80) {
        $(".country-detail .ui.segment.country-card").css("top", "1px");
      } else {
        $(".country-detail .ui.segment.country-card").css(
          "top",
          80 - height + "px"
        );
      }
    });
  }

  loadData = async () => {
    this.setState({
      loading: true
    });

    try {
      await Promise.all([this.loadCountryById(), this.loadCountryBlockDetails()]);
    } catch (error) {debugger;
      Notification.displayErrorMessage(error.message);

      navigate("/dapp/login");
    }

    this.setState({
      loading: false
    });
  }

  refreshData = async () => {
    try {
      await Promise.all([this.loadCountryById(), this.loadCountryBlockDetails()]);
    } catch (error) {
      Notification.displayErrorMessage(error.message);

      navigate("/dapp/login");
    }
  }

  loadCountryById = async () => {
    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_COUNTRY}?countryId=${this.props.id}`
      );

      if (!response.isSuccess) {
        throw Error("Error while retrieving country data");
      }

      this.setState({
        country: response.country,
        isOwner: response.country.ownerAddress == this.props.address
      });
    } catch (error) {
      throw error;      
    }
  }

  loadCountryBlockDetails = async () => {
    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_BLOCKS_BY_COUNTRY}?countryId=${this.props.id}`
      );

      if (!response.isSuccess) {
        throw Error("Error while retrieving country data");
      }

      this.setState({
        blockDetails: response.blocks,
      });
    } catch (error) {
      throw error;
    }
  }
  
  getTotalResidentsByBlock(blockNumber) {
    return blockNumber * 256;
  }

  getEstimateValueByBlock(blockNumber) {
    return (blockNumber * 0.01 + blockNumber * 0.01 * 0.2).toFixed(2);
  }

  getTheme = () => {
    return Utils.getTheme(this.state.country.theme);
  }

  gotoCountryRule = () => {
    navigate(`/dapp/countryRules/edit`, {
      state: {
        isOwner: this.state.isOwner,
        country: this.props ? this.state.country : {}
      }
    });
  };

  render() {
    const {
      loading
    } = this.state;

    return loading ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <Spin size="large" />
      </div>
    ) : (
      <div className="ui vertical segment welcome-world">
        <TopNavigationBar />
        <div className="ui divider" />
        <div className="ui grid country-detail">
          <div className="three wide column ui basic segment country-card">
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
                    {/* <p>{this.props.country.ownerAddress}</p> */}
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
                            Eth: {this.state.country.estimatedValue} (20% up)
                          </div>
                          <div>Estimated sale value</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="item">
                  {this.state.isOwner ? (
                    <a
                      className="ui basic button"
                      onClick={this.gotoCountryRule}
                    >
                      Activity Rules
                      <i aria-hidden="true" className="pencil right icon" />
                    </a>
                  ) : (
                    <a
                      className="ui basic button"
                      onClick={this.gotoCountryRule}
                    >
                      View Rules
                      <i aria-hidden="true" className="dribbble right icon" />
                    </a>
                  )}
                </div>
              </div>
              <div className="extra content digital-assets">
                <div className="description">Digital assets:</div>
                <div className="ui tiny images">
                  <img className="ui image" src={goldenCrown} />
                  <img className="ui image" src={greenCountry} />
                  <img className="ui image" src={honoredKingdom} />
                  <img className="ui image" src={independenceTreaty} />
                  <img className="ui image" src={peaceAward} />
                </div>
              </div>
              <div className="ui button-group-section">
                {this.state.isOwner ? (
                  <a
                    className="ui black button"
                    onClick={() => {
                        navigate(`${this.props.uri}/invitation`);
                    }}
                  >
                    Invite resident
                    <i aria-hidden="true" className="angle right icon" />
                  </a>
                ) : null}
              </div>
            </div>
          </div>
          <div className="sixteen wide column block-grid-section">
            <div className="ui grid country-detail">
                <BlockGrid
                  numberOfBlock={this.state.country.totalBlocks}
                  countryName={this.state.country.name}
                  countryId={this.state.country.id}
                  countryIndex={this.state.country.countryIndex}
                  countryBlockDetails={this.state.blockDetails}
                  countryBlocks={this.state.country.blocks}
                  isOwner={this.state.isOwner}
                  navigate={this.props.navigate}
                  onBlockUpdate={this.refreshData}
                />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DAppConnect(AuthConnect(TestNewCountry));
