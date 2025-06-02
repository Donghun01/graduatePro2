import React from "react";
import Slider from "react-slick";
import adimg1 from "../assets/image/ad1.png";
import adimg2 from "../assets/image/ad2.png";

const adImages = [adimg1, adimg2];

const AdCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: true,
  };

  return (
    <div className="px-6 pb-6">
      <Slider {...settings}>
        {adImages.map((src, idx) => (
          <div key={idx} className="flex justify-center">
            <img
              src={src}
              alt={`광고 ${idx + 1}`}
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default AdCarousel;
