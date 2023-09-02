import React from "react";

const Loading = () => {
  return (
    <div
      className="position-fixed w-100 h-100"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#0008",
        color: "white",
        top: 0,
        left: 0,
        zIndex: "50",
      }}
    >
      <h1>Đang tải dữ liệu ....</h1>
    </div>
  );
};

export default Loading;
