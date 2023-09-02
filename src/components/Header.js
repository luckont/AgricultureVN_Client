import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo_ngang.png"

const Header = () => {
    return (
        <div>
            <div className='banner'>
                <img src={logo} alt="logo" height={100} />
            </div>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="menu ">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <Link class="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li class="nav-item dropdown">
                            <Link class="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Trang cá nhân
                            </Link>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                <li><Link class="dropdown-item" to="#">Trang cá nhân</Link></li>
                                <li><Link class="dropdown-item" to="#">Dark Mode</Link></li>
                                <li><hr class="dropdown-divider" /></li>
                                <li><Link class="dropdown-item" to="#">Đăng xuất</Link></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default Header;
