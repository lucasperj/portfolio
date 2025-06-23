// ========================================
// DADOS ESTRUTURAIS DOS DESAFIOS DE QUALIDADE
// ========================================
// Este arquivo contém apenas a estrutura base dos desafios
// Os textos traduzíveis são montados dinamicamente no componente Quality.tsx
// usando o sistema de internacionalização (i18n)

// Interface para os dados estruturais dos desafios
// Contém apenas informações não traduzíveis (tipo, solução, estrutura das opções)
export interface ChallengeData {
  type: string;        // Tipo do desafio (button, contrast, code, multiple, form)
  solution: number;    // Índice da resposta correta (0-3)
  options: any[];      // Estrutura das opções (sem textos traduzíveis)
}

// ========================================
// DADOS ESTRUTURAIS DOS DESAFIOS
// ========================================
// Cada objeto contém apenas a estrutura, sem textos traduzíveis
// Os textos são obtidos dinamicamente do sistema de tradução
export const challengesData: ChallengeData[] = [
  // Desafio 0: Data-testid inconsistente
  {
    type: "button",
    solution: 1, // Opção 2 é a incorreta (data-testid="incorrect-button")
    options: [] // Opções são montadas dinamicamente no componente
  },
  
  // Desafio 1: Contraste de cores (WCAG)
  {
    type: "contrast",
    solution: 3, // Última opção tem contraste insuficiente
    options: [
      { bg: "#1A365D", fg: "#63B3ED" }, // Azul claro sobre azul escuro
      { bg: "#2D3748", fg: "#EDF2F7" }, // Cinza claro sobre cinza escuro
      { bg: "#744210", fg: "#F6E05E" }, // Amarelo sobre marrom
      { bg: "#4A5568", fg: "#CBD5E0" }  // Cinza médio sobre cinza escuro (INSUFICIENTE)
    ]
  },
  
  // Desafio 2: Semântica HTML
  {
    type: "code",
    solution: 1, // <div role='button'> é menos acessível
    options: [
      { type: "string" }, // <button> nativo
      { type: "string" }, // <div role='button'> (INCORRETO)
      { type: "string" }, // <input type='submit'>
      { type: "string" }  // <a> com onClick
    ]
  },
  
  // Desafio 3: Core Web Vitals
  {
    type: "multiple",
    solution: 2, // TTI não faz parte do Core Web Vitals
    options: [
      { type: "string" }, // FCP
      { type: "string" }, // LCP
      { type: "string" }, // TTI (INCORRETO)
      { type: "string" }  // CLS
    ]
  },
  
  // Desafio 4: Status HTTP
  {
    type: "multiple",
    solution: 1, // 201 Created é o mais apropriado
    options: [
      { type: "string" }, // 200 OK
      { type: "string" }, // 201 Created (CORRETO)
      { type: "string" }, // 204 No Content
      { type: "string" }  // 202 Accepted
    ]
  },
  
  // Desafio 5: ARIA Labels
  {
    type: "code",
    solution: 1, // aria-label redundante com alt
    options: [
      { type: "string" }, // <button> com aria-label
      { type: "string" }, // <img> com aria-label + alt (INCORRETO)
      { type: "string" }, // <div role='button'>
      { type: "string" }  // <span role='alert'>
    ]
  },
  
  // Desafio 6: Validação de formulário
  {
    type: "form",
    solution: 3, // Data inválida (31/02/2024)
    options: [
      { type: "email" },           // Email válido
      { type: "tel" },             // Telefone válido
      { pattern: "\\d{5}-\\d{3}" }, // CEP válido
      { type: "text" }             // Data inválida (INCORRETO)
    ]
  },
  
  // Desafio 7: Testes de regressão
  {
    type: "multiple",
    solution: 2, // Testes exploratórios não são adequados para automação
    options: [
      { type: "string" }, // Login com perfis
      { type: "string" }, // Validação de campos
      { type: "string" }, // Testes exploratórios (INCORRETO)
      { type: "string" }  // Fluxo de checkout
    ]
  },
  
  // Desafio 8: SEO e acessibilidade
  {
    type: "code",
    solution: 3, // <div class='heading'> prejudica SEO e acessibilidade
    options: [
      { type: "string" }, // <h1><h3> (hierarquia correta)
      { type: "string" }, // <main><header><nav> (semântico)
      { type: "string" }, // <button onclick> (inline handler)
      { type: "string" }  // <div class='heading'> (INCORRETO)
    ]
  },
  
  // Desafio 9: Performance Lighthouse
  {
    type: "multiple",
    solution: 2, // Number of DOM Elements não impacta diretamente
    options: [
      { type: "string" }, // FCP
      { type: "string" }, // TTFB
      { type: "string" }, // Number of DOM Elements (INCORRETO)
      { type: "string" }  // TBT
    ]
  }
]; 