import React from "react";
import Slider from "react-slick";
import houseimg1 from "../assets/image/house/house1.png";
import houseimg2 from "../assets/image/house/house2.png";

const houseImages = [houseimg1, houseimg2];

const HouseCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="px-6 pb-5">
      <Slider {...settings}>
        {houseImages.map((src, i) => (
          <div key={i} className="flex justify-center">
            <img
              src={src}
              alt={`house ${i + 1}`}
              className="w-full h-96 md:h-[550px] object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HouseCarousel;
