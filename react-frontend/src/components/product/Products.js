import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getAllProducts } from "../../store/product-actions";
import ProductCard from "../home/ProductCard";
import Loader from "../layout/loader/Loader";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import { Slider } from "@mui/material";

import "./Products.css";
import MetaData from "../layout/MetaData";

const categories = [
  "phone",
  "appliance",
  "ferniture",
  "electronics",
  "home",
  "gadget",
];

const Products = ({ match }) => {
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 150000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const setCurrentPgNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (e, newPrice) => {
    setPrice(newPrice);
  };

  const dispatch = useDispatch();
  const { loading, error, products, totalProducts, resultPerPage } =
    useSelector((state) => state.product);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getAllProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, alert, error, keyword, currentPage, price, category, ratings]);
  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          <MetaData title="PRODUCTS -- Ecommerce" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((currProduct) => (
                <ProductCard key={currProduct._id} product={currProduct} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={150000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  key={category}
                  className="category-link"
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>

          {resultPerPage < totalProducts && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={totalProducts}
                onChange={setCurrentPgNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
