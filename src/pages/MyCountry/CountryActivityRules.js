import React, { Component } from "react";
import Utils from "../../utils/Utils";
import BlockGrid from "./../Blocks/BlockGrid";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import TopNavigationBar from "./../TopNavigationBar";
import { navigate } from "@reach/router";
import { Row, Col, Button, Input, Tooltip, Select, Icon, Title } from "antd";

const { Option } = Select;
const countryCurrencyUnitMockData = ["tokens", "coins", "golds"];
const rulesMockData = { story: 0, storyLike: 0, storyView: 0 };
export default class CountryActivityRules extends Component {
  state = {
    rules: {}
  };

  componentDidMount() {
    this.loadRulesByCountryId();
  }

  loadRulesByCountryId = async () => {
    try {
      const response = await fetchAPI(
        `${ENDPOINTS.GET_RULES_BY_COUNTRY}?countryId=${this.props.location.state.country.id}`
      );
      if (response && response.isSuccess) {
        const rulesObject = Object.assign({}, response.rules);
        this.setState({ rules: rulesObject });
      }
    } catch (error) {
      this.setState({ rules: rulesMockData });
      console.log("DEBUG--CountryActivityRules: " + error);
    }
  };

  onBlur = async (e, title) => {
    let { value } = e.target;
    if (value.charAt(value.length - 1) === "." || value === "-") {
      value = value.slice(0, -1);
      const newRules = Object.assign({}, this.state.rules);
      newRules[title] = value;
      this.setState({ rules: newRules });
    }
    try {
      const response = await fetchAPI(
        ENDPOINTS.UPDATE_RULES,
        "POST",
        this.state.rules
      );
    } catch (error) {
      console.log("DEBUG--CountryActivityRules: " + error);
    }
  };

  onChange = (e, title) => {
    let { value } = e.target;
    const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/; ///no need of sign
    if ((!isNaN(value) && reg.test(value)) || value === "" || value === "-") {
      const newRules = Object.assign({}, this.state.rules);
      newRules[title] = value;
      this.setState({ rules: newRules });
    }
  };

  handleButtonClick = (e, title) => {
    let newValue =
      e.target.id === "plus"
        ? Math.abs(this.state.rules[title])
        : -1 * Math.abs(this.state.rules[title]);
    const newRules = Object.assign({}, this.state.rules);
    newRules[title] = newValue;
    this.setState({ rules: newRules });
  };

  handleMenuClick = e => {
    console.log("click", e);
  };

  onSelectChange = (value, title) => {};

  goBackCountry = () => {
    navigate(`/dapp/country/${this.props.location.state.country.id}`);
  };

  render() {
    const options = countryCurrencyUnitMockData.map(unitItem => {
      return (
        <Option value={unitItem} id={unitItem} key={unitItem}>
          <Icon type="gold" />
          {unitItem}
        </Option>
      );
    });
    const rulesObject = this.state.rules;
    const rulesTitles = Object.keys(rulesObject);

    const content = rulesTitles.map((title, index) => {
      if (title !== "id" && title !== "countryId" && title !== "isDeleted") {
        return (
          <Row type="flex" justify="center" key={index} className="textRow">
            <Col span={4} offset={2}>
              {title}
            </Col>
            <Col span={5}></Col>
            <Col span={1}>
              <Button
                type="default"
                icon="plus"
                size="small"
                className={`iconbutton ${
                  Math.sign(rulesObject[title]) === 1 ? "plusselected" : ""
                }`}
                id="plus"
                onClick={e => this.handleButtonClick(e, title)}
              />
            </Col>
            <Col span={1}>
              <Button
                type="default"
                icon="minus"
                size="small"
                className={`iconbutton ${
                  Math.sign(rulesObject[title]) === -1 ? "minusselected" : ""
                }`}
                id="minus"
                onClick={e => this.handleButtonClick(e, title)}
              />
            </Col>

            <Col span={2}>
              <Tooltip
                trigger={["focus"]}
                placement="center"
                overlayClassName="numeric-input"
              >
                <Input
                  style={{ width: 120 }}
                  value={rulesObject[title]}
                  onChange={e => this.onChange(e, title)}
                  onBlur={e => this.onBlur(e, title)}
                  placeholder="Input a value"
                  maxLength={25}
                />
              </Tooltip>
            </Col>
            <Col span={3} offset={-2}>
              <Select
                showSearch
                style={{ width: 120 }}
                value={"tokens"}
                onChange={value => this.onSelectChange(value, title)}
                className="selectBox"
                disabled
              >
                {options}
              </Select>
            </Col>
          </Row>
        );
      }
    });

    return (
      <div>
        <TopNavigationBar />
        <div className="hero-content">
          <div className="center aligned">
            <h2>
              <span className="countryNameInTitle">
                {this.props.location.state.country.name}
              </span>{" "}
              Activity Rules
            </h2>
            <h5 className="">You are the rules maker</h5>
          </div>
          <div className="contentDiv">{content}</div>

          <Row type="flex" justify="center" className="textRow">
            <Button
              type="primary"
              onClick={() => {
                this.goBackCountry();
              }}
            >
              <Icon type="left" />
              Go back country
            </Button>
          </Row>
        </div>
      </div>
    );
  }
}
