import React from "react";
import Status from "../components/home/Status";
import Posts from "../components/home/Posts";
import { useSelector } from "react-redux";
import RightSideBar from "../components/home/RightSideBar";
import Diaries from "../components/home/Diaries";

const HomePage = () => {
  const postHome = useSelector((state) => state.postHome);

  return (
    <div>
      <div className="home row mx-0">
        <div className="col-md-8">
          <Status />
          {
            postHome.loading ? (
              <h5>Loading ....</h5>
            ) : postHome.result === 0 ? (
              <h1 className="text-center">Không có bài viết nào !</h1>
            ) : (
             <>
              <Diaries />
              <Posts />
             </>
            )
          }
        </div>
        <div className="col-md-4">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
