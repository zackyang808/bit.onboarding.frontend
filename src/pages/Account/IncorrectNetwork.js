import React from "react";
import image1 from "../../assets/images/rinkeby.png";

export default function IncorrectNetwork(props) {
  return (
    <div className="ui container hero-content">
      <div className="ui header center aligned">
        <h2>You're on the wrong network</h2>
        <p className="ui description">
          Simply open MetaMask and switch over to the{" "}
          <strong>Rinkeby Test Network</strong>
        </p>
        <div className="network-image">
          <img className="ui medium bordered image" src={image1} />
        </div>
      </div>
    </div>
  );
}
