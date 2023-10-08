import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import moment from "moment";
import { isReadNotify, deleteAllNotifies, NOTIFY_TYPES } from "../redux/actions/notifyAction";

const NotifyModal = () => {
  const auth = useSelector((state) => state.auth);
  const notify = useSelector((state) => state.notifyUser);

  const dispatch = useDispatch();

  const handleIsRead = (msg) => {
    dispatch(isReadNotify({ msg, auth }))
  }

  const handleSound = () => {
    dispatch({type: NOTIFY_TYPES.UPDATE_SOUND, payload: !notify.sound})
}

  const handleDeleteAll = () => {
    const newArr = notify.data.filter(item => item.isRead === false)
    if (newArr.length === 0) return dispatch(deleteAllNotifies(auth.token))

    if (window.confirm(`Bạn có ${newArr.length} thông báo chưa đọc. Bạn có muốn xóa tất cả ?`)) {
      return dispatch(deleteAllNotifies(auth.token))
    }
  }

  return (
    <div style={{ minWidth: "300px" }}>
      <div className="d-flex justify-content-between align-items-center px-3">
        <h3>Thông báo</h3>
        {notify.sound ? (
          <i className="fas fa-bell text-danger" style={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={handleSound} />
        ) : (
          <i className="fas fa-bell-slash text-danger" style={{ fontSize: "1.2rem", cursor: "pointer" }} onClick={handleSound} />
        )}
      </div>
      <hr className="mt-0" />
      {notify.data.length === 0 && <h5>Không có thông báo mới !</h5>}
      <div style={{ maxHeight: "calc(100vh - 200px)", overflow: "auto" }}>
        {notify.data.map((msg, index) => (
          <div key={index} className="px-2 mb-3">
            <Link
              to={`${msg.url}`}
              className="d-flex text-dark align-items-center"
              style={{ textDecoration: "none" }}
              onClick={() => handleIsRead(msg)}
            >
              <Avatar src={msg.user.profilePicture} size="big-avatar" />
              <div className="mx-1 flex-fill">
                <div>
                  <strong style={{ marginRight: "10px" }}>{msg.user.username}</strong>
                  <span>{msg.text}</span>
                </div>
                {msg.content && <small>{msg.content.slice(0, 20)}...</small>}
              </div>
              {msg.image && (
                <div style={{ width: "30px" }}>
                  {msg.image ? (<Avatar src={msg.image} size="medium-avatar" />) : ("")}
                </div>
              )}
            </Link>
            <small className="text-muted d-flex justify-content-between align-items-center px-2">
              {moment(msg.createdAt).fromNow()}
              {!msg.isRead && <i className="fas fa-circle text-primary" />}
            </small>
          </div>
        ))}
      </div>
      <hr className="my-1" />
      <div className="text-right text-danger mr-2" style={{ cursor: 'pointer' }} onClick={handleDeleteAll}>
        Xóa tất cả
      </div>
    </div>
  );
};

export default NotifyModal;
