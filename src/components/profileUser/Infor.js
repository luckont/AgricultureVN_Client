import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Avatar from "../Avatar";
import { getUserProfile } from "../../redux/actions/profileUserAction";
import EditProfile from "./EditProfile";
import FollowBtn from "./FollowBtn";
import Follower from "./Follower";
import Subscriber from "./Subscriber";

const Infor = () => {
  const idParams = useParams();
  const currentUser = useSelector((state) => state.auth?.user);
  const auth = useSelector((state) => state.auth?.token);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState([]);
  const [onEdit, setOnEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);

  const profile = useSelector((state) => state.profile?.users);

  useEffect(() => {
    if (idParams.id === currentUser._id) {
      setUserData([currentUser]);
    } else {
      dispatch(getUserProfile(auth, idParams.id));
      const newData = profile.filter((user) => user._id === idParams.id);
      setUserData(newData);
    }
  }, [auth, currentUser, dispatch, idParams.id, profile]);

  return (
    <div className="infor">
      {userData.map((user) => (
        <div className="infor_user" key={user._id}>
          <Avatar src={user.profilePicture} size="very-big-avatar" />
          <div className="infor_content">
            <div className="title_content">
              <h1>{user.username}</h1>
              {user._id === currentUser._id ? (
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setOnEdit(true)}
                >
                  Cập nhật
                </button>
              ) : (
                <FollowBtn user={user} />
              )}
            </div>
            <div className="sub_follower">
              <span onClick={() => setShowFollowers(true)}>{user.followers.length} Người theo dõi</span>
              <br />
              <span onClick={() => setShowSubscribers(true)}>{user.subscribes.length} Đang theo dõi</span>
            </div>
            <p>{user.desc}</p>
          </div>
          {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} />}
          {showFollowers && <Follower users={user.followers} setShowFollowers={setShowFollowers}/>}
          {showSubscribers && <Subscriber users={user.subscribes} setShowSubscribers={setShowSubscribers}/>}
        </div>
      ))}
    </div>
  );
};

export default Infor;
