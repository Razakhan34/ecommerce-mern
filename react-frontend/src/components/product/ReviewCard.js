import { Rating } from "@mui/material";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const option = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size: "small",
  };
  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User profile" />
      <p>{review.name}</p>
      <Rating {...option} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
