import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import React, { useEffect } from "react";
import { Fragment } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  clearError,
  getSingleProduct,
  newReview,
} from "../../store/product-actions";
import Loader from "../layout/loader/Loader";
import ReviewCard from "./ReviewCard.js";
import "./ProductDetails.css";
import MetaData from "../layout/MetaData";
import { useState } from "react";
import { addItemToCart } from "../../store/cart-actions";
import { productActions } from "../../store/product-slice";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, product, reviewStatus } = useSelector(
    (state) => state.product
  );

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const submitReviewToggle = () => {
    setOpen((prevState) => !prevState);
  };

  const submitReviewHandler = () => {
    const formdata = new FormData();
    formdata.set("productId", productId);
    formdata.set("rating", rating);
    formdata.set("comment", comment);

    dispatch(newReview(formdata));
    setOpen(false);
  };

  const quantityHandler = (type) => {
    if (type === "inc") {
      if (product.stock <= quantity) {
        alert.error("Product has reach maximum stock");
        return;
      }
      setQuantity((quantity) => (quantity += 1));
    } else {
      if (quantity <= 1) return;
      setQuantity((quantity) => (quantity -= 1));
    }
  };

  const addToCartHandler = () => {
    dispatch(addItemToCart(productId, quantity));
    alert.success("item added successfully to cart");
  };

  const ratingOptions = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
    size: "medium",
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, error]);

  useEffect(() => {
    if (reviewStatus) {
      alert.success("Review submitted successfully");
      dispatch(productActions.newProductReviewReset());
    }
    dispatch(getSingleProduct(productId));
  }, [dispatch, productId, alert, reviewStatus]);

  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && (
        <Fragment>
          <MetaData title={`${product.name} -- Ecommerce`} />
          <div className="ProductDetails">
            <div className="productCarousel">
              <Carousel>
                {product.images &&
                  product.images.map((currImage, i) => {
                    return (
                      <img
                        key={currImage._id}
                        src={currImage.url}
                        alt={`${i + 1} slide`}
                        className="CarouselImage"
                      />
                    );
                  })}
              </Carousel>
            </div>

            <div className="productInfo">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...ratingOptions} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button name="inc" onClick={() => quantityHandler("dec")}>
                      -
                    </button>
                    <input type="number" readOnly value={quantity} />
                    <button name="dec" onClick={() => quantityHandler("inc")}>
                      +
                    </button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(Number(e.target.value))}
                value={rating}
                precision="0.5"
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button color="primary" onClick={submitReviewHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((currReview) => (
                  <ReviewCard key={currReview._id} review={currReview} />
                ))}
            </div>
          ) : (
            <p className="noReviews">no reviews yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
