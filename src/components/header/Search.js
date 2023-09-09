import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPIUser } from "../../untils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { Link } from "react-router-dom";
import UserCard from "../UserCard";

const Search = () => {
    const [search, setSearch] = useState("");
    const [users, setUsers] = useState([]);

    const auth = useSelector((state) => state.auth?.token);
    const dispatch = useDispatch();
    const handleClose = () => {
        setSearch("")
        setUsers([])
    }
    useEffect(() => {
        if (search && auth) {
            getDataAPIUser(`/search/result?username=${search}`, auth)
                .then((res) => {
                    const result = res.data.users
                    if(result.length === 0){
                        dispatch({
                            type: GLOBALTYPES.NOTIFY,
                            payload: {
                                err: "Không tìm thấy !"
                            }
                        });
                    }
                    else {
                        setUsers(result)
                    }
                })
                .catch((err) => {
                    dispatch({
                        type: GLOBALTYPES.NOTIFY,
                        payload: {
                            err: err.respone.data.msg
                        }
                    });
                });
        }
    }, [search, auth, dispatch]);

    return (
        <div className="m-auto">
            <form className="search_box">
                <input
                    type="text"
                    name="search"
                    value={search}
                    id="search"
                    onChange={(e) =>
                        setSearch(e.target.value.toLocaleLowerCase().replace(/ /g, ""))
                    }
                />
                <div className="search_icon" style={{ opacity: search ? 0 : 0.5 }}>
                    <span className="material-icons">search</span>
                    <span>Tìm kiếm ...</span>
                </div>
                <div className="close_search" onClick={handleClose}>&times;</div>

                <div className="users">{
                    users.map(user => (
                        <Link key={user._id} to={`/user/${user._id}`} style={{ textDecoration: "none" }} onClick={handleClose}>
                            <UserCard user={user} />
                        </Link>
                    ))
                }</div>

            </form>
        </div>
    );
};

export default Search;
