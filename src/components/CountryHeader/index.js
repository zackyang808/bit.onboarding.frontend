import React from "react";
import { 
  Row,
  Col
} from "antd";
import Status from "../Status";
import BCLogoImage from "../../assets/images/BG1png.png";
import { CountryConnect } from "../../pages/CountryWrapper";
import { AuthConnect } from "../../pages/AuthWrapper";

function CountryHeader({ country, user }) {
  return (
    <header>
      <Row className="wrapper">
        <Col className="header-col-left" span={6}>
          <h4 className="bit-logo nav">
            <a href={"/dapp/country/" + country.id}>
              <img src={BCLogoImage} alt="Bit.Country" />
            </a>
          </h4>
        </Col>
        <Col className="header-col-middle" span={12}>
          <form className="search-bar" action="" method="get" name="q">
            <input type="text" placeholder="Search topic BitCountry" />
          </form>
        </Col>
        <Col className="header-col-right" span={6}>
          <Status user={user} />
        </Col>
      </Row>
    </header>
  );
}

export default AuthConnect(CountryConnect(CountryHeader));
