import React from 'react';

const HomePage = () => {
  return (
    <div>
      {/* Hero Section: Foto, nome, CV, contato */}
      <section id="hero">
        <h1>Hero (Foto, Nome, CV, Contato)</h1>
      </section>

      {/* Sobre mim: Jornada, skills, experiências */}
      <section id="about">
        <h2>Sobre mim</h2>
        <p>Jornada, skills, experiências profissionais...</p>
      </section>

      {/* Chamada visual para o QA Lab */}
      <section id="qalab-cta">
        <h2>Conheça o FalQAo Lab</h2>
        <button>Ir para o QA Lab</button>
      </section>

      {/* Quality Topics (resumido/construtivo) */}
      <section id="quality-topics">
        <h2>Quality Topics</h2>
        <p>Resumo dos tópicos de qualidade...</p>
      </section>

      {/* Projetos */}
      <section id="projects">
        <h2>Projetos</h2>
        <p>Lista de projetos...</p>
      </section>
    </div>
  );
};

export default HomePage; 