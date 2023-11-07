import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GLOBALTYPES } from "../../redux/actions/globalTyles";
import { getProducts } from "../../redux/actions/productAction";
import Products from "../../components/market/Products";

const Market = () => {

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getProducts({auth}))
  }, [dispatch, auth])
  
  return (
    <>
      <div>
        <button
          className="btn btn-success"
          onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: {onMarket: true} })}
        >
          Đăng bài
        </button>
      </div>
      <Products />
    </>
  );
};

export default Market;
