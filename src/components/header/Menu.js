import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Avatar from "../Avatar";

const Menu = () => {
  const auth = useSelector((state) => state.auth?.user);
  const theme = useSelector((state) => state.mode);

  const dispatch = useDispatch();
  const { pathName } = useLocation();

  const isActive = (pn) => {
    if (pn === pathName) return "active";
  };

  const navLinks = [
    { label: "Trang chủ", icon: "home", path: "/" },
    { label: "Tin nhắn", icon: "send", path: "/message" },
    { label: "Thông báo", icon: "notifications", path: "/notify" },
  ];
  return (
    <div className="menu">
      <ul className="navbar-nav flex-row">
        {navLinks.map((link, index) => ( 
          <li className="nav-item" key={index}>
            <Link className={`nav-link ${isActive(link.path)}`} to={link.path}>
              <span className="material-icons">{link.icon}</span>
            </Link>
          </li>
        ))}
        <li className="nav-item dropdown">
          <span
            className="nav-link position-relative"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            aria-haspopup="true"
          >
            <Avatar src={auth.profilePicture} size="medium-avatar" />
          </span>
          <ul
            className="dropdown-menu position-absolute dropdown-menu-end"
            aria-labelledby="navbarDropdown"
          >
            <li>
              <Link className="dropdown-item" to={`/user/${auth._id}`}>
                Trang cá nhân
              </Link>
            </li>
            <li>
              <label
                className="dropdown-item"
                htmlFor="theme"
                onClick={() =>
                  dispatch({ type: GLOBALTYPES.MODE, payload: !theme })
                }
              >
                {theme ? "Chế độ tối" : "Chế độ sáng"}
              </label>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link
                className="dropdown-item"
                to="#"
                onClick={() => dispatch(logout())}
              >
                Đăng xuất
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
