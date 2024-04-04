import React from "react";
import Banner from "./Banner";
import HomeCategory from "./HomeCategory";
import CategoryShow from "./CategoryShow";
import Register from "./Register";
import About from "./About";
import AppSection from "./AppSection";
import Sponsor from "./Sponsor";
import Chat from "../ChatSupport/Home/IndexHome";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeCategory />
      <CategoryShow />
      <Register />
      <About />
      <AppSection />
      <Sponsor />
    </div>
  );
};

export default Home;
