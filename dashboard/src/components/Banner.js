import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  const [topBanners, setTopBanners] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/top-banner`)
      .then((res) => res.json())
      .then((info) => setTopBanners(info));
  }, []);

  return (
    <>
      
      Banner Here
    </>
  );
};

export default Banner;
