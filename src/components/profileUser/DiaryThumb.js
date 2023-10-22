import React, { useEffect, useState } from "react";
import { getDataAPI } from "../../untils/fetchData";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const DiaryThumb = ({ auth }) => {
  const dispatch = useDispatch();
  const [diary, setDiary] = useState([]);

  useEffect(() => {
    getDataAPI("/diary/g/result", auth.token)
      .then((res) => {
        setDiary(res.data.diary);
      })
      .catch((err) => {
        dispatch({
          type: GLOBALTYPES.NOTIFY,
          payload: { err: err.response.data.msg },
        });
      });
  }, [auth.token, dispatch]);

  return (
    <div className="diary_thumb">
      {diary.length > 0 
      ? (
        diary.map((item) => (
          <Link
            key={item._id}
            style={{ textDecoration: "none"}}
          >
            <div className="diary_thumb_display">
              {item.media.length > 0 
              ? (
                item.media[0].url.match(/video/i) 
                ? (
                  <video
                    controls
                    src={item.media[0].url}
                    alt={item.media[0].url}
                  />
                ) 
                : (
                  <img src={item.media[0].url} alt={item.media[0].url} />
                )
              ) 
              : (
                <img src={item.user.profilePicture} alt={item.user.profilePicture} />
              )}
            <div className="diary_thumb_menu">
                <span style={{color: "#fff"}}>
                    {item.text}
                </span>
            </div>
            </div>
          </Link>
        ))
      ) : (
        <h5>Chưa có nhật ký nào !</h5>
      )}
    </div>
  );
};

export default DiaryThumb;
