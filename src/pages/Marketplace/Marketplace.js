import React, { Component } from "react";
import TopNavigationBar from "./../TopNavigationBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Utils from "../../utils/Utils";
import Pagination from "react-js-pagination";
import ENDPOINTS from "../../config/endpoints";
import { fetchAPI } from "../../utils/FetchUtil";

export default class MarketPlace extends Component {
  state = {
    currentIndex: 0,
    searchResult: []
  };


  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ currentIndex: pageNumber });
  }

  componentDidMount() {
    fetchAPI(`${ENDPOINTS.SEARCH_COUNTRIES}?offset=${0}`)
      .then(data => {
        console.log(data);
        if (data.isSuccess) {
          this.setState({
            searchResult: this.state.searchResult.concat(data.countries)
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderSearchResult = () => { }

  render() {
    const searchResults = this.state.searchResult.map((item, index) => (
      <div className="card">
        <div className="image">
          <img src={Utils.getTheme(item.theme)} />
        </div>
        <div className="content">
          <div className="header">{item.name}</div>
          <div className="meta">
            <a>
              President:
              <span className="ui link owner">{item.president}</span>
            </a>
          </div>
          <div className="description">{item.description}</div>
        </div>
        <div className="extra content value-content">
          <div className="ui two column grid">
            <div className="column">
              <div role="list" className="ui list">
                <div role="listitem" className="item">
                  <div className="header">Reserved Bank</div>
                  <span className="value-description">Eth: 19,934.23</span>
                </div>
                <div role="listitem" className="item">
                  <div className="header">Population</div>
                  <span className="value-description">{item.population}</span>
                </div>
              </div>
            </div>
            <div className="column">
              <div role="list" className="ui list">
                <div role="listitem" className="item">
                  <div className="header">Estimated value</div>
                  <span className="value-description">
                    Eth: {item.estimatedValue}
                  </span>
                </div>
                <div role="listitem" className="item">
                  <div className="header">Theme</div>
                  <span className="value-description">Futuristic</span>
                </div>
              </div>
            </div>
          </div>
          <div className="ui list buy-country">
            <div className="item">
              Value: <br />
              ETH: {item.estimatedValue}
            </div>
            <div className="item sub-text">
              Estimated value after purchase: <br />
              ETH:{" "}
              {(
                item.estimatedValue +
                item.estimatedValue * (20 / 100)
              ).toFixed(5)}
            </div>
            <div className="item">
              <button className="ui black button">Buy</button>
            </div>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="ui vertical segment">
        <TopNavigationBar />
        <div className="ui divider" />
        <div className="ui marketplace segment noBorder">
          <div className="ui container">
            <div className="ui content header basic segment center aligned">
              <h2>Marketplace</h2>
            </div>
            <div>
              <div className="search-bar-container">
                <div className="search-bar-icon">
                  <FontAwesomeIcon icon="search" />
                </div>
                <input
                  type="text"
                  className="search-bar-input"
                  placeholder="Search"
                  autocomplete="off"
                  autocorrect="off"
                  autocapitalize="off"
                  spellcheck="false"
                  value=""
                />
                <div className="search-bar-filter">
                  <button className="search-bar-button">
                    filter
                    <FontAwesomeIcon icon="sliders-h" />
                  </button>
                </div>
              </div>
              <div className="ui stackable four cards">
                {searchResults.length > 0 ? (
                  searchResults
                ) : (
                    <h3 className="ui header center aligned margined">
                      There is no available result.
                  </h3>
                  )}
              </div>
              <div className="pagination-container">
                <Pagination
                  activePage={this.state.currentIndex}
                  itemsCountPerPage={8}
                  totalItemsCount={this.state.searchResult.length}
                  pageRangeDisplayed={5}
                  onChange={this.handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
