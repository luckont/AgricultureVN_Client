import React from "react";
import Logo from "../../images/logo_only.png";
import moment from "moment";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="product_card">
      <div className="product_card_header">
        <img
          src={product.img[0] ? product.img[0].url : Logo}
          alt="product_pic"
        />
        <div className="btn_product px-2">
          <button className="btn btn-info mb-2 w-100">
            Nhắn với người bán
          </button>
          <button className="btn btn-secondary w-100">
            <Link
              to={`/market/${product._id}`}
              style={{ textDecoration: "none", color: "#fff" }}
            >
              Xem chi tiết
            </Link>
          </button>
        </div>
      </div>
      <div className="product_card_body">
        <div className="product_card_title">{product.productName}</div>
        <div className="product_card_content">
          <div className="product_card_price">{product.price}</div>
          <div>{product.typeProduct}</div>
          <div>
            <i className="fas fa-map-marker-alt"></i>
            <small style={{ paddingLeft: "5px" }}>{product.address}</small>
          </div>
          <span className="text-muted">
            {moment(product.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
