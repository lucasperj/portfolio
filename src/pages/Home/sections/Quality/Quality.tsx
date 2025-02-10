import { Box, Container, Grid, Typography, Paper, Collapse, IconButton, Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import BugReportIcon from '@mui/icons-material/BugReport';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useState } from "react";
import { motion } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ErrorIcon from '@mui/icons-material/Error';

const StyledSkills = styled("div")(({theme}) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(10, 0),
    [theme.breakpoints.down('md')]: {
        padding: theme.spacing(5, 0),
    }
}));

const StyledPaper = styled(Paper)(({theme}) => ({
    padding: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    marginBottom: theme.spacing(4),
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    '& .sectionIcon': {
        fontSize: '2rem',
        color: theme.palette.primary.main,
        marginRight: theme.spacing(2)
    }
}));

const ExpandMore = styled(IconButton)(({ theme }) => ({
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    '&.expanded': {
        transform: 'rotate(180deg)',
    }
}));

const ChallengeButton = styled('button')(({theme}) => ({
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        backgroundColor: theme.palette.action.hover,
    }
}));

const ColorOption = styled('div')<{ bg: string; fg: string }>(({ bg, fg }) => ({
    padding: '12px',
    borderRadius: '4px',
    backgroundColor: bg,
    color: fg,
    cursor: 'pointer',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.2s',
    '&:hover': {
        transform: 'scale(1.02)'
    }
}));

const QualityCard = ({ topic }: { topic: QualityTopic }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <StyledPaper elevation={3}>
            <Box display="flex" alignItems="center" mb={isExpanded ? 2 : 0}>
                <topic.icon className="sectionIcon" />
                <Box flex={1}>
                    <Typography variant="h6" color="primary.contrastText">
                        {topic.title}
                    </Typography>
                </Box>
                <ExpandMore
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={isExpanded ? 'expanded' : ''}
                    aria-expanded={isExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </Box>
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <Box mt={2}>
                    <Typography color="text.secondary" paragraph>
                        {topic.description}
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mt: 1 }}>
                        {topic.keyPoints.map((point, index) => (
                            <Typography 
                                key={index} 
                                component="li" 
                                color="text.secondary"
                                sx={{ mb: 1 }}
                            >
                                {point}
                            </Typography>
                        ))}
                    </Box>
                </Box>
            </Collapse>
        </StyledPaper>
    );
};

interface QualityTopic {
    title: string;
    icon: React.ElementType;
    description: string;
    keyPoints: string[];
}

type OptionType = 
    | { bg: string; fg: string; text: string } 
    | { label: string; value: string; type: string; pattern?: string }
    | { label: string; value: string; pattern: string; type?: string };

interface Challenge {
    title: string;
    description: string;
    options: OptionType[];
    hint: string;
    solution: number;
    type: string;
    explanation: React.ReactNode;
}

const Quality = () => {
    const [bugFound, setBugFound] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [currentChallenge, setCurrentChallenge] = useState(0);
    const [showFinalMessage, setShowFinalMessage] = useState(false);
    const [totalAttempts, setTotalAttempts] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const qualityTopics: QualityTopic[] = [
        {
            title: "Testes Funcionais e Automação",
            icon: IntegrationInstructionsIcon,
            description: "A automação de testes é fundamental para garantir a qualidade contínua do software, permitindo testes rápidos e consistentes.",
            keyPoints: [
                "Desenvolvimento de frameworks robustos de automação",
                "Integração com CI/CD para feedback rápido",
                "Cobertura estratégica de testes",
                "Manutenibilidade e reusabilidade de código"
            ]
        },
        {
            title: "Performance e Escalabilidade",
            icon: SpeedIcon,
            description: "Garantir que o software não apenas funcione, mas funcione bem sob diferentes condições de carga e uso.",
            keyPoints: [
                "Testes de carga e stress",
                "Monitoramento de métricas-chave",
                "Otimização de recursos",
                "Análise de gargalos"
            ]
        },
        {
            title: "Segurança e Conformidade",
            icon: SecurityIcon,
            description: "A segurança é um aspecto crítico da qualidade, protegendo dados e garantindo conformidade com regulamentações.",
            keyPoints: [
                "Testes de penetração",
                "Análise de vulnerabilidades",
                "Proteção de dados sensíveis",
                "Conformidade com LGPD/GDPR"
            ]
        }
    ];

    const challenges: Challenge[] = [
        {
            title: "Encontre o bug na interface",
            description: "Um dos botões tem um data-testid inconsistente com o padrão.",
            hint: "Observe o padrão button-X nos data-testids e procure o que foge desse padrão",
            solution: 1,
            type: "button",
            explanation: "Em testes automatizados, a consistência dos seletores é crucial. Data-testids inconsistentes podem causar falhas nos testes e dificultar a manutenção."
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
            explanation: `A combinação de cinza médio (#CBD5E0) sobre cinza escuro (#4A5568) tem uma taxa de contraste de 2.9:1, 
                abaixo do mínimo 4.5:1 requerido pelo WCAG 2.1. Um bom contraste é essencial para garantir que todos os usuários, 
                incluindo pessoas com baixa visão ou daltonismo, possam ler o conteúdo facilmente. 
                Você pode verificar taxas de contraste usando ferramentas como o WebAIM Contrast Checker ou o plugin WAVE para navegadores.`
        },
        {
            title: "Semântica HTML",
            description: "Identifique o elemento que viola as boas práticas de acessibilidade:",
            hint: "Elementos nativos HTML são sempre preferíveis a elementos customizados com ARIA",
            type: "code",
            options: [
                "<button onClick={handleClick}>Enviar</button>",
                "<div onClick={handleClick} role='button'>Enviar</div>",
                "<input type='submit' value='Enviar' />",
                "<a href='#' onClick={handleSubmit}>Enviar</a>"
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

                    <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
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
                "First Contentful Paint (FCP)",
                "Largest Contentful Paint (LCP)",
                "Time to Interactive (TTI)",
                "Cumulative Layout Shift (CLS)"
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
                "200 OK",
                "201 Created",
                "204 No Content",
                "202 Accepted"
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
                "<button aria-label='Fechar modal'>×</button>",
                "<img src='logo.png' aria-label='Logo' alt='Logo' />",
                "<div role='button' aria-label='Enviar'>Enviar</div>",
                "<span role='alert' aria-live='polite'>Erro no formulário</span>"
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
                "Login com diferentes perfis de usuário",
                "Validação de campos obrigatórios",
                "Testes exploratórios de nova funcionalidade",
                "Verificação de fluxo de checkout"
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
                "<h1>Título</h1><h3>Subtítulo</h3>",
                "<main><header><nav>Menu</nav></header></main>",
                "<button onclick='submit()'>Enviar</button>",
                "<div class='heading'>Título Principal</div>"
            ],
            solution: 3,
            explanation: (
                <Box>
                    <Typography color="text.secondary" paragraph>
                        Usar <code>&lt;div class="heading"&gt;</code> em vez de tags semânticas de cabeçalho é prejudicial por várias razões:
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
                "First Contentful Paint (FCP)",
                "Time to First Byte (TTFB)",
                "Number of DOM Elements",
                "Total Blocking Time (TBT)"
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

    const handleOptionClick = async (index: number) => {
        try {
            // Verifica conexão com internet
            if (!navigator.onLine) {
                setError('Você está offline. Verifique sua conexão com a internet e tente novamente.');
                return;
            }

            if (!bugFound) {
                setAttempts(prev => prev + 1);
            }
            if (index === challenges[currentChallenge].solution) {
                setBugFound(true);
            }
            setError(null); // Limpa erro se tudo ok
        } catch (err) {
            setError('Ocorreu um erro ao processar sua resposta. Por favor, tente novamente.');
        }
    };

    const resetChallenge = () => {
        if (currentChallenge === challenges.length - 1) {
            setShowFinalMessage(true);
            setTotalAttempts(prev => [...prev, attempts]);
        } else {
            setBugFound(false);
            setAttempts(0);
            setCurrentChallenge(prev => prev + 1);
            setTotalAttempts(prev => [...prev, attempts]);
        }
    };

    const goToPreviousChallenge = () => {
        setBugFound(false);
        setAttempts(0);
        setCurrentChallenge((prev) => (prev - 1 + challenges.length) % challenges.length);
    };

    const calculateAverageAttempts = () => {
        const total = totalAttempts.reduce((acc, curr) => acc + curr, 0);
        return (total / totalAttempts.length).toFixed(1);
    };

    const renderChallenge = () => {
        const challenge = challenges[currentChallenge];

        switch (challenge.type) {
            case "contrast":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option: OptionType, index) => (
                            'bg' in option && 'fg' in option ? (
                                <ColorOption
                                    key={index}
                                    bg={option.bg}
                                    fg={option.fg}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    {option.text}
                                </ColorOption>
                            ) : null
                        ))}
                    </Box>
                );
            case "button":
                return (
                    <Box display="flex" gap={2} flexWrap="wrap">
                        <ChallengeButton 
                            onClick={() => handleOptionClick(0)} 
                            data-testid="button-1"
                        >
                            Opção 1
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(1)} 
                            data-testid="correct-button"
                        >
                            Opção 2
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(2)} 
                            data-testid="button-3"
                        >
                            Opção 3
                        </ChallengeButton>
                        <ChallengeButton 
                            onClick={() => handleOptionClick(3)} 
                            data-testid="button-4"
                        >
                            Opção 4
                        </ChallengeButton>
                    </Box>
                );
            case "code":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option, index) => (
                            <ChallengeButton
                                key={index}
                                onClick={() => handleOptionClick(index)}
                                sx={{
                                    fontFamily: 'monospace',
                                    textAlign: 'left',
                                    whiteSpace: 'pre-wrap',
                                    padding: '12px',
                                    backgroundColor: theme => theme.palette.background.paper,
                                    '&:hover': {
                                        backgroundColor: theme => theme.palette.action.hover
                                    }
                                }}
                            >
                                {option}
                            </ChallengeButton>
                        ))}
                    </Box>
                );
            case "multiple":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option, index) => (
                            <ChallengeButton
                                key={index}
                                onClick={() => handleOptionClick(index)}
                            >
                                {option}
                            </ChallengeButton>
                        ))}
                    </Box>
                );
            case "form":
                return (
                    <Box display="flex" flexDirection="column" gap={2}>
                        {challenge.options?.map((option: OptionType, index) => (
                            'label' in option && 'value' in option ? (
                                <ChallengeButton
                                    key={index}
                                    onClick={() => handleOptionClick(index)}
                                >
                                    {`${option.label}: ${option.value}`}
                                </ChallengeButton>
                            ) : null
                        ))}
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <StyledSkills id="quality">
            <Container maxWidth="lg">
                {!showFinalMessage ? (
                    <Grid container spacing={4} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h2" color="primary.contrastText" textAlign="center" gutterBottom>
                            Qualidade de software
                        </Typography>
                        <Typography variant="h5" color="text.secondary" textAlign="center" mb={6}>
                            Explorando os pilares fundamentais para garantir excelência em software
                        </Typography>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        {qualityTopics.map((topic, index) => (
                            <QualityCard key={index} topic={topic} />
                        ))}
                    </Grid>

                        <Grid item xs={12}>
                            <Box 
                                textAlign="center" 
                                mb={6}
                                sx={{
                                    background: theme => theme.palette.background.default,
                                    p: 3,
                                    borderRadius: 2,
                                    boxShadow: 3,
                                    maxWidth: '800px',
                                    margin: '0 auto'
                                }}
                            >
                                <Typography 
                                    variant="h4" 
                                    color="primary.contrastText"
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: 2
                                    }}
                                >
                                    Vamos exercitar? 🎯
                                </Typography>
                                <Typography 
                                    variant="subtitle1" 
                                    color="text.secondary"
                                    sx={{ mt: 1 }}
                                >
                                    Teste suas habilidades de QA encontrando bugs em diferentes cenários
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <StyledPaper elevation={3}>
                                <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
                                    <Box display="flex" alignItems="center">
                                        <BugReportIcon className="sectionIcon" />
                                        <Typography variant="h6" color="primary.contrastText">
                                            Desafio QA #{currentChallenge + 1}
                                        </Typography>
                                    </Box>
                                    {currentChallenge > 0 && (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={goToPreviousChallenge}
                                            startIcon={<RefreshIcon />}
                                            sx={{ 
                                                minWidth: '200px',
                                                py: 1,
                                                borderRadius: 2,
                                                boxShadow: 2,
                                                '&:hover': {
                                                    backgroundColor: 'secondary.dark'
                                                }
                                            }}
                                        >
                                            Voltar ao desafio anterior
                                        </Button>
                                    )}
                                </Box>
                                <Box>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
                            <Typography variant="h6" color="primary.contrastText" gutterBottom>
                                                {challenges[currentChallenge].title}
                            </Typography>
                            <Typography color="text.secondary" paragraph>
                                                {challenges[currentChallenge].description}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {renderChallenge()}
                                        </Grid>
                                    </Grid>

                                    {bugFound ? (
                                        <Box mt={2}>
                                            <Box p={2} bgcolor="success.main" borderRadius={1}>
                                                <Typography color="white">
                                                    Parabéns! 🎉 Você encontrou o bug em {attempts} {attempts === 1 ? 'tentativa' : 'tentativas'}!
                                                </Typography>
                                            </Box>
                                            <Box mt={2} p={2} bgcolor={theme => theme.palette.background.paper} borderRadius={1}>
                                                <Typography variant="subtitle1" color="primary.contrastText" gutterBottom>
                                                    Explicação:
                                                </Typography>
                                                <Typography color="text.secondary">
                                                    {challenges[currentChallenge].explanation}
                                                </Typography>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={resetChallenge}
                                                    startIcon={<RefreshIcon />}
                                                    sx={{ mt: 2 }}
                                                >
                                                    Próximo Desafio
                                                </Button>
                                            </Box>
                                        </Box>
                                    ) : (
                                        <>
                                            <Typography color="text.secondary" sx={{ mt: 2, fontStyle: 'italic' }}>
                                                Dica: {challenges[currentChallenge].hint}
                            </Typography>
                                            {attempts >= 3 && (
                                                <Box>
                            <Typography 
                                                        color="warning.main" 
                                                        sx={{ 
                                                            mt: 2, 
                                                            mb: 1,
                                                            fontStyle: 'italic'
                                                        }}
                                                    >
                                                        Está com dificuldade? Que tal estudar um pouco mais sobre o tema? 
                                                        Fique à vontade para me contatar para discutirmos sobre! 😊
                                                    </Typography>
                                                    <Button
                                                        variant="contained"
                                                        color="warning"
                                                        onClick={resetChallenge}
                                                        startIcon={<RefreshIcon />}
                                sx={{ 
                                                            mt: 1,
                                                            bgcolor: 'warning.main',
                                                            color: 'warning.contrastText',
                                                            '&:hover': {
                                                                bgcolor: 'warning.dark'
                                                            }
                                                        }}
                                                    >
                                                        Tentar outro desafio
                                                    </Button>
                                                </Box>
                                            )}
                                        </>
                                    )}

                                    {error && (
                                        <Box 
                                            mt={2} 
                                            p={2} 
                                            bgcolor="error.main" 
                                            borderRadius={1}
                                            display="flex"
                                            alignItems="center"
                                            gap={1}
                                        >
                                            <ErrorIcon color="inherit" />
                                            <Typography color="white">
                                                {error}
                                            </Typography>
                                        </Box>
                                    )}

                                    <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                                        <Typography color="text.secondary">
                                            Tentativas: {attempts}
                            </Typography>
                                    </Box>
                                </Box>
                        </StyledPaper>
                    </Grid>
                </Grid>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <StyledPaper elevation={3}>
                            <Box textAlign="center" py={4}>
                                <motion.div
                                    animate={{ 
                                        rotate: [0, 10, -10, 10, 0],
                                        scale: [1, 1.1, 1]
                                    }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <CelebrationIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                                </motion.div>
                                
                                <Typography variant="h4" color="primary.contrastText" gutterBottom>
                                    Parabéns! 🎉 Você completou todos os desafios!
                                </Typography>

                                <Box my={4}>
                                    <EmojiEventsIcon sx={{ fontSize: 40, color: 'warning.main', mb: 1 }} />
                                    <Typography variant="h6" color="warning.main" gutterBottom>
                                        Suas Estatísticas
                                    </Typography>
                                    <Typography color="text.secondary">
                                        Média de tentativas por desafio: {calculateAverageAttempts()}
                                    </Typography>
                                </Box>

                                <Typography variant="body1" color="text.secondary" paragraph>
                                    "A qualidade não é um ato, é um hábito. Continue aprimorando suas habilidades e fazendo a diferença no mundo do desenvolvimento de software!"
                                </Typography>

                                <Typography variant="body1" color="text.secondary" paragraph>
                                    Que tal continuarmos essa jornada juntos? Estou sempre disponível para trocar experiências e conhecimentos sobre QA.
                                </Typography>

                                <Box mt={3} display="flex" justifyContent="center">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        href="https://www.linkedin.com/in/lucas-falc%C3%A3o/"
                                        target="_blank"
                                        startIcon={<LinkedInIcon />}
                                        sx={{ 
                                            minWidth: '250px',
                                            py: 1.5,
                                            fontSize: '1.1rem'
                                        }}
                                    >
                                        Conecte-se comigo
                                    </Button>
                                </Box>
                            </Box>
                        </StyledPaper>
                    </motion.div>
                )}
            </Container>
        </StyledSkills>
    );
};

export default Quality;
