import React, { Component } from "react";
import { 
  Row,
  Col,
  Spin,
} from "antd";
import "./../../css/NewsFeed.css";
import { navigate, Router } from "../../../node_modules/@reach/router";
import { DAppConnect } from "../DAppWrapper";
import { AuthConnect } from "../AuthWrapper";
import { CountryConnect } from "../CountryWrapper";
import CountryHeader from "../../components/CountryHeader";
import CountryLeftCol from "../../components/CountryLeftCol";
import CountryRightCol from "../../components/CountryRightCol";
import NewsFeed from "./NewsFeed";
import BlockNavigation from "./BlockNavigation";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";

class BlockInterior extends React.PureComponent {
  state = {
    blockDetail: {},
    loading: true
  };

  componentDidMount() {
    this.loadCountryBlockDetails();
  }

  loadCountryBlockDetails = async () => {
    this.setState({
      loading: true
    });

    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_BLOCK_BY_ID}?blockId=${this.props.id}`
      );

      if (!response.isSuccess) {
        throw Error("Error while retrieving block data");
      }

      this.setState({
        blockDetail: response.block,
      });
    } catch (error) {
      throw error;
    } finally {
      this.setState({
        loading: false
      });
    }
  }
  
  render () {
    if (this.state.loading) {
      return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
          <Spin size="large" />
        </div>
      );
    }

    const { country, isOwner, id } = this.props;
    const { blockDetail } = this.state;

    return (
      <div className="page-newsfeed">
        <CountryHeader country={country} />
        <Row className="l-home" gutter={10}>
          <Col 
            className="col-left" 
            xs={24}
            lg={6}
            xxl={4}
          >
            <CountryLeftCol >
                <BlockNavigation blockDetail={blockDetail} />
            </CountryLeftCol>
          </Col>
          <Col 
            className="col-main"
            xs={24}
            lg={12}
            xxl={16}
          >
            <Router>
              <NewsFeed key={id} path="/feed" country={country} blockDetail={blockDetail} isOwner={isOwner} />
            </Router>
          </Col>
          <Col 
            className="col-right"
            xs={24}
            lg={6}
            xxl={4}
          >
            <CountryRightCol blockDetail={blockDetail} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default DAppConnect(AuthConnect(CountryConnect(BlockInterior)));
