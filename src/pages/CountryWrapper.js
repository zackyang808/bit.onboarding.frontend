import React from "react";
import { fetchAPI } from "../utils/FetchUtil";
import ENDPOINTS from "../config/endpoints";
import { DAppConnect } from "./DAppWrapper";
import { AuthConnect } from "./AuthWrapper";
import { navigate } from "@reach/router";
import Notification from "./Notification";
import { Spin } from "antd";


const defaultState = {
  country: null,
  themeUrl: "",
  isOwner: false,
  loading: true
};

const CountryContext = React.createContext(defaultState);

class CountryWrapper extends React.PureComponent {
  state = defaultState;

  componentDidMount() {
    if (!this.props.loggedIn) {
      navigate("/dapp/login");

      return;
    }

    this.loadData();
  }

  loadData = async () => {
    this.setState({
      loading: true
    });

    await this.loadCountryById();

    this.setState({
      loading: false
    });
  }

  loadCountryById = async () => {
    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_COUNTRY}?countryId=${this.props.id}`
      );

      if (!response.isSuccess) {
        throw Error("Error while retrieving country data");
      }

      // TODO: isOwner can be removed from here.
      this.setState({
        country: response.country,
        isOwner: response.country.ownerAddress == this.props.address
      });
    } catch (error) {
      Notification.displayErrorMessage(error.message);

      navigate("/dapp/login");
    }
  }

  render() {
    const { 
      children,
      loggedIn,
    } = this.props;
    const {
      loading
    } = this.state;

    return loading || !loggedIn ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
          <Spin size="large" />
        </div>
      ) : (
        <CountryContext.Provider value={this.state}>
          {children}
        </CountryContext.Provider>
      );
  }
}

export const CountryConnect = WrappedComponent => props => (
  <CountryContext.Consumer>
    {value => <WrappedComponent {...value} {...props} />}
  </CountryContext.Consumer>
);

export default DAppConnect(AuthConnect(CountryWrapper))
