import React, { Component } from "react";
import Utils from "../../utils/Utils";
import { navigate } from "@reach/router";
import BlockGrid from "./../Blocks/BlockGrid";
import goldenCrown from "./../../assets/digital-asset-icon/goldenCrown.jpg";
import greenCountry from "./../../assets/digital-asset-icon/greenCountry.jpg";
import honoredKingdom from "./../../assets/digital-asset-icon/honoredKingdom.jpg";
import independenceTreaty from "./../../assets/digital-asset-icon/independenceTreaty.jpg";
import peaceAward from "./../../assets/digital-asset-icon/peaceAward.jpg";
import safeCountry from "./../../assets/digital-asset-icon/safeCountry.jpg";
import unboxTreasure from "./../../assets/digital-asset-icon/unboxTreasure.jpg";
import web3 from "./../../web3";

export default class Country extends Component {
  state = {
    countryStatus: ""
  };

  componentDidMount() {
    if (this.props.country.status == "Pending") {
      web3.eth
        .getTransactionReceipt(this.props.country.txTran)
        .then(e => {
          if (e != null && e.status) {
            this.setState({
              countryStatus: "Confirmed"
            });
          }
        });
    } else {
      this.setState({
        countryStatus: "Confirmed"
      });
    }
  }

  gotoCountry = () => {
    navigate(`/dapp/country/${this.props.country.id}`);
  }

  render() {
    return (
      <div className="card">
        <div className="image">
          <img src={Utils.getTheme(this.props.country.theme)} />
        </div>
        <div className="content">
          <div className="header">{this.props.country.name}</div>
          <div className="meta">
            <a>
              President:
              <span className="ui link owner">
                {this.props.country.president}
              </span>
            </a>
          </div>
          <div className="description">{this.props.country.description}</div>
        </div>
        <div className="extra content value-content">
          <div className="ui two column grid">
            <div className="column">
              <div role="list" className="ui list">
                <div role="listitem" className="item">
                  <div className="header">Reserved Bank</div>
                  <span className="value-description">
                    Eth: {this.props.country.bankBalance}
                  </span>
                </div>
                <div role="listitem" className="item">
                  <div className="header">Population</div>
                  <span className="value-description">
                    {this.props.country.population}
                  </span>
                </div>
              </div>
            </div>
            <div className="column">
              <div role="list" className="ui list">
                <div role="listitem" className="item">
                  <div className="header">Estimated value</div>
                  <span className="value-description">
                    Eth: {this.props.country.estimatedValue}
                  </span>
                </div>
                <div role="listitem" className="item">
                  <div className="header">Theme</div>
                  <span className="value-description">
                    {this.props.country.theme}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.countryStatus == "Confirmed" ? (
          <React.Fragment>
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
              <div>
                <a className="ui black button" onClick={this.gotoCountry}>
                  Go to country<i
                    aria-hidden="true"
                    className="angle right icon"
                  />
                </a>
              </div>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div className="ui blue message transaction-message">
              Your transaction is still pending. <br /> We need at least 2 block
              confirmed
            </div>
            <div className="ui basic segment button-group-section">
              <a className="ui black disabled button">
                Pending<i aria-hidden="true" className="angle right icon" />
              </a>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}
