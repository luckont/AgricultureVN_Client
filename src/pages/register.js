import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../redux/actions/authAction";

const RegisterPage = () => {
    const notify = useSelector((state) => state?.notify)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const initialState = {
        phoneNumber: "",
        username: "",
        password: "",
        confirmPassword: "",
    };
    const [userData, setUserData] = useState(initialState);
    const { phoneNumber, username, password } = userData;

    const [typePass, setTypePass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(userData));
        if (!notify.err) {
            navigate('/');
        }
    };
    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };
    return (
        <div className="login_page">
            <form onSubmit={handleSubmit}>
                <h3 className="text-uppercase text-center pb-4">
                    Nông Nghiệp Việt Nam
                </h3>
                <div className="mb-3">
                    <label htmlFor="phoneNumberInput" className="form-label">
                        Nhập số điện thoại
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="phoneNumberInput"
                        aria-describedby="phoneNumberHelp"
                        onChange={handleChangeInput}
                        value={phoneNumber}
                        name="phoneNumber"
                        style={{ borderColor: `${notify.phoneNumber ? "#faabab" : ""}` }}
                    />
                    <small className="text-danger">{notify.phoneNumber ? notify.phoneNumber : ""}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="phoneNumberInput" className="form-label">
                        Nhập tên đăng nhập
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="usernameInput"
                        aria-describedby="usernameHelp"
                        onChange={handleChangeInput}
                        value={username}
                        name="username"
                        style={{ borderColor: `${notify.username ? "#faabab" : ""}` }}
                    />
                    <small className="text-danger">{notify.username ? notify.username : ""}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">
                        Nhập mật khẩu
                    </label>
                    <div className="pass">
                        <input
                            type={typePass ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                            onChange={handleChangeInput}
                            value={password}
                            name="password"
                            style={{ borderColor: `${notify.password ? "#faabab" : ""}` }}
                        />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? "Ẩn" : "Hiện"}
                        </small>
                    </div>
                    <small className="text-danger">{notify.password ? notify.password : ""}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="confirmInputPassword1" className="form-label">
                        Nhập lại mật khẩu
                    </label>
                    <div className="pass">
                        <input
                            type={typePass ? "text" : "password"}
                            className="form-control"
                            id="confirmInputPassword1"
                            onChange={handleChangeInput}
                            name="confirmPassword"
                            style={{ borderColor: `${notify.password ? "#faabab" : ""}` }}
                        />
                        <small onClick={() => setTypePass(!typePass)}>
                            {typePass ? "Ẩn" : "Hiện"}
                        </small>
                    </div>
                    <small className="text-danger">{notify.confirmPassword ? notify.confirmPassword : ""}</small>
                </div>
                <small className="text-danger">{notify.err ? notify.err : ""}</small>
                <button
                    type="submit"
                    className="btn btn-success w-100 mt-4"
                >
                    Đăng ký thành viên
                </button>
                <p className="my-2">
                    Bạn đã có tài khoản?{" "}
                    <Link to="/" style={{ textDecoration: "none" }}>
                        Đăng nhập
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterPage;

