// src/components/HouseCarousel.jsx
import React from "react";
import Slider from "react-slick";
import houseimg1 from "../assets/image/house1.png";
import houseimg2 from "../assets/image/house2.png";

// 여기에 집 이미지들을 public 폴더나 src/assets 폴더에 넣어두고 경로를 맞춰주세요.
const houseImages = [houseimg1, houseimg2];

const HouseCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  return (
    <Slider {...settings}>
      {houseImages.map((src, i) => (
        <div key={i}>
          <img
            src={src}
            alt={`house ${i + 1}`}
            style={{ width: "100%", borderRadius: 8 }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default HouseCarousel;
