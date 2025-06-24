import React from 'react';
import NavBar from "../components/common/NavBar/NavBar";
import Hero from "./Home/sections/Hero/Hero";
import About from "./Home/sections/About/About";
import Quality from "./Home/sections/Quality/Quality";
import Projects from "./Home/sections/Projects/Projects";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Quality />
      <Projects />
    </>
  );
};

export default HomePage; 