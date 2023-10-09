import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../redux/actions/globalTyles";
import { createPost, updatePost } from "../redux/actions/postAction";
import Icons from "./Icons";

const StatusModal = () => {
  const auth = useSelector((state) => state.auth);
  const status = useSelector((state) => state.status);
  const socket = useSelector((state) => state.socket);

  const dispatch = useDispatch();

  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);

  const handlleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = "";
    let newImgs = [];

    files.forEach((file) => {
      if (!file) return (err = "File không tồn tại !");
      if (file.size > 1024 * 1024 * 5) {
        return (err = "Dung lượng file quá lớn !");
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
    if (status.onEdit) {
      dispatch(updatePost({ content, images, auth, status }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent("");
    setImages([]);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  const imageShow = (src) => {
    return <img src={src} alt="images" className="img-thumbnail" />;
  };

  const videoShow = (src) => {
    return <video controls src={src} alt="images" className="img-thumbnail" />;
  };

  useEffect(() => {
    if (status.onEdit) {
      setContent(status.desc);
      setImages(status.img);
    }
  }, [status]);

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
            value={content}
            placeholder={`${auth.user.username}, Bạn đang nghĩ gì ?`}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="d-flex">
            <div className="flex-fill"></div>
            <Icons setContent={setContent} content={content}/>
          </div>
          <div className="show_imgs">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                {img.url ? (
                  <>
                    {img.url.match(/video/i)
                      ? videoShow(img.url)
                      : imageShow(img.url)}
                  </>
                ) : (
                  <>
                    {img.type.match(/video/i)
                      ? videoShow(URL.createObjectURL(img))
                      : imageShow(URL.createObjectURL(img))}
                  </>
                )}

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
                accept="image/*, video/*"
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
