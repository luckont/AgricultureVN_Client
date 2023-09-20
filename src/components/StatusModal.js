import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTyles";
import { createPost } from "../redux/actions/postAction";

const StatusModal = () => {
  const auth = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handlleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImgs = [];

    files.forEach((file) => {
      if (!file) return (err = "File không tồn tại !");
      if (file.type !== "image/jpeg" && file.type !== "image/png") {
        return (err = "Đinh dạng file không đúng !");
      }

      return newImgs.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.NOTIFY, payload: { err: err } });
    setImages([...images, ...newImgs]);
  };

  const delImage = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPost({ content, images, auth }));

    setContent("");
    setImages([]);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false })
  };

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_title">
          <h5 className="m-0">Tạo bài viết mới</h5>
          <span
            onClick={() =>
              dispatch({ type: GLOBALTYPES.STATUS, payload: false })
            }
          >
            &times;
          </span>
        </div>

        <div className="status_container">
          <textarea
            name="content"
            placeholder={`${auth.user.username}, Bạn đang nghĩ gì ?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="show_imgs">
            {images.map((img, index) => (
              <div key={index} id="file_img" className="img-thumbnail">
                <img src={URL.createObjectURL(img)} alt="images" />
                <span onClick={() => delImage(index)}>&times;</span>
              </div>
            ))}
          </div>
          <div className="input_images">
            <i className="fas fa-camera" />
            <div className="file_upload">
              <i className="fas fa-image" />
              <input
                type="file"
                name="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handlleChangeImages}
              />
            </div>
          </div>

          <div className="status_footer">
            <button className="btn btn-secondary w-100">Đăng</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
