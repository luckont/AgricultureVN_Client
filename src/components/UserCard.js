import React from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

const UserCard = ({
  children,
  user,
  border,
  handleClose,
  setShowFollowers,
  setShowSubscribers,
}) => {
  const handleCloseAll = () => {
    if (handleClose) handleClose();
    if (setShowFollowers) setShowFollowers(false);
    if (setShowSubscribers) setShowSubscribers(false);
  };

  return (
    <div className={`d-flex p-2 justify-content-between ${border}`}>
      <div>
        <Link
          to={`/user/${user._id}`}
          onClick={handleCloseAll}
          className="d-flex align-items-center"
          style={{ textDecoration: "none" }}
        >
          <Avatar src={user.profilePicture} size="medium-avatar" />
          <div>
            <small className="m-2">{user.username}</small>
          </div>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default UserCard;
