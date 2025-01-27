import React from "react";
import SearchBox from "./SearchBox";
import { RestaurantSummaryCard } from "../../../entities";
import "../ui/Search.css";

const Search: React.FC = () => {
  const cards = [
    {
      title: "카페&펍 연무장 던던 동대문점",
      description: "연무장 동대문점 - 스포츠 펍&카페 예약 문의는...",
      reviews: 93,
      price: 20000,
      image: "your-image-url-here",
    },
    {
      title: "또 다른 장소",
      description: "이곳은 또 다른 장소에 대한 설명입니다.",
      reviews: 50,
      price: 15000,
      image: "another-image-url-here",
    },
    {
      title: "카페&펍 연무장 던던 동대문점",
      description: "연무장 동대문점 - 스포츠 펍&카페 예약 문의는...",
      reviews: 93,
      price: 20000,
      image: "your-image-url-here",
    },
    {
      title: "또 다른 장소",
      description: "이곳은 또 다른 장소에 대한 설명입니다.",
      reviews: 50,
      price: 15000,
      image: "another-image-url-here",
    },
    {
      title: "카페&펍 연무장 던던 동대문점",
      description: "연무장 동대문점 - 스포츠 펍&카페 예약 문의는...",
      reviews: 93,
      price: 20000,
      image: "your-image-url-here",
    },
    {
      title: "또 다른 장소",
      description: "이곳은 또 다른 장소에 대한 설명입니다.",
      reviews: 50,
      price: 15000,
      image: "another-image-url-here",
    },
    {
      title: "카페&펍 연무장 던던 동대문점",
      description: "연무장 동대문점 - 스포츠 펍&카페 예약 문의는...",
      reviews: 93,
      price: 20000,
      image: "your-image-url-here",
    },
    {
      title: "또 다른 장소2",
      description: "이곳은 또 다른 장소에 대한 설명입니다.",
      reviews: 50,
      price: 15000,
      image: "another-image-url-here",
    },
  ];

  return (
    <div className="search-container">
      <div className="items-center">
        <SearchBox />
      </div>
      <div className="restaurants-container mt-10">
        {cards.map((card, index) => (
          <RestaurantSummaryCard
            key={index}
            title={card.title}
            description={card.description}
            reviewsCnt={card.reviews}
            price={card.price}
            imageUrl={card.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Search;
