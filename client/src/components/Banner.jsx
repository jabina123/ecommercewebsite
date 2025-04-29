import React from "react";
import bannerImg from "../assets/banner.jpg"; // ⬅️ Add your banner image in assets folder

const Banner = () => {
  return (
    <div>
      <img src={bannerImg} alt="E-Shop Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
};

export default Banner;
