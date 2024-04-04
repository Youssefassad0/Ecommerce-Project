import React from "react";
import NavBar2 from "./components2/NavBar2";
import { Banner } from "./components2/Banner";
import { Skills } from "./components2/Skills";
import { Projects } from "./components2/Projects";
import './App2.css'
import { Contact } from "./components2/Contact";
import { Footer } from "./components2/Footer2";
const App2 = () => {
  return (
    <div className="App2">
      <NavBar2 />
      <Banner />
      <Skills />
      <Projects />
      <Contact/>
      <Footer/>
    </div>
  );
};

export default App2;
