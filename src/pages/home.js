import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";

const HomePage = () => {
  const postHome = useSelector((state) => state.postHome);

  return (
    <div>
      <div className="home row mx-0">
        <div className="col-md-8">
          <Status />
          {
            postHome.loading ? (
              <h1>Loading ....</h1>
            ) : postHome.result === 0 ? (
              <h1 className="text-center">Không có bài viết nào !</h1>
            ) : (
              <Posts />
            )
          }
        </div>
        <div className="col-md-4 bg-secondary">suggestion</div>
      </div>
    </div>
  );
};

export default HomePage;
