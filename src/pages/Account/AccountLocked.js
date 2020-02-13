import React from "react";

export default function AccountLocked(props) {
  return (
    <div className="ui container hero-content">
      <div className="ui header center aligned">
        <h2>No accounts available in your wallet</h2>
        <p className="ui description">
          Simply open MetaMask and log into your account on{" "}
          <strong>Rinkeby Test Network</strong>
        </p>
      </div>
    </div>
  );
}
