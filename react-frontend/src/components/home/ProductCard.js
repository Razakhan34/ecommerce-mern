import React from "react";
import "./ProductCard.css";
import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const ratingOptions = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} />
      <p>{product.name}</p>
      <div>
        <Rating {...ratingOptions} />
        <span className="productCard-review">
          ({product.numOfReviews} Reviews)
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};





export default ProductCard;




