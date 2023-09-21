import React from "react";
import { Link } from "react-router-dom";

const CardFooter = ({ post }) => {
    return (
        <div className="card_footer">
            <div className="card_icon_menu">
                <div>
                    <i className="fas fa-heart"></i>
                    <Link to={`/post/${post._id}`} className="text-dark">
                        <i className="fas fa-comment"></i>
                    </Link>
                    <i className="fas fa-share"></i>
                </div>
                <i className="fas fa-bookmark"></i>
            </div>
            <div className="d-flex justify-content-between">
                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>{post.like.length} Thích</h6>
                <h6 style={{ padding: "0 25px", cursor: "pointer" }}>{post.comments.length} Bình luận</h6>

            </div>
        </div>
    );
};

export default CardFooter;
