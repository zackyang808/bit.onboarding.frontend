import React, { Component } from "react";
import { Link, navigate, Redirect} from "@reach/router";
import { Slider } from "antd";
import TopNavigationBar from "./../TopNavigationBar";
import AddAccountSetting from "./../Account/AddAccountSetting";
import country from "./../../ethereum/country";
import { ToastContainer, toast } from "react-toastify";
import $ from "jquery";
import { DAppConnect } from "../DAppWrapper";

class CountryList extends Component {
  state = {
    blockNumber: 1,
    countryName: "",
    countryDescription: "",
    theme: 1,
    user: null
  };

  displaySuccessMessage = message => {
    toast(message, {
      type: toast.TYPE.SUCCESS,
      autoClose: 4000
    });
  }

  displayErrorMessage = message => {
    toast(message, {
      type: toast.TYPE.ERROR,
      autoClose: 4000
    });
  }

  componentDidMount() {
    if (this.props.location.state != null) {
      this.setState({
        user: this.props.location.state.user
      });
    }
  }

  handleSliderChange = ({ target: { value } }) => {
    this.setState({
      blockNumber: value
    });
  }

  handleInputChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value
    });
  }

  getCostFromBlocksInWei = () => {
    return this.state.blockNumber * 10000000000000000;
  }

  purchaseBlock = async ({ target: purchaseButton }) => {
    $(purchaseButton).addClass("loading");
    
    if (this.state.countryName == "" || this.state.countryDescription == "") {
      alert("Please enter all field before creating country");
    } else {
      let countryBlock = {
        countryName: this.state.countryName,
        countryDescription: this.state.countryDescription,
        blockNumber: this.state.blockNumber,
        theme: this.state.theme,
        cost: this.getCostFromBlocksInWei()
      };
      try {
        await country.methods
          .createCountry(
            countryBlock.countryName,
            countryBlock.theme,
            countryBlock.blockNumber,
            this.props.address
          )
          .send(
            {
              from: this.props.address,
              value: countryBlock.cost,
              gasPrice: "1000000000",
              gas: "5000000",
              gasLimit: "40000000"
            },
            function(error, result) {
              if (error != null) {
                this.displayErrorMessage("Transaction was rejected by user");
              }
            }
          )
          .on("transactionHash", function(hash) {
            console.log(hash);
          })
          .on("receipt", function(receipt) {
            console.log(receipt);
            if (receipt.events.CountryCreated != null) {
              const returnCountry = receipt.events.CountryCreated;
              const returnValue = returnCountry.returnValues;
              console.log(returnValue);
              $(purchaseButton).removeClass("loading");
              this.displaySuccessMessage("Country created");
            }
          })
          .on("error", function(error) {
            console.error(error);
            $(purchaseButton).removeClass("loading");
            this.displayErrorMessage(error.message);
          });
        this.props.history.push("/dapp/newCountry", {
          countryBlock: countryBlock
        });
      } catch (error) {
        this.displayErrorMessage(
          "We currently only support Chrome desktop with Metamask installed"
        );
      }
    }
  }

  chooseTheme(theme) {
    console.log(theme);
    this.setState({
      theme: theme
    });
  }

  calculateNumberOfResident = () => {
    return this.state.blockNumber * 256;
  }

  calculateEther = () => {
    return this.state.blockNumber / 100;
  }
  
  render() {
    if (this.state.user == null) {
      navigate("/dapp/setting");
      return <AddAccountSetting/>;
    } else {
      return (
        <div className="ui vertical segment">
          <ToastContainer
            className="success-notification-background"
            toastClassName="custom-success-toast"
          />
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
                  <label>Slide or Enter number of blocks</label>
                  <p className="label-explaination">
                    Each block can hold maximum 256 residents
                  </p>
                  <div>
                    <Slider
                      value={this.state.blockNumber}
                      className="bit-slider"
                      defaultValue={1}
                      min={1}
                      max={256}
                      step={1}
                      onChange={value => this.setState({
                        blockNumber: value
                      })}
                    />
                  </div>
                  <div className="field block-input">
                    <input
                      className="ui block-text-input"
                      placeholder="Enter block number"
                      value={this.state.blockNumber}
                      max={256}
                      defaultValue="1"
                      type="text"
                      onChange={this.handleSliderChange.bind(this)}
                    />
                  </div>
                  <div>
                    <label className="ui block-number-display">
                      {this.state.blockNumber} blocks /{" "}
                      {this.calculateNumberOfResident()} residents
                    </label>
                  </div>
                </div>
                <div className="field ui header center aligned">
                  <h3 className="ui total-payable-number-display">
                    Total: {this.calculateEther()} ETH
                  </h3>
                </div>
                <div className="ui header center aligned">
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

export default DAppConnect(CountryList);
