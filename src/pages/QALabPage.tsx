import React from 'react';
import NavBar from "../components/common/NavBar/NavBar";

const QALabPage = () => {
  return (
    <div>
      {/* Carrossel de artigos/publicações técnicas */}
      <section id="articles-carousel">
        <h1>Artigos e Publicações Técnicas</h1>
      </section>

      {/* Desafios interativos (quiz, etc) */}
      <section id="challenges">
        <h2>Desafios Interativos</h2>
        <p>Quiz, desafios de qualidade, etc...</p>
      </section>

      {/* Projetos de automação, frameworks, ferramentas */}
      <section id="qalab-projects">
        <h2>Projetos de Automação</h2>
        <p>Projetos, frameworks, ferramentas...</p>
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