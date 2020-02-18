import React, { Component } from "react";
import BlockCard from "./BlockCard";
import { Row, Col } from "antd";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import { navigate } from "../../../node_modules/@reach/router";
import Notification from "../Notification";
import { CountryConnect } from "../CountryWrapper";

class BlockNavigation extends Component {
  // TODO: Your code here
  state = {
    centerBlock: this.props.blockDetail,
    surroundingBlocks: [],
    loading: false
  }

  loadSurroundingBlocks = async () => {
    this.setState({
      loading: true
    });

    try {
      const response = await fetchAPI(`${ENDPOINTS.GET_SURROUNDING_BLOCKS_BY_BLOCK}?blockId=${this.state.centerBlock.id}&countryId=${this.props.country.id}`);
      if (!response.isSuccess) {
        throw new Error(response.message);
      }

      this.setState({
        surroundingBlocks: response.blocks,
      });
    }
    catch (error) {
      Notification.displayErrorMessage(`Error occured when retrieving block data. ${error.message}`);
    }
    finally {
      this.setState({
        loading: false
      });
    }
  }

  updateCenterBlock = (block) => {
    if (block.id !== this.state.centerBlock.id) {
      this.setState({centerBlock:block},this.loadSurroundingBlocks);
    }
  }

  componentDidMount() {
    this.loadSurroundingBlocks();
  }

  render() {
    let rows = [];
    const { centerBlock, surroundingBlocks } = this.state;
    var blockTemp;

    try {
      for (let j = centerBlock.blockYxis + 1; j >= centerBlock.blockYxis - 1; j--) {
        for (let i = centerBlock.blockAxis - 1; i <= centerBlock.blockAxis + 1; i++) {
          for (let x = 0; x < surroundingBlocks.length; x++) {
            const element = surroundingBlocks[x];
            if (element.blockAxis == i && element.blockYxis == j) {
              blockTemp = element;
              break;
            }
            else {
              blockTemp = null;
            }
          }
          rows.push(
            <Block key={Math.random()} currentBlock={blockTemp} updateCenterBlock={this.updateCenterBlock} />
          );
        }
      }
    } catch (error) {
      Notification.displayErrorMessage(`Error occured when rendering blocks. ${error.message}`);
    }

    return (
      <div className="ui three column grid block-nav-grid">
        {rows}
      </div>
    );
  }
}

const Block = (props) => {
  const { currentBlock } = props;
  return (
    <div className="column">
      <div className="block-box">
        {
          currentBlock ?
            <div className="block-text" onClick={() => { props.updateCenterBlock(currentBlock) }}>
              {`${currentBlock.name} ${currentBlock.blockAxis},${currentBlock.blockYxis}`}
            </div>
            :
            ''
        }
      </div>
    </div>
  );
}

export default CountryConnect(BlockNavigation);
