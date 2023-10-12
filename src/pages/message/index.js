import React from "react";
import LeftSide from "../../components/message/LeftSide";

const Message = () => {
  return (
    <div className="message d-flex">
      <div className="col-md-3 border-right px-2 left_side">
        <LeftSide />
      </div>
      <div className="col-md-9 px-2 message_icon">
        <div className="d-flex justify-content-center align-items-center flex-column h-100">
          <i className="fa-regular fa-message" style={{ fontSize: "5rem" }}></i>
          <h4>Tin nhắn</h4>
        </div>
      </div>
    </div>
  );
};

export default Message;
