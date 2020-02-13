import React from "react";
import IncorrectNetwork from "./Account/IncorrectNetwork";
import AccountLocked from "./Account/AccountLocked";
import UnsupportedBrowser from "./Account/UnsupportedBrowser";
import { Spin } from "antd";

const defaultState = {
  address: "",
  loadingDApp: true,
  incorrectNetwork: false,
  accountLocked: false,
  unsupportedBrowser: false
};

const DAppContext = React.createContext(defaultState);

export default class DApp extends React.PureComponent {
  state = defaultState;

  componentDidMount() {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum.enable().then(accounts => {
        if (accounts.length > 0) {
          this.setState({
            loadingDApp: false,
            address: window.ethereum.selectedAddress,
            incorrectNetwork: window.ethereum.networkVersion != 4,
          });
        }
      });
    } else {
      this.setState({
        loadingDApp: false,
        unsupportedBrowser: true
      });
    }
  }

  render() {
    const {
      loadingDApp,
      incorrectNetwork,
      accountLocked,
      unsupportedBrowser,
    } = this.state;

    return loadingDApp ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
        <Spin size="large" />
      </div>
    ) : unsupportedBrowser ? (
      <UnsupportedBrowser />
    ) : accountLocked ? (
      <AccountLocked />
    ) : incorrectNetwork ? (
      <IncorrectNetwork />
    ) : (
      <DAppContext.Provider value={this.state}>
        {this.props.children}
      </DAppContext.Provider>
    );
  }
}

export const DAppConnect = WrappedComponent => props => (
  <DAppContext.Consumer>
    {value => <WrappedComponent {...value} {...props} />}
  </DAppContext.Consumer>
);
