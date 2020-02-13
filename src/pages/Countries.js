import React, { Component } from "react";
import { Link, redirectTo, navigate } from "@reach/router";
import { AuthConnect } from "./AuthWrapper";
import TopNavigationBar from "./TopNavigationBar";
import country from "./../ethereum/country";
import web3 from "./../web3";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import BlockGrid from "./Blocks/BlockGrid";
import goldenCrown from "./../assets/digital-asset-icon/goldenCrown.jpg";
import greenCountry from "./../assets/digital-asset-icon/greenCountry.jpg";
import honoredKingdom from "./../assets/digital-asset-icon/honoredKingdom.jpg";
import independenceTreaty from "./../assets/digital-asset-icon/independenceTreaty.jpg";
import peaceAward from "./../assets/digital-asset-icon/peaceAward.jpg";
import safeCountry from "./../assets/digital-asset-icon/safeCountry.jpg";
import unboxTreasure from "./../assets/digital-asset-icon/unboxTreasure.jpg";
import Cookies from "js-cookie";
import { fetchAPI } from "../utils/FetchUtil";
import ENDPOINTS from "../config/endpoints";

class Countries extends Component {
  gotoCountry() {
    navigate(`/dapp/country/${"090239012"}`);
  }

  getTotalResidentsByBlock(blockNumber) {
    return blockNumber * 256;
  }

  getEstimateValueByBlock(blockNumber) {
    return (blockNumber * 0.01 + blockNumber * 0.01 * 0.2).toFixed(2);
  }

  componentDidMount() {
    if (!this.props.loggedIn) {
      navigate("/dapp/login");

      return;
    }

    //get countries
  }

  render() {
    if (!this.props.loggedIn) {
      return null;
    }

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
        </div>
        <div className="ui grid country-detail container">
          <div className="column ui segment">
            <div className="ui stackable four cards">
              <div className="card">
                <div className="image">
                  <img src="https://cdn.dribbble.com/users/5031/screenshots/3232835/owl-mikael-gustafsson-dribbble.gif" />
                </div>
                <div className="content">
                  <div className="header">Coding.Kingdom</div>
                  <div className="meta">
                    <a>
                      President:
                      <span className="ui link owner">Code.King</span>
                    </a>
                  </div>
                  <div className="description">
                    Country for code monkeys who love changing the world
                  </div>
                </div>
                <div className="extra content value-content">
                  <div className="ui two column grid">
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Reserved Bank</div>
                          <span className="value-description">
                            Eth: 19,934.23
                          </span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Population</div>
                          <span className="value-description">250000</span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Estimated value</div>
                          <span className="value-description">Eth: 40,000</span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Theme</div>
                          <span className="value-description">Futuristic</span>
                        </div>
                      </div>
                    </div>
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
                <div className="ui basic segment button-group-section">
                  <a className="ui black button" onClick={this.gotoCountry}>
                    Go to country
                    <i aria-hidden="true" className="angle right icon" />
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img src="https://cdn.dribbble.com/users/5031/screenshots/3284212/cave-mikaelgustafsson_1x.png" />
                </div>
                <div className="content">
                  <div className="header">Liberland.Cave</div>
                  <div className="meta">
                    <a>
                      President:
                      <span className="ui link owner">Code.King</span>
                    </a>
                  </div>
                  <div className="description">
                    All liberland residents have share in reserved bank
                  </div>
                </div>
                <div className="extra content value-content">
                  <div className="ui two column grid">
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Reserved Bank</div>
                          <span className="value-description">
                            Eth: 19,934.23
                          </span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Population</div>
                          <span className="value-description">250,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Estimated value</div>
                          <span className="value-description">Eth: 40,000</span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Theme</div>
                          <span className="value-description">Futuristic</span>
                        </div>
                      </div>
                    </div>
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
                <div className="ui basic segment button-group-section">
                  <a className="ui black button" href="/dapp/createWorld">
                    Go to country
                    <i aria-hidden="true" className="angle right icon" />
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img src="https://cdn.dribbble.com/users/329207/screenshots/4079633/2001_bemocs_space_park_starlight_station_dribbble_1x.jpg" />
                </div>
                <div className="content">
                  <div className="header">Crypto.Island</div>
                  <div className="meta">
                    <a>
                      President:
                      <span className="ui link owner">Code.King</span>
                    </a>
                  </div>
                  <div className="description">
                    Crypto currencies are accepted to trade and buy goods in
                    this country
                  </div>
                </div>
                <div className="extra content value-content">
                  <div className="ui two column grid">
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Reserved Bank</div>
                          <span className="value-description">
                            Eth: 19,934.23
                          </span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Population</div>
                          <span className="value-description">250,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Estimated value</div>
                          <span className="value-description">Eth: 40,000</span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Theme</div>
                          <span className="value-description">Futuristic</span>
                        </div>
                      </div>
                    </div>
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
                <div className="ui basic segment button-group-section">
                  <a className="ui black button" href="/dapp/createWorld">
                    Go to country
                    <i aria-hidden="true" className="angle right icon" />
                  </a>
                </div>
              </div>
              <div className="card">
                <div className="image">
                  <img src="https://cdn.dribbble.com/users/329207/screenshots/4232597/2001_bemocs_sp_lunar_woods_dribbble_1x.jpg" />
                </div>
                <div className="content">
                  <div className="header">Crypto.Forest</div>
                  <div className="meta">
                    <a>
                      President:
                      <span className="ui link owner">Code.King</span>
                    </a>
                  </div>
                  <div className="description">
                    Crypto currencies are accepted to trade and buy goods in
                    this country
                  </div>
                </div>
                <div className="extra content value-content">
                  <div className="ui two column grid">
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Reserved Bank</div>
                          <span className="value-description">
                            Eth: 19,934.23
                          </span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Population</div>
                          <span className="value-description">250,000</span>
                        </div>
                      </div>
                    </div>
                    <div className="column">
                      <div role="list" className="ui list">
                        <div role="listitem" className="item">
                          <div className="header">Estimated value</div>
                          <span className="value-description">Eth: 40,000</span>
                        </div>
                        <div role="listitem" className="item">
                          <div className="header">Theme</div>
                          <span className="value-description">Futuristic</span>
                        </div>
                      </div>
                    </div>
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
                <div className="ui basic segment button-group-section">
                  <a className="ui black button" href="/dapp/createWorld">
                    Go to country
                    <i aria-hidden="true" className="angle right icon" />
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

export default AuthConnect(Countries);
