// src/components/AdCarousel.jsx
import React from "react";
import Slider from "react-slick";
import adimg1 from "../assets/image/ad1.png";
import adimg2 from "../assets/image/ad2.png";

const adImages = [adimg1, adimg2];

const AdCarousel = () => {
  const settings = {
    dots: true, // 아래 점(dot) 네비
    infinite: true, // 무한 슬라이드
    speed: 500, // 슬라이드 속도(ms)
    slidesToShow: 1, // 한 번에 보이는 배너 개수
    slidesToScroll: 1,
    autoplay: true, // 자동 슬라이드
    autoplaySpeed: 3000, // 자동 재생 간격(ms)
    arrows: false, // 좌우 화살표 숨기기
    pauseOnHover: true, // 마우스 올리면 멈춤
  };

  return (
    <Slider {...settings} style={{ maxWidth: "600px", margin: "0 auto" }}>
      {adImages.map((src, idx) => (
        <div key={idx}>
          <img
            src={src}
            alt={`광고 ${idx + 1}`}
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default AdCarousel;
