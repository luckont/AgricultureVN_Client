import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/actions/authAction";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import Avatar from "../Avatar";

const Menu = () => {

    const auth = useSelector((state) => state.auth?.user)
    const theme = useSelector((state) => state.mode)

    const dispatch = useDispatch()
    const { pathName } = useLocation();

    const isActive = (pn) => {
        if (pn === pathName) return "active"

    }

    const navLinks = [
        { label: "Tin nhắn", icon: "send", path: "/message" },
        { label: "Thông báo", icon: "notifications", path: "/notify" },
    ];
    return (
        <div className='menu'>
            <nav className="navbar navbar-expand navbar-light bg-light px-2">
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

                    <ul className="navbar-nav align-middle">
                        {navLinks.map((link, index) => (
                            <li className="nav-item" key={index}>
                                <Link className={`nav-link ${isActive(link.path)}`} to={link.path}>
                                    <span className="material-icons">{link.icon}</span>
                                </Link>
                            </li>
                        ))}

                        <li className="nav-item dropdown">
                            <span
                                className="nav-link"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <Avatar src={auth.profilePicture} size="medium-avatar" />
                            </span>
                            <ul
                                className="dropdown-menu dropdown-menu-end"
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to={`/user/${auth._id}`}>
                                        Trang cá nhân
                                    </Link>
                                </li>
                                <li>
                                    <label className="dropdown-item" htmlFor="theme" onClick={() => dispatch({ type: GLOBALTYPES.MODE, payload: !theme })}>
                                        {theme ? "Chế độ sáng" : "Chế độ tối"}
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
            </nav>
        </div>
    );
}

export default Menu;
