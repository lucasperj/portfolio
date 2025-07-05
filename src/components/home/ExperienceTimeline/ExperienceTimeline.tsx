// ========================================
// Componente ExperienceTimeline
// Linha do tempo interativa para exibir experiências profissionais
// ========================================

import React from 'react';

// Importações da biblioteca react-vertical-timeline-component
// Esta biblioteca fornece componentes para criar linhas do tempo verticais
import { 
    VerticalTimeline,           // Container principal da linha do tempo
    VerticalTimelineElement     // Elemento individual da linha do tempo
} from 'react-vertical-timeline-component';

// Importação dos estilos CSS padrão da biblioteca
import 'react-vertical-timeline-component/style.min.css';

// Importações do Material-UI para componentes de interface
import { Box, Typography, Paper, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';

// Sistema de tradução para internacionalização
import { useTranslation } from '../../../i18n/useTranslation';

// Ícones do Material-UI
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';

// Importações dos logos das empresas
import AmigoTechLogo from "../../../assets/images/amigotech-logo.jpg";
import TeamSixLogo from "../../../assets/images/teamsix-logo.jpg";
import LiferayLogo from "../../../assets/images/liferay-logo.png";

// ========================================
// Estilos CSS customizados para a linha do tempo
// ========================================
// Estes estilos sobrescrevem os estilos padrão da biblioteca para melhor integração
const timelineStyles = `
    /* Estilização das datas na linha do tempo */
    .vertical-timeline-element-date {
        color: #fff !important;
        font-weight: bold !important;
        font-size: 1.1rem !important;
        text-shadow: none !important;
    }
    
    /* Estilização dos ícones da linha do tempo */
    .vertical-timeline-element-icon {
        box-shadow: 0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05) !important;
    }
    
    /* Estilização dos cards de conteúdo */
    .vertical-timeline-element-content {
        box-shadow: 0 4px 8px rgba(0,0,0,0.13) !important;
        border-radius: 12px !important;
        transition: all 0.3s ease !important;
        background: rgba(40,40,60,0.97) !important;
        color: #fff !important;
    }
    
    /* Efeito hover nos cards */
    .vertical-timeline-element-content:hover {
        transform: translateY(-2px) !important;
        box-shadow: 0 6px 12px rgba(0,0,0,0.18) !important;
    }
    
    /* Linha central da timeline com gradiente colorido */
    .vertical-timeline::before {
        background: linear-gradient(180deg, #2196F3 0%, #4CAF50 50%, #FF9800 100%) !important;
    }
    
    @media (max-width: 768px) {
        .vertical-timeline-element-date {
            font-size: 0.9rem !important;
        }
        .vertical-timeline-element-content {
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
    }
`;

// ========================================
// Componentes estilizados
// ========================================

// Container principal da linha do tempo
const TimelineContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(4, 0),                    // Padding vertical
    backgroundColor: theme.palette.background.paper, // Cor de fundo
    position: 'relative',                           // Posicionamento relativo
    '& .vertical-timeline': {
        '&::before': {
            background: theme.palette.primary.main,  // Cor da linha central
        }
    },
    '& .vertical-timeline-element-icon': {
        boxShadow: '0 0 0 4px #fff, inset 0 2px 0 rgba(0,0,0,.08), 0 3px 0 4px rgba(0,0,0,.05)',
    }
}));

// Estilização dos logos das empresas
const CompanyLogo = styled('img')({
    width: '50px',                                  // Largura fixa
    height: '50px',                                 // Altura fixa
    objectFit: 'contain',                          // Mantém proporção da imagem
    borderRadius: '50%',                           // Formato circular
    padding: '4px',                                // Padding interno
    backgroundColor: '#fff',                       // Fundo branco
    border: '2px solid rgba(0, 0, 0, 0.1)',       // Borda sutil
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'        // Sombra sutil
});

// Chips estilizados para exibir as tecnologias
const SkillChip = styled(Chip)(({ theme }) => ({
    margin: theme.spacing(0.5),                     // Margem entre chips
    backgroundColor: theme.palette.primary.light,   // Cor de fundo
    color: theme.palette.primary.contrastText,      // Cor do texto
    fontSize: '0.75rem',                           // Tamanho da fonte
    height: '24px'                                 // Altura fixa
}));

// ========================================
// Interface TypeScript para as experiências
// ========================================
interface Experience {
    company: string;        // Nome da empresa
    logo: string;          // URL do logo da empresa
    period: string;        // Período de trabalho
    role: string;          // Cargo/função
    description: string;   // Descrição da experiência
    highlights: string[];  // Lista de conquistas principais
    skills: string[];      // Lista de tecnologias utilizadas
    color: string;         // Cor temática da empresa
}

// ========================================
// Componente principal ExperienceTimeline
// ========================================
const ExperienceTimeline: React.FC = () => {
    // Hook para acessar as traduções do sistema i18n
    const { t } = useTranslation();

    // Array com todas as experiências profissionais
    // Cada experiência é traduzida dinamicamente baseada no idioma selecionado
    const experiences: Experience[] = [
        {
            // Experiência na AmigoTech
            company: t('about.experiences.amigotech.company'),
            logo: AmigoTechLogo,
            period: t('about.experiences.amigotech.period'),
            role: t('about.experiences.amigotech.role'),
            description: t('about.experiences.amigotech.description'),
            highlights: [
                t('about.experiences.amigotech.highlights.0'),
                t('about.experiences.amigotech.highlights.1'),
                t('about.experiences.amigotech.highlights.2'),
                t('about.experiences.amigotech.highlights.3'),
            ],
            skills: ['Selenium', 'Playwright', 'JavaScript', 'Git', 'Jenkins'],
            color: '#2196F3'  // Azul para AmigoTech
        },
        {
            // Experiência na TeamSix
            company: t('about.experiences.teamsix.company'),
            logo: TeamSixLogo,
            period: t('about.experiences.teamsix.period'),
            role: t('about.experiences.teamsix.role'),
            description: t('about.experiences.teamsix.description'),
            highlights: [
                t('about.experiences.teamsix.highlights.0'),
                t('about.experiences.teamsix.highlights.1'),
                t('about.experiences.teamsix.highlights.2'),
                t('about.experiences.teamsix.highlights.3'),
            ],
            skills: ['Appium', 'JUnit', 'TestNG', 'Postman', 'Docker'],
            color: '#4CAF50'  // Verde para TeamSix
        },
        {
            // Experiência na Liferay
            company: t('about.experiences.liferay.company'),
            logo: LiferayLogo,
            period: t('about.experiences.liferay.period'),
            role: t('about.experiences.liferay.role'),
            description: t('about.experiences.liferay.description'),
            highlights: [
                t('about.experiences.liferay.highlights.0'),
                t('about.experiences.liferay.highlights.1'),
                t('about.experiences.liferay.highlights.2'),
                t('about.experiences.liferay.highlights.3'),
            ],
            skills: ['Liferay', 'SQL', 'Accessibility', 'SEO', 'Manual Testing'],
            color: '#FF9800'  // Laranja para Liferay
        }
    ];

    return (
        <>
            {/* Injeção dos estilos CSS customizados */}
            <style>{timelineStyles}</style>
            
            {/* Container principal da linha do tempo */}
            <TimelineContainer data-test-id="experience-timeline">
                {/* Cabeçalho da seção */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Typography variant="h3" color="#fff" gutterBottom>
                        {t('about.experience.title')}
                    </Typography>
                    <Typography variant="h6" color="#fff">
                        Minha jornada profissional em QA
                    </Typography>
                </Box>

                {/* Linha do tempo vertical */}
                <VerticalTimeline>
                    {/* Mapeamento das experiências para elementos da linha do tempo */}
                    {experiences.map((experience, index) => (
                        <VerticalTimelineElement
                            key={index}
                            className="vertical-timeline-element--work"
                            contentStyle={{ 
                                background: 'rgba(40,40,60,0.97)',
                                color: '#fff',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.13)',
                                borderRadius: '12px'
                            }}
                            contentArrowStyle={{ 
                                borderRight: `7px solid ${experience.color}` 
                            }}
                            date={experience.period}
                            dateClassName="timeline-date"
                            iconStyle={{ 
                                background: experience.color,
                                color: '#fff',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            icon={<BusinessIcon />}
                            data-test-id={`experience-timeline-item-${index}`}
                        >
                            {/* Conteúdo do card de experiência */}
                            <Paper elevation={0} sx={{ p: 0, backgroundColor: 'transparent', boxShadow: 'none' }}>
                                {/* Cabeçalho com logo e informações da empresa */}
                                <Box display="flex" alignItems="center" mb={2}>
                                    <CompanyLogo src={experience.logo} alt={`${experience.company} logo`} />
                                    <Box ml={2}>
                                        <Typography variant="h5" fontWeight="bold" sx={{ color: '#8B5CF6' }}>
                                            {experience.company}
                                        </Typography>
                                        <Typography variant="subtitle1" sx={{ color: '#fff', fontWeight: 600 }}>
                                            {experience.role}
                                        </Typography>
                                    </Box>
                                </Box>

                                {/* Descrição da experiência */}
                                <Typography variant="body1" sx={{ color: '#fff', mb: 2 }}>
                                    {experience.description}
                                </Typography>

                                {/* Seção de conquistas principais */}
                                <Box mb={2}>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }} gutterBottom>
                                        Principais Conquistas:
                                    </Typography>
                                    <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                        {experience.highlights.map((highlight, idx) => (
                                            <Typography 
                                                key={idx} 
                                                component="li" 
                                                sx={{ color: '#fff', mb: 1, fontSize: '0.9rem' }}
                                            >
                                                {highlight}
                                            </Typography>
                                        ))}
                                    </Box>
                                </Box>

                                {/* Seção de tecnologias utilizadas */}
                                <Box>
                                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700 }} gutterBottom>
                                        Tecnologias:
                                    </Typography>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        {experience.skills.map((skill, idx) => (
                                            <SkillChip 
                                                key={idx} 
                                                label={skill} 
                                                size="small"
                                                variant="filled"
                                            />
                                        ))}
                                    </Box>
                                </Box>
                            </Paper>
                        </VerticalTimelineElement>
                    ))}
                </VerticalTimeline>
            </TimelineContainer>
        </>
    );
};

export default ExperienceTimeline; 