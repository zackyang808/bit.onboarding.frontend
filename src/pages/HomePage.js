import React, { Component } from "react";
import logo from "../../src/logo.svg";
import "../../src/App.css";
import TopBanner from "./TopBanner";
import CountryFeature from "./CountryFeature";
import TopCountry from "./TopCountry";
import MarketPlace from "./MarketPlace";
import Roadmap from "./Roadmap";
import FeatureOne from "./FeatureOne";
import BuyNow from "./BuyNow";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { navigate } from "@reach/router";

export default class HomePage extends React.Component {
  toastId = null;

  notifyWeb3Connecting = () =>
    (this.toastId = toast("Connecting to the Blockchain...", {
      autoClose: false
    }));
    
  web3Connected = message =>
    toast.update(this.toastId, {
      render: "Connected to " + message,
      type: toast.TYPE.SUCCESS,
      autoClose: 3000
    });

  web3Fail = () =>
    toast.update(this.toastId, {
      render:
        "Fail to connect to Blockchain, please use Metamask or Mist browser",
      type: toast.TYPE.ERROR,
      autoClose: 3000
    });

  render() {
    {
      this.notifyWeb3Connecting();

      setTimeout(() => {
        if (typeof window.ethereum !== "undefined") {
          window.ethereum.enable().then(() =>
            {
              this.web3Connected();
              const netId = window.ethereum.networkVersion;
              let networkName = "";
              switch (netId) {
                case "1":
                  networkName = "Main";
                  this.web3Connected(networkName);
                  break;
                case "2":
                  networkName = "Morden";
                  this.web3Connected(networkName);
                  break;
                case "3":
                  networkName = "Ropsten";
                  this.web3Connected(networkName);
                  break;
                case "4":
                  networkName = "Rinkeby";
                  this.web3Connected(networkName);
                  break;
                case "42":
                  networkName = "Kovan";
                  this.web3Connected(networkName);
                  break;
                default:
                  networkName = "Unknown";
                  this.web3Fail();
                  break;
              }
            },
            () => {
              this.web3Fail();
            });
        } else {
          this.web3Fail();
        }
      }, 4000);
    }
    return (
      <div>
        <TopBanner />
        <CountryFeature />
        <TopCountry />
        <MarketPlace />
        <FeatureOne />
        <Roadmap />
        <BuyNow />
        <Footer />
      </div>
    );
  }
}
