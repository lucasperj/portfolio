import React from 'react';
import NavBar from "../components/common/NavBar/NavBar";
import Articles from "./QALab/sections/Articles/Articles";
import Challenges from "./QALab/sections/Challenges/Challenges";
import Projects from "./QALab/sections/Projects/Projects";

const QALabPage = () => {
  return (
    <div style={{ paddingTop: 54 }}>
      <NavBar />
      
      {/* Seção 1: Hero (futura) - por enquanto vazia */}
      <section id="qalab-hero">
        {/* Conteúdo do Hero será adicionado posteriormente */}
      </section>

      {/* Seção 2: Desafios */}
      <section id="challenges">
        <Challenges />
      </section>

      {/* Seção 3: Artigos */}
      <section id="articles">
        <Articles />
      </section>

      {/* Seção 4: Projetos */}
      <section id="qalab-projects">
        <Projects />
      </section>

      {/* Footer bem definido */}
      <footer style={{
        backgroundColor: '#7c3aed',
        color: 'white',
        padding: '30px 20px',
        textAlign: 'center',
        marginTop: '80px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px', fontSize: '2rem' }}>
            Quer saber quem está por trás disso tudo?
          </h2>
          <p style={{ marginBottom: '30px', fontSize: '1.1rem', opacity: 0.9 }}>
            Descubra mais sobre minha jornada, experiência e projetos no portfólio principal
          </p>
          <button style={{
            backgroundColor: 'white',
            color: '#7c3aed',
            border: 'none',
            padding: '15px 30px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(0,0,0,0.15)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
          }}
          onClick={() => window.location.href = '/'}
          >
            Ver mais sobre mim
          </button>
        </div>
      </footer>
    </div>
  );
};

export default QALabPage; 