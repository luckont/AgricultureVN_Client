import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import Follower from "./Follower";
import Subscriber from "./Subscriber";
import MessageBtn from "./MessageBtn";

const Infor = ({ id, auth, profile, dispatch }) => {
  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user]);
    } else {
      const newData = profile.users.filter((user) => user._id === id);
      setUserData(newData);
    }
  }, [auth, dispatch, id, profile.users]);

  return (
    <div className="infor">
      {userData.map((user) => (
        <div className="infor_user" key={user._id}>
          <Avatar src={user.profilePicture} size="very-big-avatar" />
          <div className="infor_content">
            <div className="title_content">
              <div className="user_name d-flex align-items-center">
                <h3 style={{ fontWeight: "bold" }}>{user.username}</h3>
                {user.roles === "expert" && (
                  <i
                    className="fa-solid fa-circle-check text-success"
                    style={{ fontSize: "20px", paddingLeft: "10px" }}
                  ></i>
                )}
              </div>
            </div>
            <div className="sub_follower">
              <span onClick={() => setShowFollowers(true)}>
                {user.followers.length} Người theo dõi
              </span>
              <br />
              <span onClick={() => setShowSubscribers(true)}>
                {user.subscribes.length} Đang theo dõi
              </span>
            </div>
            <p>{user.desc}</p>
            {user._id === auth.user._id ? (
              <button
                className="btn btn-outline-primary"
                onClick={() => setOnEdit(true)}
              >
                Cập nhật
              </button>
            ) : (
              <div className="d-flex">
              <FollowBtn user={user} />
              <MessageBtn user={user} />
              </div>
            )}
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
          {showFollowers && (
            <Follower
              users={user.followers}
              setShowFollowers={setShowFollowers}
            />
          )}
          {showSubscribers && (
            <Subscriber
              users={user.subscribes}
              setShowSubscribers={setShowSubscribers}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default Infor;
