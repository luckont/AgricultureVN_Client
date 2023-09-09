import React from "react";
import logo from "../../images/logo_ngang.png";
import Menu from "./Menu";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = () => {
  return (
    <div className="header">
      <nav className="navbar px-4">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" height={70} />
        </Link>
        <Search />
        <Menu />
      </nav>
    </div>
  );
};

export default Header;
