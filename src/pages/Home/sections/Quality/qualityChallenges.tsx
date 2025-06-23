import React from 'react';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { translate } from '../../../../i18n/useTranslation';

// Tipos para tópicos teóricos e desafios
// QualityTopic: representa um tópico teórico de qualidade
// OptionType: representa as opções de resposta dos desafios (pode ser cor, label, etc)
// Challenge: representa um desafio interativo
export interface QualityTopic {
  title: string;
  icon: React.ElementType;
  description: string;
  keyPoints: string[];
}

export type OptionType =
  | { bg: string; fg: string; text: string } // Opção de cor (usado em contraste)
  | { label: string; value: string; type: string; pattern?: string } // Opção com label e valor
  | { label: string; value: string; pattern: string; type?: string }; // Opção com pattern

export interface Challenge {
  title: string;
  description: string;
  options: OptionType[];
  hint: string;
  solution: number;
  type: string;
  explanation: React.ReactNode;
}

// Array de tópicos teóricos
// Usamos translate para garantir internacionalização dinâmica
export const qualityTopics: QualityTopic[] = [
  {
    title: translate('quality.topics.0.title'),
    icon: IntegrationInstructionsIcon,
    description: translate('quality.topics.0.description'),
    keyPoints: [
      translate('quality.topics.0.keyPoints.0'),
      translate('quality.topics.0.keyPoints.1'),
      translate('quality.topics.0.keyPoints.2'),
      translate('quality.topics.0.keyPoints.3'),
    ]
  },
  {
    title: translate('quality.topics.1.title'),
    icon: SpeedIcon,
    description: translate('quality.topics.1.description'),
    keyPoints: [
      translate('quality.topics.1.keyPoints.0'),
      translate('quality.topics.1.keyPoints.1'),
      translate('quality.topics.1.keyPoints.2'),
      translate('quality.topics.1.keyPoints.3'),
    ]
  },
  {
    title: translate('quality.topics.2.title'),
    icon: SecurityIcon,
    description: translate('quality.topics.2.description'),
    keyPoints: [
      translate('quality.topics.2.keyPoints.0'),
      translate('quality.topics.2.keyPoints.1'),
      translate('quality.topics.2.keyPoints.2'),
      translate('quality.topics.2.keyPoints.3'),
    ]
  }
];

// Array de desafios interativos
// Cada desafio pode ter tipo diferente (button, contrast, code, multiple, form)
// Para adicionar um novo desafio, basta seguir o padrão abaixo
export const challenges: Challenge[] = [
  {
    title: "Encontre o bug na interface", // TODO: internacionalizar
    description: "Um dos botões tem um data-testid inconsistente com o padrão.", // TODO: internacionalizar
    hint: "Observe o padrão button-X nos data-testids e procure o que foge desse padrão", // TODO: internacionalizar
    solution: 1,
    type: "button",
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          Em testes automatizados, a consistência dos seletores é crucial. Data-testids inconsistentes podem causar falhas nos testes e dificultar a manutenção.
        </Typography>
      </Box>
    ),
    options: []
  },
  {
    title: "Acessibilidade - Contraste",
    description: "Qual dessas combinações de cores NÃO atende aos critérios mínimos de contraste WCAG?",
    hint: "O WCAG exige uma taxa de contraste mínima de 4.5:1 para texto normal",
    type: "contrast",
    options: [
      { bg: "#1A365D", fg: "#63B3ED", text: "Texto em azul claro sobre azul escuro" },
      { bg: "#2D3748", fg: "#EDF2F7", text: "Texto em cinza claro sobre cinza escuro" },
      { bg: "#744210", fg: "#F6E05E", text: "Texto em amarelo sobre marrom" },
      { bg: "#4A5568", fg: "#CBD5E0", text: "Texto em cinza médio sobre cinza escuro" }
    ],
    solution: 3,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          A combinação de cinza médio (#CBD5E0) sobre cinza escuro (#4A5568) tem uma taxa de contraste de 2.9:1, 
          abaixo do mínimo 4.5:1 requerido pelo WCAG 2.1. Um bom contraste é essencial para garantir que todos os usuários, 
          incluindo pessoas com baixa visão ou daltonismo, possam ler o conteúdo facilmente. 
          Você pode verificar taxas de contraste usando ferramentas como o WebAIM Contrast Checker ou o plugin WAVE para navegadores.
        </Typography>
      </Box>
    )
  },
  {
    title: "Semântica HTML",
    description: "Identifique o elemento que viola as boas práticas de acessibilidade:",
    hint: "Elementos nativos HTML são sempre preferíveis a elementos customizados com ARIA",
    type: "code",
    options: [
      { label: "<button onClick={handleClick}>Enviar</button>", value: "<button onClick={handleClick}>Enviar</button>", type: "string" },
      { label: "<div onClick={handleClick} role='button'>Enviar</div>", value: "<div onClick={handleClick} role='button'>Enviar</div>", type: "string" },
      { label: "<input type='submit' value='Enviar' />", value: "<input type='submit' value='Enviar' />", type: "string" },
      { label: "<a href='#' onClick={handleSubmit}>Enviar</a>", value: "<a href='#' onClick={handleSubmit}>Enviar</a>", type: "string" }
    ],
    solution: 1,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          Usar <code>&lt;div&gt;</code> como botão, mesmo com role='button', é uma prática ruim por várias razões:
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            1. Elementos nativos como &lt;button&gt; já vêm com comportamentos de acessibilidade integrados:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Foco via teclado (tabindex)</Typography>
            <Typography component="li" color="text.secondary">Interação via teclado (Enter/Space)</Typography>
            <Typography component="li" color="text.secondary">Anúncio correto por leitores de tela</Typography>
            <Typography component="li" color="text.secondary">Estados (hover, focus, active, disabled)</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            2. Ao usar &lt;div&gt;, você precisa recriar manualmente todos esses comportamentos:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Adicionar tabindex="0"</Typography>
            <Typography component="li" color="text.secondary">Implementar eventos de teclado</Typography>
            <Typography component="li" color="text.secondary">Gerenciar estados</Typography>
            <Typography component="li" color="text.secondary">Garantir ARIA labels corretos</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'normal' }}>
          Sempre prefira elementos HTML nativos para garantir melhor acessibilidade e manutenibilidade.
        </Typography>
      </Box>
    )
  },
  {
    title: "Performance Web",
    description: "Qual métrica NÃO faz parte do Core Web Vitals?",
    hint: "Core Web Vitals foca em três aspectos principais: carregamento, interatividade e estabilidade visual",
    type: "multiple",
    options: [
      { label: "First Contentful Paint (FCP)", value: "First Contentful Paint (FCP)", type: "string" },
      { label: "Largest Contentful Paint (LCP)", value: "Largest Contentful Paint (LCP)", type: "string" },
      { label: "Time to Interactive (TTI)", value: "Time to Interactive (TTI)", type: "string" },
      { label: "Cumulative Layout Shift (CLS)", value: "Cumulative Layout Shift (CLS)", type: "string" }
    ],
    solution: 2,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          O Time to Interactive (TTI) não faz parte do Core Web Vitals, que são as três métricas principais do Google para medir a experiência do usuário:
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Core Web Vitals:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">LCP (Largest Contentful Paint): Mede o tempo de carregamento - deve ser menor que 2.5s</Typography>
            <Typography component="li" color="text.secondary">FID (First Input Delay): Mede a interatividade - deve ser menor que 100ms</Typography>
            <Typography component="li" color="text.secondary">CLS (Cumulative Layout Shift): Mede a estabilidade visual - deve ser menor que 0.1</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" paragraph>
          Você pode medir essas métricas usando ferramentas como:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Typography component="li" color="text.secondary">PageSpeed Insights</Typography>
          <Typography component="li" color="text.secondary">Chrome DevTools Performance</Typography>
          <Typography component="li" color="text.secondary">web-vitals JavaScript library</Typography>
        </Box>
      </Box>
    )
  },
  {
    title: "Teste de API - Status Code",
    description: "Qual status HTTP é mais apropriado para uma requisição de criação bem-sucedida?",
    hint: "Pense na diferença entre uma resposta de sucesso genérica (200) e uma específica para criação",
    type: "multiple",
    options: [
      { label: "200 OK", value: "200 OK", type: "string" },
      { label: "201 Created", value: "201 Created", type: "string" },
      { label: "204 No Content", value: "204 No Content", type: "string" },
      { label: "202 Accepted", value: "202 Accepted", type: "string" }
    ],
    solution: 1,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          O status 201 Created é o código mais apropriado para criação de recursos por várias razões:
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Por que 201 é a melhor escolha:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Indica explicitamente que um novo recurso foi criado</Typography>
            <Typography component="li" color="text.secondary">Deve incluir o header Location com a URI do novo recurso</Typography>
            <Typography component="li" color="text.secondary">Ajuda na implementação correta do HATEOAS</Typography>
            <Typography component="li" color="text.secondary">Facilita o debug e monitoramento de APIs</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" paragraph>
          Para testar e validar status codes, você pode usar:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Typography component="li" color="text.secondary">Postman</Typography>
          <Typography component="li" color="text.secondary">Insomnia</Typography>
          <Typography component="li" color="text.secondary">curl na linha de comando</Typography>
        </Box>
      </Box>
    )
  },
  {
    title: "Acessibilidade - Aria Labels",
    description: "Identifique o uso incorreto de ARIA:",
    hint: "Evite redundância em atributos de acessibilidade, especialmente quando já existem alternativas nativas",
    type: "code",
    options: [
      { label: "<button aria-label='Fechar modal'>×</button>", value: "<button aria-label='Fechar modal'>×</button>", type: "string" },
      { label: "<img src='logo.png' aria-label='Logo' alt='Logo' />", value: "<img src='logo.png' aria-label='Logo' alt='Logo' />", type: "string" },
      { label: "<div role='button' aria-label='Enviar'>Enviar</div>", value: "<div role='button' aria-label='Enviar'>Enviar</div>", type: "string" },
      { label: "<span role='alert' aria-live='polite'>Erro no formulário</span>", value: "<span role='alert' aria-live='polite'>Erro no formulário</span>", type: "string" }
    ],
    solution: 1,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          Usar aria-label em uma imagem que já possui alt é redundante e pode causar problemas:
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Impactos na experiência do usuário:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Leitores de tela podem anunciar a mesma informação duas vezes</Typography>
            <Typography component="li" color="text.secondary">Pode confundir usuários quando os textos são diferentes</Typography>
            <Typography component="li" color="text.secondary">Aumenta desnecessariamente o tamanho do DOM</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" paragraph>
          Ferramentas para validar acessibilidade:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Typography component="li" color="text.secondary">NVDA ou VoiceOver para testar leitores de tela</Typography>
          <Typography component="li" color="text.secondary">axe DevTools para análise automatizada</Typography>
          <Typography component="li" color="text.secondary">WAVE Web Accessibility Tool</Typography>
        </Box>
      </Box>
    )
  },
  {
    title: "Bug de Validação",
    description: "Qual destes campos aceita um input inválido?",
    hint: "Verifique se os valores fazem sentido no mundo real, especialmente em datas",
    type: "form",
    options: [
      { label: "Email", value: "user@domain.com", type: "email" },
      { label: "Telefone", value: "123-456-789", type: "tel" },
      { label: "CEP", value: "12345-000", pattern: "\\d{5}-\\d{3}" },
      { label: "Data", value: "31/02/2024", type: "text" }
    ],
    solution: 3,
    explanation: "O campo de data aceita uma data inexistente (31 de fevereiro), demonstrando falta de validação adequada."
  },
  {
    title: "Teste de Regressão",
    description: "Qual cenário NÃO é adequado para automação de testes de regressão?",
    hint: "Considere quais tipos de testes dependem da criatividade e experiência humana",
    type: "multiple",
    options: [
      { label: "Login com diferentes perfis de usuário", value: "Login com diferentes perfis de usuário", type: "string" },
      { label: "Validação de campos obrigatórios", value: "Validação de campos obrigatórios", type: "string" },
      { label: "Testes exploratórios de nova funcionalidade", value: "Testes exploratórios de nova funcionalidade", type: "string" },
      { label: "Verificação de fluxo de checkout", value: "Verificação de fluxo de checkout", type: "string" }
    ],
    solution: 2,
    explanation: "Testes exploratórios são, por definição, manuais e baseados na experiência do testador, não sendo adequados para automação."
  },
  {
    title: "SEO e Acessibilidade",
    description: "Qual estrutura HTML prejudica tanto SEO quanto acessibilidade?",
    hint: "HTML semântico é crucial tanto para SEO quanto para acessibilidade",
    type: "code",
    options: [
      { label: "<h1>Título</h1><h3>Subtítulo</h3>", value: "<h1>Título</h1><h3>Subtítulo</h3>", type: "string" },
      { label: "<main><header><nav>Menu</nav></header></main>", value: "<main><header><nav>Menu</nav></header></main>", type: "string" },
      { label: "<button onclick='submit()'>Enviar</button>", value: "<button onclick='submit()'>Enviar</button>", type: "string" },
      { label: "<div class='heading'>Título Principal</div>", value: "<div class='heading'>Título Principal</div>", type: "string" }
    ],
    solution: 3,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          Usar <code>&lt;div class=\"heading\"&gt;</code> em vez de tags semânticas de cabeçalho é prejudicial por várias razões:
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Impacto na Acessibilidade:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Leitores de tela não reconhecem a div como cabeçalho</Typography>
            <Typography component="li" color="text.secondary">Usuários não conseguem navegar pela estrutura do documento usando atalhos de teclado</Typography>
            <Typography component="li" color="text.secondary">Perde-se a hierarquia natural de conteúdo (h1 → h6)</Typography>
            <Typography component="li" color="text.secondary">Dificulta a compreensão da importância relativa do conteúdo</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Impacto no SEO:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Crawlers não identificam a hierarquia do conteúdo</Typography>
            <Typography component="li" color="text.secondary">Perde-se peso semântico para rankings de busca</Typography>
            <Typography component="li" color="text.secondary">Dificulta a geração de featured snippets</Typography>
            <Typography component="li" color="text.secondary">Reduz a relevância do conteúdo para buscadores</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Importância da Hierarquia de Headers:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">H1: Título principal da página (deve ser único)</Typography>
            <Typography component="li" color="text.secondary">H2: Seções principais do conteúdo</Typography>
            <Typography component="li" color="text.secondary">H3-H6: Subseções em ordem de importância</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" paragraph>
          Para validar a estrutura de headers, você pode usar:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Typography component="li" color="text.secondary">HeadingsMap (extensão do navegador)</Typography>
          <Typography component="li" color="text.secondary">WAVE Web Accessibility Tool</Typography>
          <Typography component="li" color="text.secondary">Lighthouse Accessibility Audit</Typography>
        </Box>
      </Box>
    )
  },
  {
    title: "Performance - Lighthouse",
    description: "Qual métrica NÃO impacta diretamente o score de performance no Lighthouse?",
    hint: "Foque nas métricas que afetam diretamente a experiência do usuário",
    type: "multiple",
    options: [
      { label: "First Contentful Paint (FCP)", value: "First Contentful Paint (FCP)", type: "string" },
      { label: "Time to First Byte (TTFB)", value: "Time to First Byte (TTFB)", type: "string" },
      { label: "Number of DOM Elements", value: "Number of DOM Elements", type: "string" },
      { label: "Total Blocking Time (TBT)", value: "Total Blocking Time (TBT)", type: "string" }
    ],
    solution: 2,
    explanation: (
      <Box>
        <Typography color="text.secondary" paragraph>
          O número de elementos DOM é uma métrica secundária que, embora importante, não impacta diretamente o score de performance do Lighthouse.
        </Typography>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Impactos indiretos do número de elementos DOM:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">Tempo de processamento do JavaScript (parse e compile)</Typography>
            <Typography component="li" color="text.secondary">Consumo de memória do navegador</Typography>
            <Typography component="li" color="text.secondary">Tempo de renderização (paint time)</Typography>
            <Typography component="li" color="text.secondary">Complexidade do layout e reflows</Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Typography color="text.secondary" fontWeight="bold">
            Métricas que impactam diretamente o score:
          </Typography>
          <Box component="ul" sx={{ pl: 4, mt: 1 }}>
            <Typography component="li" color="text.secondary">First Contentful Paint (FCP): Primeira renderização de qualquer conteúdo</Typography>
            <Typography component="li" color="text.secondary">Total Blocking Time (TBT): Tempo total que a thread principal fica bloqueada</Typography>
            <Typography component="li" color="text.secondary">Speed Index: Velocidade com que o conteúdo é visualmente preenchido</Typography>
            <Typography component="li" color="text.secondary">Largest Contentful Paint (LCP): Renderização do maior elemento visível</Typography>
            <Typography component="li" color="text.secondary">Cumulative Layout Shift (CLS): Estabilidade visual durante o carregamento</Typography>
          </Box>
        </Box>
        <Typography color="text.secondary" paragraph>
          Ferramentas recomendadas para análise:
        </Typography>
        <Box component="ul" sx={{ pl: 4, mt: 1 }}>
          <Typography component="li" color="text.secondary">Chrome DevTools Performance Panel</Typography>
          <Typography component="li" color="text.secondary">Lighthouse CI para monitoramento contínuo</Typography>
          <Typography component="li" color="text.secondary">WebPageTest para análise detalhada</Typography>
        </Box>
      </Box>
    )
  }
]; 