import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { followUser, unFollowUser } from "../../redux/actions/profileUserAction";

const FollowBtn = ({ user }) => {
  const [followed, setFlollowed] = useState(false);

  const auth = useSelector((state) => state.auth)
  const profile = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  const handleFollow = async () => {
    setFlollowed(true)
    await dispatch(followUser({users: profile.users, user, auth}))
  }

  const handleUnFollow = async () => {
    setFlollowed(false)
    await dispatch(unFollowUser({users: profile.users, user, auth}))
  }

  useEffect (() => {
    if(auth.user.subscribes.find(item => item._id === user._id)) {
        setFlollowed(true)
    }
  }, [auth.user.subscribes, user._id])
  return (
    <>
      {followed ? (
        <button className="btn btn-outline-danger" onClick={handleUnFollow}>Bỏ theo dõi</button>
      ) : (
        <button className="btn btn-outline-primary" onClick={handleFollow}>Theo dõi</button>
      )}
    </>
  );
};

export default FollowBtn;
