import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo_ngang.png";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/actions/authAction";

const Header = () => {

    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth?.user)

    const navLinks = [
        { label: "Tin nhắn", icon: "send", path: "/message" },
        { label: "Thông báo", icon: "notifications", path: "/notify" },
    ];

    return (
        <div>
            <div className="banner">
                <img src={logo} alt="logo" height={100} />
            </div>
            <nav className="navbar navbar-expand navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        Trang chủ
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="#">
                                    Link
                                </Link>
                            </li>
                        </ul>

                        <ul className="navbar-nav">
                            {navLinks.map((link, index) => (
                                <li className="nav-item" key={index}>
                                    <Link className="nav-link active" to={link.path}>
                                        <span className="material-icons">{link.icon}</span>
                                    </Link>
                                </li>
                            ))}

                            <li className="nav-item dropdown">
                                <span
                                    className="nav-link dropdown-toggle"
                                    id="navbarDropdown"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Cá nhân
                                </span>
                                <ul
                                    className="dropdown-menu dropdown-menu-end"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            Trang cá nhân
                                        </Link>
                                    </li>
                                    <li>
                                        <label className="dropdown-item" htmlFor="theme">
                                            Dark Mode
                                        </label>
                                    </li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="#" onClick={() => dispatch(logout())}>
                                            Đăng xuất
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
