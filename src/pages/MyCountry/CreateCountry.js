import React, { Component } from "react";
import { navigate } from "@reach/router";
import { DAppConnect } from "../DAppWrapper";
import { Slider } from "antd";
import TopNavigationBar from "./../TopNavigationBar";
import country from "./../../ethereum/country";
import $ from "jquery";
import Notification from "./../Notification";
import blocks from "../../assets/images/blocks.svg";
import money from "../../assets/images/money.svg";
import exchange from "../../assets/images/exchange.svg";
import Utils from "../../utils/Utils";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";

class CreateCountry extends Component {
  state = {
    blockNumber: 5,
    countryName: "",
    countryDescription: "",
    theme: 1,
    user: this.props.location.state.user,
    totalBlockNumber: 9,
    purchaseToken: 9000,
    tokenPrice: Utils.getCostPerTokenInEther()
  };

  handleSliderChange = e => {
    this.setState({
      purchaseToken: e.target.value
    });
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  getCostFromBlocksInWei = () => {
    return this.state.blockNumber * Utils.getCostPerBlockInWei();
  }

  purchaseBlock = async e => {
    const uniqueId = Math.floor(Math.random() * 2000000000);

    const purchaseButton = e.target;
    $(purchaseButton).addClass("loading");

    if (this.state.countryName == "" || this.state.countryDescription == "") {
      Notification.displayErrorMessage(
        "Please enter all field before creating country"
      );

      $(purchaseButton).removeClass("loading");

      return false;
    } else {
      let countryBlock = {
        countryContractUniqueId: uniqueId,
        countryName: this.state.countryName,
        countryDescription: this.state.countryDescription,
        blockNumber: this.state.totalBlockNumber,
        theme: this.state.theme,
        cost: this.getCostFromBlocksInWei()
      };

      try {
        await country.methods
          .createCountry(
            countryBlock.countryName,
            countryBlock.theme,
            this.props.address
          )
          .send(
            {
              from: this.props.address,
              value: this.getTotalCostInWei(),
              gasPrice: "1500000000",
              gas: "5100000",
              gasLimit: "50000000"
            },
            function (error, result) {
              if (error != null) {
                Notification.displayErrorMessage(
                  "Transaction was rejected by user"
                );
              }
            }
          )
          .on("transactionHash", function (hash) {
            countryBlock.txTran = hash;
            countryBlock.status = "Pending";
            fetchAPI(
              ENDPOINTS.CREATE_COUNTRY, 
              "POST",
              countryBlock
            )
              .then(data => {
                if (data.isSuccess) {
                  Notification.displaySuccessMessage(
                    "Creating country transaction is pending..."
                  );
                  navigate(`/dapp/myCountry`);
                } else {
                  Notification.displayErrorMessage(data.message);
                  $(purchaseButton).removeClass("loading");
                }
              })
              .catch(error => {
                Notification.displayErrorMessage(error);
                $(purchaseButton).removeClass("loading");
              });
          })
          .on("receipt", function (receipt) {
            if (receipt.events.BitCountryCreated != null) {
              const returnCountry = receipt.events.BitCountryCreated;
              const returnValue = returnCountry.returnValues;
              // $(purchaseButton).removeClass("loading");
              // Notification.displaySuccessMessage("Country created");
            }
          })
          .on("error", function (error) {
            $(purchaseButton).removeClass("loading");
            Notification.displayErrorMessage(error.message);
          });
      } catch (error) {
        Notification.displayErrorMessage(
          "We currently only support Chrome desktop with Metamask installed"
        );
      }
    }
  }

  chooseTheme = theme => {
    this.setState({
      theme: theme
    });
  }

  calculateNumberOfResident = () => {
    return this.state.totalBlockNumber * 256;
  }

  calculateEther = () => {
    return (
      this.state.totalBlockNumber * Utils.getCostPerBlockInEther()
    ).toFixed(5);
  }

  calculateTokenPurchased = () => {
    return (this.state.tokenPrice * this.state.purchaseToken).toFixed(5);
  }

  getTotalCost = () => {
    return (
      parseFloat(this.calculateEther()) +
      parseFloat(this.calculateTokenPurchased())
    ).toFixed(5);
  }

  getTotalCostInWei = () => {
    let totalCostInWei = this.getTotalCost() * Math.pow(10, 18);
    return totalCostInWei + parseInt(100);
  }

  render() {
    if (this.state.user == null) {
      navigate("/dapp/myCountry");

      return null;
    } else {
      return (
        <div className="ui vertical segment">
          <TopNavigationBar />
          <div className="ui divider" />
          <div className="ui container hero-content">
            <div className="ui header center aligned">
              <h2>Create your country</h2>
              <p className="ui description">
                The only limit is your imagination
              </p>
            </div>
            <div className="ui segment">
              <div className="ui large form setting-form">
                <div className="field">
                  <label>Country unique identifier</label>
                  <p className="label-explaination">
                    This unique name use to distingush your country
                  </p>
                  <input
                    placeholder="e.g liberworld"
                    name="countryName"
                    onChange={this.handleInputChange}
                    value={this.state.countryName}
                    type="text"
                  />
                </div>
                <div className="field">
                  <label>Country display name</label>
                  <p className="label-explaination">
                    This country display name
                  </p>
                  <input
                    placeholder="e.g Liberland"
                    type="text"
                    name="countryDisplayName"
                    onChange={this.handleInputChange}
                    value={this.state.countryDisplayName}
                  />
                </div>
                <div className="field">
                  <label>Country description</label>
                  <p className="label-explaination">
                    Write some words about your country and attract new
                    residents
                  </p>
                  <textarea
                    placeholder="Country description"
                    rows="3"
                    name="countryDescription"
                    type="textarea"
                    onChange={this.handleInputChange}
                    value={this.state.countryDescription}
                  />
                </div>
                <div className="field">
                  <label>Choose your theme</label>
                  <p className="label-explaination">
                    Add the favour to your country
                  </p>
                  <div className="ui six stackable cards themes-selection">
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/329207/screenshots/4232597/2001_bemocs_sp_lunar_woods_dribbble_1x.jpg" />
                      </div>
                      <div className="content">
                        <a className="header">Forest theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 1 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(1)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/329207/screenshots/3364859/bemocs_rei_end_of_season_dribbble_1x.jpg" />
                      </div>
                      <div className="content">
                        <a className="header">Mountain theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 2 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(2)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/329207/screenshots/3222707/bemocs_rei_january_clearance_dribbble_1x.jpg" />
                      </div>
                      <div className="content">
                        <a className="header">Snow mountain theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 3 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(3)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/329207/screenshots/1805103/bemocs_space_dribbble_1x.jpg" />
                      </div>
                      <div className="content">
                        <a className="header">Space theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 4 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(4)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/329207/screenshots/1928498/bemocs_nhm_seamobile_dribbble_1x.jpg" />
                      </div>
                      <div className="content">
                        <a className="header">Ocean theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 5 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(5)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                    <div className="card">
                      <div className="image">
                        <img src="https://cdn.dribbble.com/users/5031/screenshots/3232835/owl-mikael-gustafsson-dribbble.gif" />
                      </div>
                      <div className="content">
                        <a className="header">Jungle Kingdom theme</a>
                        <div className="description">
                          Some description about this theme
                        </div>
                      </div>
                      <div
                        className={
                          "ui small basic bottom attached button " +
                          (this.state.theme == 6 ? "selected" : "")
                        }
                        onClick={() => this.chooseTheme(6)}
                      >
                        <i className="add icon" />
                        Choose this theme
                      </div>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label>Initial purchase 9 blocks</label>
                  <p className="label-explaination">
                    Each block can have 1 topic and hold maximum 256 residents
                  </p>
                  <p className="label-explaination">
                    You can purchase more additional blocks
                  </p>
                  <div>
                    <label className="ui block-number-display">
                      Block dimension: 3 x 3 = {this.state.totalBlockNumber}{" "}
                      blocks / {this.calculateNumberOfResident()} residents
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label>
                    Each block must have minimum 1000 BTC Token to maintain for
                    residents and topic
                  </label>
                  <p className="label-explaination">
                    All Token purchased will be added to your wallet and the
                    reserved bank
                  </p>
                  <p className="label-explaination">
                    You can purchase more token later
                  </p>
                  <div>
                    <Slider
                      value={this.state.purchaseToken}
                      className="bit-slider"
                      defaultValue={9000}
                      min={9000}
                      max={20000}
                      step={10}
                      onChange={value => this.setState({
                        purchaseToken: value
                      })}
                    />
                  </div>
                  <div className="field block-input">
                    <input
                      className="ui block-text-input"
                      placeholder="Enter number of token"
                      value={this.state.purchaseToken}
                      type="text"
                      onChange={this.handleSliderChange.bind(this)}
                    />
                  </div>
                  {/* <div>
                    <label className="ui block-number-display">
                      BTC Token purchase for reserved bank ={" "}
                      {this.state.purchaseToken}
                    </label>
                  </div> */}
                </div>
                <div className="ui divider" />
                <div className="field">
                  <div className="ui middle aligned animated list">
                    <div className="item">
                      <img className="ui avatar image" src={blocks} />
                      <div className="content">
                        <div className="header">9 Blocks</div>
                        {this.calculateEther()} ETH
                      </div>
                    </div>
                    <div className="item">
                      <img className="ui avatar image" src={money} />
                      <div className="content">
                        <div className="header">
                          {this.state.purchaseToken} BTC Tokens @{" "}
                          {this.state.tokenPrice} ETH
                        </div>
                        {this.calculateTokenPurchased()} ETH
                      </div>
                    </div>
                    <div className="item">
                      <img className="ui avatar image" src={exchange} />
                      <div className="content">
                        <div className="header">Total</div>
                        {this.getTotalCost()} ETH
                      </div>
                    </div>
                  </div>
                </div>
                <div className="ui header">
                  <button
                    className="ui black large inverted button"
                    onClick={this.purchaseBlock}
                  >
                    Purchase Blocks
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default DAppConnect(CreateCountry);
