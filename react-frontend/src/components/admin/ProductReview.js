import React, { Fragment, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Star from "@mui/icons-material/Star";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar";

import "./ProductReview.css";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@mui/material";
import { DataGrid } from "@material-ui/data-grid";
import {
  clearErrorReview,
  deleteReview,
  getAllReviews,
} from "../../store/review/adminReview-actions";
import { adminReviewActions } from "../../store/review/adminReview-slice";
import { useHistory } from "react-router-dom";

const ProductReview = () => {
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, reviews, reviewDeleteStatus } = useSelector(
    (state) => state.adminReview
  );

  const [productId, setProductId] = useState("");

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(reviewId, productId));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrorReview());
    }
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    console.log("EFFECT render");
    if (reviewDeleteStatus) {
      alert.success("Review deleted successfully");
      dispatch(adminReviewActions.reviewDeleteReset());
      history.push("/admin/reviews");
    }
  }, [dispatch, error, alert, productId, reviewDeleteStatus, history]);

  console.log("redered");

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 250,
      flex: 0.8,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 100,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });
  return (
    <Fragment>
      <MetaData title={`ALL REVIEWS - Admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewsContainer">
          <form
            className="productReviewsForm"
            onSubmit={productReviewsSubmitHandler}
          >
            <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

            <div>
              <Star />
              <input
                type="text"
                placeholder="Product Id"
                required
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
              />
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={
                loading ? true : false || productId === "" ? true : false
              }
            >
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <h1 className="productReviewsFormHeading">No Reviews Found</h1>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default ProductReview;
