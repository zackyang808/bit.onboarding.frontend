import React from "react";
import { Link } from "@reach/router";
import BCLogoImage from "../assets/images/BG2png.png";

export default function TopNavigationBar(props) {
  return (
    <div className="ui huge topbar center aligned topbar-inverted menu">
      <div className="left menu">
        <a href="/" className="item active">
          <div className="bit-logo nav">
            <img src={BCLogoImage} alt="Bit.Country" />
          </div>
        </a>
      </div>
      <div className="center menu">
        <Link className="item" to="/dapp/marketplace">
          Marketplace
        </Link>
        <Link className="item" to="/dapp/myCountry">
          My Country
        </Link>
      </div>
      <div className="right menu">
        <Link className="item" to="/faq">
          FAQ
        </Link>
        <Link className="item" to="/blog">
          Blog
        </Link>
      </div>
    </div>
  );
}
