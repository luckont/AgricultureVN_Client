import React from "react";
import Avatar from "./Avatar";

const UserCard = ({ user }) => {
  return (
    <div className="d-flex p-2 border">
      <Avatar src={user.profilePicture} size="medium-avatar" />
      <div>
        <small className="m-2">{user.username}</small>
      </div>
    </div>
  );
};

export default UserCard;
