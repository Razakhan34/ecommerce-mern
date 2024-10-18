import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";
import { useSelector, useDispatch } from "react-redux";

import "./Home.css";
import { clearError, getAllProducts } from "../../store/product-actions";
import { useAlert } from "react-alert";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, products, loading } = useSelector((state) => state.product);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error, alert]);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  return (
    <Fragment>
      <MetaData title="Ecommerce" />
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="banner">
            <p>welcome to ecommerce</p>
            <h1>Find All amazing product below</h1>
            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="home-heading">Feature Product</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
