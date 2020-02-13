import React, { Component } from "react";
import { Router } from "@reach/router";
import DAppWrapper from "./pages/DAppWrapper";
import AuthWrapper from "./pages/AuthWrapper";
import HomePage from "./pages/HomePage";
import CreateCountry from "./pages/MyCountry/CreateCountry";
import Footer from "./pages/Footer";
import AddAccountSetting from "./pages/Account/AddAccountSetting";
import WelcomeToCountry from "./pages/MyCountry/WelcomeToCountry";
import Login from "./pages/Account/Login";
import MyCountries from "./pages/MyCountry/MyCountries";
import ViewCountry from "./pages/MyCountry/ViewCountry";
import Countries from "./pages/Countries";
import { ToastContainer } from "react-toastify";
import TestNewCountry from "./pages/MyCountry/TestNewCountry";
import PostDetail from "./pages/NewsFeed/PostDetail";
import Marketplace from "./pages/Marketplace/Marketplace";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faSlidersH } from "@fortawesome/free-solid-svg-icons";
import CountryWrapper from "./pages/CountryWrapper";
import BlockInterior from "./pages/NewsFeed/BlockInterior";
import CountryActivityRules from "./pages/MyCountry/CountryActivityRules";
import Invitation from "./pages/MyCountry/Invitation";
import WelcomePage from "./pages/MyCountry/WelcomePage";

//Add fontAwesome icon to use across the site
// example of usage in /pages/Marketplace/Marketplace.js
//for reference, please look at this https://github.com/FortAwesome/react-fontawesome
library.add(faSearch, faSlidersH);

class App extends Component {
  render() {
    return (
      <AuthWrapper>
        <ToastContainer
          className="success-notification-background"
          toastClassName="custom-success-toast"
        />
        <Router>
          <HomePage path="/" exact />
          <DAppWrapper path="/dapp">
            <AddAccountSetting path="/setting" />
            <Login path="/login" default />
            <CreateCountry path="/createWorld" />
            <WelcomeToCountry path="/newCountry" />
            <MyCountries path="/myCountry" />
            <Countries path="/countries" />
            <CountryWrapper path="/country/:id">
              <TestNewCountry path="/" />
              <BlockInterior path="/block/:id/*" />
              <PostDetail path="/postDetail/:id" />
              <Invitation path="/invitation" />
            </CountryWrapper>
            <WelcomePage path="/welcome/:id/:userId" />
            <Marketplace path="/marketplace" />
            <CountryActivityRules path="/countryRules/edit" />
          </DAppWrapper>
        </Router>
      </AuthWrapper>
    );
  }
}

export default App;
