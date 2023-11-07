import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../../redux/actions/productAction";
import Carousel from "../../components/Carousel";
import Avatar from "../../components/Avatar";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);

  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const productDetail = useSelector((state) => state.market.product);

  useEffect(() => {
    dispatch(getProduct({ productDetail, auth, id }));
    if (productDetail.length > 0) {
      const newArr = productDetail.filter((product) => product._id === id);
      setProduct(newArr);
    }
  }, [dispatch, auth, id, productDetail]);

  return (
    <div className="card_detail">
      {product.map((item) => (
        <div key={item._id} className="row">
          <div className="col-md-8">
            <div className="carousel_detail_product">
              {item.img.length > 0 && (
                <Carousel images={item.img} id={item._id} />
              )}
            </div>
            <h3 className="py-2">{item.productName}</h3>
            <h5 className="product_card_price">{item.price}</h5>
            <p>{item.desc}</p>
          </div>
          <div className="col-md-4">
            <div>
              <div className="d-flex align-items-center">
                <Avatar src={item.user.profilePicture} size="big-avatar" />
                <div className="card_name m-2">
                  <h6 className="m-0">
                    <Link
                      to={`/user/${item.user._id}`}
                      className="text-dark"
                      style={{ textDecoration: "none" }}
                    >
                      {item.user.username}
                    </Link>
                    {item.user.roles === "expert" && (
                      <i
                        className="fa-solid fa-circle-check text-success"
                        style={{ fontSize: "10px", paddingLeft: "5px" }}
                      ></i>
                    )}
                  </h6>
                  <small>
                    <i className="fas fa-circle text-success"></i> Đang hoạt
                    động
                  </small>
                </div>
              </div>
              <div className="contact_user">
                <div className="contact_phone">
                  <i className="fas fa-phone-alt fa-rotate-90"></i>
                  <span>{item.user.phoneNumber}</span>
                </div>
                <div className="contact_message">
                  <i className="fas fa-comments"></i>
                  <span>Nhắn tin</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Product;
