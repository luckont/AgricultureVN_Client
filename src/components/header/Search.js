import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import UserCard from "../UserCard";

const Search = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [loadData, setLoadData] = useState(false);

  const auth = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();
  const handleClose = () => {
    setSearch("");
    setUsers([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setLoadData(true);
      await getDataAPI(`/user/search/result?username=${search}`, auth).then(
        (res) => {
          const result = res.data.users;
          if (result.length === 0) {
            dispatch({
              type: GLOBALTYPES.NOTIFY,
              payload: {
                err: "Không tìm thấy !",
              },
            });
          } else {
            setUsers(result);
          }
        }
      );
      setLoadData(false);
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.NOTIFY,
        payload: {
          err: err.response.statusText,
        },
      });
    }
  };

  return (
    <form className="search_box" onSubmit={handleSearch}>
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
      {!loadData && (
        <div className="close_search" onClick={handleClose}>
          &times;
        </div>
      )}
      {loadData && (
        <div className="d-flex align-items-center loading_icon">
          <div
            className="spinner-border ms-auto"
            role="status"
            aria-hidden="true"
          ></div>
        </div>
      )}

      <button type="submit" style={{ display: "none" }}>
        Tìm Kiếm
      </button>
      <div className="users">
        {search &&
          users.map((user) => (
            <UserCard
              key={user._id}
              user={user}
              boder="boder"
              handleClose={handleClose}
            />
          ))}
      </div>
    </form>
  );
};

export default Search;
