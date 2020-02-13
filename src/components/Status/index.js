import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Avatar,
  Dropdown,
  Menu,
  Badge,
  Icon
} from "antd";
import imageProfile from "./../../assets/images/portrait.png";

export default function Status({ user }) {
  const [collapsed, setCollapsed] = useState(false);
  const containerRef = useRef();

  useEffect(() => {
    const resizeHandler = () => {
      const rect = containerRef.current && containerRef.current.getBoundingClientRect();
      if (!rect) {
        return;
      }

      if (rect.width < 250) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    window.onresize = resizeHandler;

    return () => {
      if (window.onresize == resizeHandler) {
        window.onresize = null;
      }
    };
  }, [setCollapsed, containerRef]);

  const dropdownMenu = useMemo(() => (
    <Menu>
      <Menu.Item key="Profile">
        <span className="name">{user.nickName}</span>
      </Menu.Item>
      <Menu.Item key="Notification">
        <Avatar shape="square" icon="notification" style={{ color: "white", backgroundColor: "unset" }} />
      </Menu.Item>
    </Menu>
  ), [user]);

  return collapsed ? (
    <div className="navigation collapsed" ref={containerRef}>
      <div className="profile">
        <Dropdown 
          overlay={dropdownMenu} 
          trigger={['click']} 
          placement="bottomRight"
          overlayClassName="status overlay-container"
        >
          <Avatar shape="square" size="small" src={imageProfile} alt={"Justin"} />
        </Dropdown>
      </div>
    </div>
  ) : (
    <div className="navigation" ref={containerRef} >
      <div className="profile">
        <Avatar shape="square" size="small" src={imageProfile} alt={"Justin"} />
        <span className="name">{user.nickName}</span>
      </div>
      <a className="nav-btn nav-btn-home">
        <Icon type="home" />
      </a>
      <div className="separator" />
      <Badge dot offset={-3, 3}>
        <Avatar shape="square" icon="notification" style={{ color: "white", backgroundColor: "unset" }} />
      </Badge>              
      {/* <a className="nav-btn nav-btn-friend is-active" href="#" /> */}
      {/* <a
        className="nav-btn nav-btn-notification is-active"
        href="#"
      /> */}
      <div className="separator" />
      <a className="nav-btn nav-btn-logout">
        <Icon type="logout" />
      </a>
    </div>
  );
}
