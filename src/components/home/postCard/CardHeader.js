import React from "react";
import Avatar from "../../Avatar";
import { Link } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";

const CardHeader = ({ post }) => {
    const auth = useSelector((state) => state.auth);

    const handleEditPost = () => {
        console.log(post)
    }

    return (
        <div className="card_header">
            <div className="d-flex">
                <Avatar src={post.user.profilePicture} size="big-avatar" />

                <div className="card_name m-2">
                    <h6>
                        <Link to={`/user/${post.user._id}`} className="text-dark" style={{ textDecoration: "none"}}>
                            {post.user.username}
                        </Link>
                    </h6>
                    <p className="m-0 text-muted" style={{fontSize: "0.7rem"}}>
                        {moment(post.createdAt).fromNow()}
                    </p>
                </div>
            </div>

            <div className="nav-item dropdown">
                <span className="material-icons" id="moreLink" data-bs-toggle="dropdown">
                    more_horiz
                </span>
                <div className="dropdown-menu">
                    {auth.user._id === post.user._id &&
                        <>
                            <div className="dropdown-item" onClick={handleEditPost}>
                                <span className="material-symbols-outlined">edit</span> Chỉnh sửa bài viết
                            </div>
                            <div className="dropdown-item">
                                <span className="material-symbols-outlined">delete</span> Xóa bài viết
                            </div>
                        </>
                    }
                    <div className="dropdown-item">
                        <span className="material-symbols-outlined">share</span> Chia sẻ bài viết
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardHeader;
