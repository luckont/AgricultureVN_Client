import React, { useEffect } from "react";
import Infor from "../../components/profileUser/Infor";
import Post from "../../components/profileUser/Post";
import { getUserProfile } from "../../redux/actions/profileUserAction";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const User = () => {

  const auth = useSelector((state) => state.auth)
  const profile = useSelector((state) => state.profile)

  const dispatch = useDispatch()

  const { id } = useParams()

  useEffect(() => {
    if (profile.ids.every(item => item !== id)) {
      dispatch(getUserProfile({ users: profile.users, id, auth }))
    }
  }, [auth, dispatch, id, profile.ids, profile.users])

  return (
    <div className="profile">
      <Infor auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {
        profile.loading
          ? <i>Đang tải dữ liệu ...</i>
          : <Post auth={auth} profile={profile} dispatch={dispatch} id={id} />
      }
    </div>
  );
};

export default User;
