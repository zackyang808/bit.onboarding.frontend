import React, { Component } from "react";
import $ from "jquery";
import { Modal } from "antd";
import Cookies from "js-cookie";
import { navigate } from "@reach/router";
import Notification from "./../Notification";
import country from "./../../ethereum/country";
import Utils from "../../utils/Utils";
import { fetchAPI } from "../../utils/FetchUtil";
import ENDPOINTS from "../../config/endpoints";
import { DAppConnect } from "../DAppWrapper";

class BlockGrid extends Component {
  // populateCountryBlock = () => {
  //   let numberOfBlockInt = Math.pow(parseInt(this.props.numberOfBlock), 2);
  //   let i = 0;

  //   $(".block-grid .block-item").each(function(index) {
  //     index++;
  //     const item = $(this);
  //     const speed = 250; //initial 3 mili seconds
  //     if (index >= 0 && index <= numberOfBlockInt) {
  //       setTimeout(function() {
  //         item.addClass("isOccupied");
  //       }, i * speed);
  //       i++;
  //     }
  //   });
  // }

  blockInTopic(obj, list) {
    for (let i = 0; i < list.length; i++) {
      if (list[i].blockAxis === obj.x && list[i].blockYxis == obj.y) {
        return true;
      }
    }

    return false;
  }

  render() {
    const {
      address
    } = this.props;

    let blockNumber = this.props.numberOfBlock;
    let dimension = blockNumber;
    let centerPoint = 0;
    let step = 1;
    // switch (blockNumber) {
    //   case 9:
    //     step = 1;
    //     break;
    //   case 25:
    //     step = 2;
    //     break;
    //   case 49:
    //     step = 3;
    //     break;
    //   default:
    //     step = 1;
    //     break;
    // }
    let blockDetails = this.props.countryBlockDetails || [];
    let blocks = this.props.countryBlocks || [];
    let isOwner = this.props.isOwner;
    let rows = [];
    for (let i = 6; i >= -6; i--) {
      for (let j = -6; j <= 6; j++) {
        let enabled = false;

        //Logic to generate 9 blocks in the center start from central point
        //Justin removed this logic - initial block already in the smart contract and the logic in smart contract
        //saving block in middle of the screen
        // if (
        //   i >= centerPoint - step &&
        //   i <= centerPoint + step &&
        //   (j <= centerPoint + step && j >= centerPoint - step)
        // ) {
        //   enabled = true;
        // }

        let numberOfResidents = 0;
        let hasTopic = false;
        let topicName = "No topic";
        let blockId = "";
        let blockOwner = "";
        let blockNumber = -1;
        let status = "";
        for (let z = 0; z < blocks.length; z++) {
          //Display block detail
          if (blocks[z].axis === j && blocks[z].yAxis == i) {
            blockOwner = blocks[z].blockOwner;
            blockNumber = blocks[z].blockNumber;
            enabled = true;
            status = blocks[z].status;
          }
          //Display topic in the block
          if (
            blockDetails[z] != null &&
            blockDetails[z].blockAxis === j &&
            blockDetails[z].blockYxis == i
          ) {
            numberOfResidents = blockDetails[z].totalResidents;
            hasTopic = true;
            topicName = blockDetails[z].name;
            blockId = blockDetails[z].id;
          }
        }

        rows.push(
          <Block
            key={Math.random()}
            axis={j}
            yxis={i}
            blockWidth={100 / 13}
            countryName={this.props.countryName}
            countryId={this.props.countryId}
            countryIndex={this.props.countryIndex}
            numberOfResidents={numberOfResidents}
            hasTopic={hasTopic}
            topicName={topicName}
            blockId={blockId}
            enabled={enabled}
            blockOwner={blockOwner}
            blockNumber={blockNumber}
            address={address}
            isOwner={isOwner}
            status={status}
            navigate={this.props.navigate}
            onUpdate={this.props.onBlockUpdate}
          />
        );
      }
      //   rows.push(<Row />);
    }

    let gridSize = 40 + "%";
    if (blockNumber <= 8) {
      gridSize = 40 + "%";
    } else if (blockNumber > 8 && blockNumber <= 10) {
      gridSize = 70 + "%";
    } else {
      gridSize = 100 + "%";
    }
    let gridStyle = {
      width: 100 + "%",
      margin: "0 auto"
    };
    return (
      <div className="ui segment" style={gridStyle}>
        <div className="ui grid block-grid ten column row">{rows}</div>
      </div>
    );
  }
}

export default DAppConnect(BlockGrid);

export class Block extends Component {
  state = {
    isTopicModalOpen: false,
    isPurchaseBlockModalOpen: false,
    topicName: "",
    topicDescription: ""
  };

  createTopic = async e => {
    let topicObj = {
      blockAxis: this.props.axis,
      blockYxis: this.props.yxis,
      countryName: this.props.countryName,
      countryId: this.props.countryId,
      name: this.state.topicName,
      description: this.state.topicDescription,
      blockNumber: this.props.blockNumber
    };

    let createTopicButton = e.target;

    try {
      const response = await fetchAPI(
        ENDPOINTS.CREATE_TOPIC,
        "POST",
        topicObj
      )

      if (!response.isSuccess) {
        $(createTopicButton).removeClass("loading");

        Notification.displayErrorMessage("Error creating topic");

        return;
      }

      Notification.displaySuccessMessage("Topic created");

      this.props.navigate(`block/${response.topic.id}/feed`);
    } catch (error) {
      $(createTopicButton).removeClass("loading");

      Notification.displayErrorMessage("Error creating topic");
    }
  }

  handleInputChange = e => {
    const target = e.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  toggleTopicModal = () => {
    const {
      enabled,
      isOwner,
      hasTopic,
      isTopicModalOpen,
      blockId
    } = this.props;

    if (enabled && !hasTopic && isOwner) {
      this.setState({
        isTopicModalOpen: !this.state.isTopicModalOpen
      });
    } else {
      this.props.navigate(`block/${blockId}/feed`);
    }
  }

  togglePurchaseBlockModal = () => {
    const { enabled, isOwner } = this.props;
    if (!enabled && isOwner) {
      this.setState({
        isPurchaseBlockModalOpen: !this.state.isPurchaseBlockModalOpen
      });
    }
  }

  getCostOfBlockPurchase() {
    return (
      Utils.getCostPerBlockInEther() +
      Utils.getTokenRequiredPerBlock(1) * Utils.getCostPerTokenInEther()
    ).toFixed(5);
  }

  getCostOfBlockPurchaseInWei() {
    return (
      Utils.getCostPerBlockInWei() +
      Utils.getTokenRequiredPerBlock(1) * Utils.getCostPerTokenInWei() +
      100
    );
  }

  purchaseBlock = e => {
    const purchaseButton = e.target;
    const {
      address
    } = this.props;

    $(purchaseButton).addClass("loading");

    let additionalBlock = {
      axis: this.props.axis,
      yaxis: this.props.yxis,
      countryId: this.props.countryId,
      countryIndex: this.props.countryIndex
    };

    const costForBlockAndToken = this.getCostOfBlockPurchaseInWei();
    country.methods
      .purchaseBlockToCountry(
        additionalBlock.axis,
        additionalBlock.yaxis,
        additionalBlock.countryIndex
      ).send(
        {
          from: address,
          value: costForBlockAndToken,
          gasPrice: "1800000000",
          gas: "7000000",
          gasLimit: "1800000000"
        },
        (error, result) => {
          if (error != null) {
            Notification.displayErrorMessage(
              "Transaction was rejected by user"
            );
          }
        }
      ).on("transactionHash", async hash => {
        additionalBlock.txTran = hash;

        try {
          const response = await fetchAPI(
            ENDPOINTS.PURCHASE_BLOCK, 
            "POST",
            additionalBlock
          );

          if (!response.isSuccess) {
            $(purchaseButton).removeClass("loading");

            Notification.displayErrorMessage(response.message);
            
            return;
          }

          $(purchaseButton).removeClass("loading");
            
          Notification.displaySuccessMessage(
            "Adding new block transaction is pending..."
          );

          this.setState({
            isPurchaseBlockModalOpen: false
          });

          this.props.onUpdate();
        } catch (error) {
          $(purchaseButton).removeClass("loading");

          Notification.displayErrorMessage(error);
        };
      }).on("receipt", receipt => {
        console.log(receipt);

        Notification.displaySuccessMessage("Block created");
      }).on("error", error => {
        console.error(error);

        $(purchaseButton).removeClass("loading");

        Notification.displayErrorMessage(error.message);
      })
  }

  render() {
    const widthPercentage = this.props.blockWidth + "%";
    const colorBlock = "rgb(30,136,229,." + this.props.numberOfResidents + ")";
    
    return (
      <div
        className={
          "block-box " +
          (this.props.enabled ? "enabled" : "disabled") +
          (this.props.status == "Pending" ? " pending" : "")
        }
        style={{ width: widthPercentage }}
      >
        {this.props.enabled ? (
          this.props.status == "Completed" ? (
            <div
              className="block-item"
              data-tooltip={
                "Topic: " +
                this.props.topicName +
                " - Total residents: " +
                this.props.numberOfResidents +
                " - Block number: " +
                this.props.blockNumber +
                " - Block owner: " +
                this.props.blockOwner
              }
              data-position="top center"
              onClick={this.toggleTopicModal}
              style={{ backgroundColor: colorBlock }}
            />
          ) : (
              <div
                className="block-item"
                data-tooltip={"Status: Pending"}
                data-position="top center"
                onClick={this.toggleTopicModal}
                style={{ backgroundColor: colorBlock }}
              />
            )
        ) : (
            <div
              className="block-item"
              onClick={this.togglePurchaseBlockModal}
              style={{ backgroundColor: colorBlock }}
              data-tooltip={
                this.props.isOwner
                  ? "Purchase this block"
                  : "Only owner can purchase this block"
              }
            />
          )}

        <Modal
          className="create-topic-modal"
          title="Create new topic"
          visible={this.state.isTopicModalOpen}
          okText="Create topic"
          onOk={this.createTopic}
          cancelText="Cancel"
          onCancel={this.toggleTopicModal}
        >
          This block haven't defined any topic. You can set the topic for this
          block
          <form className="ui form">
            <div className="field">
              <label>Topic name</label>
              <input
                type="text"
                name="topicName"
                placeholder="Topic name"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="field">
              <label>Topic description</label>
              <textarea
                name="topicDescription"
                placeholder="Topic description"
                rows="2"
                onChange={this.handleInputChange}
              />
            </div>
          </form>
        </Modal>

        <Modal
          className="purchase-block-modal"
          title="Available block to purchase"
          visible={this.state.isPurchaseBlockModalOpen}
          okText={`Purchase block ( ${this.getCostOfBlockPurchase()} Eth )`}
          onOk={this.purchaseBlock}
          cancelText="Cancel"
          onCancel={this.togglePurchaseBlockModal}
        >
          You can extend the capacity of your country by purchasing this block
          <div className="ui list">
            <b>Block position:</b>
            <div className="item">Axis: {this.props.axis}</div>
            <div className="item">Yxis: {this.props.yxis}</div>
          </div>
          <h4>
            Cost: {Utils.getCostPerBlockInEther()} Eth per block (included
            1000 BitCountry Token @ {Utils.getCostPerTokenInEther()} Eth)
          </h4>
        </Modal>
      </div>
    );
  }
}
