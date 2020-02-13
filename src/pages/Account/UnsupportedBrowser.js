import React from "react";

export default function UnsupportedBrowser(props) {
  return (
    <div className="ui container hero-content">
      <div className="ui header center aligned">
        <h2>Your browser is unsupported by Bit.Country</h2>
        <p className="ui description">
          You must use a browser with the{" "}
          <a href="https://metamask.io/" target="_blank">MetaMask</a> extension installed.
        </p>
      </div>
    </div>
  );
}
