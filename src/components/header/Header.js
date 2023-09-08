import React from "react";
import logo from "../../images/logo_ngang.png";
import Menu from "./Menu";

const Header = () => {
  return (
    <div>
      <div className="banner">
        <img src={logo} alt="logo" height={100} />
        <Menu/>
      </div>
    </div>
  );
};

export default Header;
