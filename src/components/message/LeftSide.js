import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { getDataAPI } from "../../untils/fetchData";
import { addUser } from "../../redux/actions/messageAction";
import UserCard from "../UserCard";

const LeftSide = () => {
  const auth = useSelector((state) => state.auth);
  const message = useSelector((state) => state.message);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id }  = useParams();

  const [search, setSearch] = useState("");
  const [searchUsers, setSearchUsers] = useState([]);
  const [loadUsers, setloadUsers] = useState(false);

  const isActive = (user) => {
    if(id === user._id) return "active"
    return ""
  }

  const handleAddUser = (user) => {
    setSearch("");
    setSearchUsers([]);
    dispatch(addUser({ user, message }));
    return navigate(`/message/${user._id}`);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search) return;
    try {
      setloadUsers(true);
      await getDataAPI(
        `/user/search/result?username=${search}`,
        auth.token
      ).then((res) => {
        const result = res.data.users;
        if (result.length === 0) {
          dispatch({
            type: GLOBALTYPES.NOTIFY,
            payload: { err: "Không tìm thấy !" },
          });
        } else {
          setSearchUsers(result);
        }
      });
      setloadUsers(false);
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
    <>
      <form className="message_header_search" onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm ..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" id="search">
          Tìm
        </button>
      </form>
      <div className="message_list">
        {searchUsers.length !== 0 ? (
          <>
            {searchUsers.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}

              >
                <UserCard user={user} />
              </div>
            ))}
          </>
        ) : (
          <>
            {message.users.map((user) => (
              <div
                key={user._id}
                className={`message_user ${isActive(user)}`}
                onClick={() => handleAddUser(user)}
              >
                <UserCard user={user} />
                <i className="fas fa-circle"/>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default LeftSide;
