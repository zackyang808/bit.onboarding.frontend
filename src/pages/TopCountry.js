import React, { Component } from "react";
import Country from "./MyCountry/Country";
import ENDPOINTS from "../config/endpoints";
import { fetchAPI } from "../utils/FetchUtil";

export default class TopCountry extends Component {
  state = {
    countries: []
  };

  componentDidMount() {
    this.loadCountries();
  }

  loadCountries = async () => {
    try {
      const response = await fetchAPI(ENDPOINTS.GET_COUNTRIES);

      if (response.isSuccess && response.countries.length > 0) {
        this.setState({
          countries: this.state.countries.concat(response.countries)
        });
      }
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const countries = this.state.countries.map(
      country => <Country key={country.id} country={country} />
    );

    return (
      <div className="ui top-country segment noBorder">
        <div className="ui container">
          <div className="ui content header basic segment center aligned">
            <h2>Top Bit Countries</h2>
          </div>
          <div>
            <div className="ui stackable four cards">{countries}</div>
          </div>
        </div>
      </div>
    );
  }
}
