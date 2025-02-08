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
- React
- TypeScript
- Material-UI (MUI)
- Emotion (para estilos)
- Vite
- React Toastify (para notificações)

## 🚀 Funcionalidades

### Hero Section
- **Avatar Responsivo**: 
  - Centralizado em dispositivos móveis
  - Alinhado à esquerda em desktop
- **Animação de Background**: 
  - SVG animado customizado
  - Posicionamento dinâmico atrás do avatar
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
  - Nome padronizado para download
- **Botão de Contato**: 
  - Desktop:
    - Menu colapsável ao hover
    - Opções: LinkedIn, Email, WhatsApp
    - Links diretos para cada plataforma
  - Mobile:
    - Ação direta para WhatsApp
  - Integração com:
    - LinkedIn: Perfil profissional
    - Email: Cliente de email padrão
    - WhatsApp: Chat direto

### Notificações Toast
- Posicionamento customizado:
  - Desktop: Alinhado à direita, abaixo da navbar
  - Mobile: Centralizado, abaixo da navbar
- Estilo adaptativo:
  - Largura responsiva (90% em mobile)
  - Texto centralizado em telas pequenas
  - Bordas arredondadas
  - Tema escuro

## 🎨 Tema Personalizado
O projeto utiliza um tema personalizado do Material-UI com:

### Paleta de Cores
- **Primary**
  - Main: #232730
  - Light: #484D5B
  - Dark: #16181F
  - Contrast: #FFFFFF

- **Secondary**
  - Main: #945DD6
  - Light: #B68EE3
  - Dark: #6E45A0
  - Contrast: #FFFFFF

### Tipografia
- Família de fontes: Roboto, Helvetica, Arial, sans-serif
- H1: 
  - Mobile: 2.5rem
  - Desktop: 3.5rem
  - Peso: 700
- H2:
  - Mobile: 1.75rem
  - Desktop: 2.5rem
  - Peso: 600

### Componentes Customizados
- Botões com bordas arredondadas (8px)
- Texto sem transformação maiúscula
