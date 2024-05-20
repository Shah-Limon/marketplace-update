import React from "react";
import Banner from "../components/Banner";
import RecentProducts from "../components/HomePage/RecentProducts";
import Features from "../components/HomePage/Features";
import Testimonials from "../components/HomePage/Testimonials";
import Counter from "../components/HomePage/Counter";
import Contact from "../components/HomePage/Contact";


const Home = () => {
  return (
    <>
      <Banner></Banner>
      <RecentProducts></RecentProducts>
      <Features></Features>
      <Testimonials></Testimonials>
      <Counter></Counter>
      <Contact></Contact>
    </>
  );
};

export default Home;
