
import NavBar from "../components/common/NavBar";
import Hero from "./Home/sections/Hero/Hero";
import About from "./Home/sections/About/About";
import Quality from "./Home/sections/Quality/Quality";
import Projects from "./Home/sections/Projects/Projects";
import ScrollToTopButton from '../components/common/ScrollToTopButton';

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Quality />
      <Projects />
      <ScrollToTopButton />
    </>
  );
};

export default HomePage; 