import React from "react";
import RestaurantSummaryCardProps from "../restaurantSummaryProps/RestaurantSummaryProps";

const RestaurantSummaryCard: React.FC<RestaurantSummaryCardProps> = ({
  imageUrl,
  title,
  description,
  reviewsCnt,
  price,
}) => {
  return (
    <div className="card mb-4">
      <img src={imageUrl} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <div className="d-flex justify-content-between">
          <span>리뷰 {reviewsCnt}</span>
          <span>평균 {price}원</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantSummaryCard;
