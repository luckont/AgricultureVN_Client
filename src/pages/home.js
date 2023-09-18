import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";

const HomePage = () => {
  return (
    <div>
      <h1 className="hom row mx-0">
        <div className="col-md-8">
            <Status />
            <Posts />
        </div>
        <div className="col-md-4 bg-secondary">suggestion</div>
      </h1>
    </div>
  );
};

export default HomePage;
