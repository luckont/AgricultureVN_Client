import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({ user, border, handleClose }) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
  };

  return (
    <div className={`d-flex p-2 ${border}`}>
      <Link to={`/user/${user._id}`} onClick={handleCloseAll} className="d-flex align-items-center" style={{ textDecoration: "none" }}>
        <Avatar src={user.profilePicture} size="medium-avatar" />
        <div>
          <small className="m-2">{user.username}</small>
        </div>
      </Link>
    </div>
  );
};

export default UserCard;
