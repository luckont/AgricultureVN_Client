import React from "react";
import Avatar from "../../Avatar";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from "../../../redux/actions/globalTyles";
import { deletePost } from "../../../redux/actions/postAction";
import { BASE_URL } from "../../../untils/config"
import moment from "moment";

const CardHeader = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEditPost = () => {
    dispatch({ type: GLOBALTYPES.STATUS, payload: { ...post, onEdit: true } });
  };
  const handleDeletePost = () => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa bài viết này?");
    if (confirmDelete) {
      dispatch(deletePost({ post, auth, socket }));
      return navigate("/");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${BASE_URL}/post/${post._id}`)
      .then(() => {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { success: "Đã sao chép liên kết thành công" } })
      })
      .catch((error) => {
        dispatch({ type: GLOBALTYPES.NOTIFY, payload: { err: "Lỗi khi sao chép:" + error } })
      });
  }

  return (
    <div className="card_header">
      <div className="d-flex">
        <Avatar src={post.user.profilePicture} size="big-avatar" />

        <div className="card_name m-2">
          <h6>
            <Link
              to={`/user/${post.user._id}`}
              className="text-dark"
              style={{ textDecoration: "none" }}
            >
              {post.user.username}
            </Link>
          </h6>
          <p className="m-0 text-muted" style={{ fontSize: "0.7rem" }}>
            {moment(post.createdAt).fromNow()}
          </p>
        </div>
      </div>

      <div className="nav-item dropdown">
        <span
          className="material-icons"
          id="moreLink"
          data-bs-toggle="dropdown"
        >
          more_horiz
        </span>
        <div className="dropdown-menu">
          {auth.user._id === post.user._id && (
            <>
              <div className="dropdown-item" onClick={handleEditPost}>
                <span className="material-symbols-outlined">edit</span> Chỉnh
                sửa bài viết
              </div>
              <div className="dropdown-item" onClick={handleDeletePost}>
                <span className="material-symbols-outlined">delete</span> Xóa
                bài viết
              </div>
            </>
          )}
          <div className="dropdown-item" onClick={handleCopyLink}>
            <span className="material-symbols-outlined">share</span> Chia sẻ bài
            viết
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHeader;
