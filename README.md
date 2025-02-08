# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# Portfolio Lucas Falcão

## 📋 Sobre o Projeto
Portfolio pessoal desenvolvido em React + TypeScript, utilizando Material-UI para estilização e componentes.

## 🛠️ Tecnologias Utilizadas
- React 18
- TypeScript
- Material-UI (MUI)
- Emotion (para estilos)
- Vite
- React Toastify (para notificações)

## 🚀 Funcionalidades

### Hero Section
- **Avatar Responsivo**: 
  - Centralizado em dispositivos móveis (xs)
  - Alinhado à esquerda em desktop (md)
  - Borda circular com contorno personalizado

- **Animação de Background**: 
  - SVG animado customizado
  - Posicionamento dinâmico atrás do avatar
  - Efeitos de gradiente e opacidade

- **Download CV**: 
  - Botão para download automático do currículo
  - Sistema de cooldown de 10 segundos entre downloads
  - Verificação de conexão com internet
  - Notificações toast para:
    - Download iniciado com sucesso
    - Erro de conexão
    - Tempo de espera necessário
    - Erros gerais
  - Formato PDF
  - Nome padronizado para download: 'Lucas_Falcao_CV.pdf'

- **Botão de Contato**: 
  - Desktop (md):
    - Menu colapsável (Popover) ao clicar
    - Opções: LinkedIn, Email, WhatsApp
    - Links diretos para cada plataforma
    - Efeito hover em cada opção
  - Mobile (xs):
    - Ação direta para WhatsApp
  - Integração com:
    - LinkedIn: Perfil profissional direto
    - Email: Cliente de email padrão (mailto)
    - WhatsApp: Chat direto via API do WhatsApp

### Sistema de Notificações
- **Toast Notifications**:
  - Posicionamento customizado:
    - Desktop: Alinhado à direita, abaixo da navbar
    - Mobile: Centralizado, abaixo da navbar
  - Estilo adaptativo:
    - Largura responsiva (90% em mobile)
    - Texto centralizado em telas pequenas
    - Bordas arredondadas (8px)
    - Tema escuro
  - Tipos de notificações:
    - Sucesso (verde)
    - Aviso (amarelo)
    - Erro (vermelho)
  - Duração: 3 segundos
  - Interativo: Fechamento ao clicar

## 🎨 Design System

### Responsividade
- **Breakpoints**:
  - xs: < 600px (Mobile)
  - md: ≥ 900px (Desktop)

### Tema Personalizado
- **Paleta de Cores**:
  - Primary:
    - Main: #232730
    - Light: #484D5B
    - Dark: #16181F
    - Contrast: #FFFFFF
  - Secondary:
    - Main: #945DD6
    - Light: #B68EE3
    - Dark: #6E45A0
    - Contrast: #FFFFFF
  - Background:
    - Default: #232730
    - Paper: #2C3140
  - Text:
    - Primary: #FFFFFF
    - Secondary: #B0B4BE

### Tipografia
- **Família de fontes**: Roboto, Helvetica, Arial, sans-serif
- **Hierarquia**:
  - H1: 
    - Mobile: 2.5rem
    - Desktop: 3.5rem
    - Peso: 700
  - H2:
    - Mobile: 1.75rem
    - Desktop: 2.5rem
    - Peso: 600

### Componentes Customizados
- **Botões**:
  - Bordas arredondadas (8px)
  - Texto sem transformação maiúscula
  - Efeitos hover
  - Ícones integrados

- **Menu de Contato**:
  - Espaçamento interno: theme.spacing(2)
  - Gap entre opções: theme.spacing(1)
  - Transição suave no hover
  - Ícones coloridos por categoria

## 🔧 Configurações
- Suporte a PDF via Vite
- Declarações de tipos personalizadas
- Tema MUI customizado
- Toastify configurado globalmente
