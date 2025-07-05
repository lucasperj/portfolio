import React from 'react';
import NavBar from "../components/common/NavBar/NavBar";
import Articles from "./QALab/sections/Articles/Articles";
import Challenges from "./QALab/sections/Challenges/Challenges";
import Projects from "./QALab/sections/Projects/Projects";

const QALabPage = () => {
  return (
    <div style={{ paddingTop: 54 }}>
      <NavBar />
      <section id="articles-carousel">
        <Articles />
      </section>
      <section id="challenges">
        <Challenges />
      </section>
      <section id="qalab-projects">
        <Projects />
      </section>
      {/* Chamada para voltar ao portfólio */}
      <section id="back-to-portfolio">
        <h2>Quer saber quem está por trás disso tudo?</h2>
        <button>Ver mais sobre mim</button>
      </section>
    </div>
  );
};

export default QALabPage; 