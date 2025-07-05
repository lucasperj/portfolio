// Componente de carrossel de recomendações do LinkedIn, com maximização de imagem ao clicar
import React, { useEffect, useState } from 'react';
import { Box, IconButton, Modal } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';

// Importação dos prints das recomendações
import rec1 from '../../../assets/images/rec1.png';
import rec2 from '../../../assets/images/rec2.png';
import rec3 from '../../../assets/images/rec3.png';

// Array com as imagens das recomendações
const recommendations = [
  rec1,
  rec2,
  rec3,
  // Adicione mais conforme necessário
];

const RecommendationsCarousel: React.FC = () => {
  // Índice da recomendação atualmente exibida
  const [index, setIndex] = useState(0);
  // Controle do modal de maximização
  const [openModal, setOpenModal] = useState(false);
  // Caminho da imagem maximizada
  const [modalImg, setModalImg] = useState<string | null>(null);

  // Efeito para trocar automaticamente a recomendação a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % recommendations.length);
    }, 10000); // 10 segundos
    return () => clearInterval(interval);
  }, []);

  // Troca manual ao clicar nas bolinhas
  const handleDotClick = (newIndex: number) => {
    setIndex(newIndex);
  };

  // Ao clicar na imagem, abre o modal
  const handleImageClick = (img: string) => {
    setModalImg(img);
    setOpenModal(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setModalImg(null);
  };

  return (
    // Container principal do carrossel
    <Box display="flex" flexDirection="column" alignItems="center" mt={0} mb={2} sx={{ zIndex: 0 }}>
      {/* Carrossel de imagens */}
      <Box position="relative" display="flex" justifyContent="center" alignItems="center" minHeight={{ xs: 250, md: 300 }}>
        {recommendations.map((img, i) => (
          <Box
            key={i}
            sx={{
              opacity: i === index ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              display: i === index ? 'block' : 'none',
              width: '100%',
              height: '100%'
            }}
          >
            {/* Wrapper para overlay e clique */}
            <Box position="relative">
              {/* Imagem da recomendação */}
              <Box
                component="img"
                src={img}
                alt={`Recomendação ${i + 1}`}
                sx={{
                  maxWidth: { xs: '95vw', md: 600 }, // Imagens maiores
                  maxHeight: { xs: 250, md: 300 }, // Altura maior
                  borderRadius: 3,
                  boxShadow: 3,
                  objectFit: 'contain',
                  width: '100%',
                  height: '100%',
                  display: 'block',
                  cursor: 'zoom-in', // Indica que pode maximizar
                }}
                onClick={() => handleImageClick(img)}
              />
              {/* Overlay translúcido para efeito de opacidade */}
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  bgcolor: 'rgba(0,0,0,0.28)', // ajuste a opacidade aqui
                  borderRadius: 3,
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
      
      {/* Indicadores (bolinhas) de navegação do carrossel */}
      <Box display="flex" justifyContent="center" mt={2} gap={1}>
        {recommendations.map((_, i) => (
          <IconButton
            key={i}
            onClick={() => handleDotClick(i)}
            size="small"
            sx={{
              color: i === index ? 'primary.main' : 'grey.400',
              opacity: i === index ? 1 : 0.5, // Bolinha ativa bem visível
              p: 0.5,
              transition: 'color 0.2s, opacity 0.2s',
              '&:hover': {
                color: 'primary.main',
                opacity: 0.8,
              },
            }}
          >
            <FiberManualRecordIcon fontSize="small" />
          </IconButton>
        ))}
      </Box>
      {/* Modal de imagem maximizada */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="fixed"
          top={0}
          left={0}
          width="100vw"
          height="100vh"
          bgcolor="rgba(0,0,0,0.85)"
          zIndex={2000}
        >
          {/* Botão de fechar o modal */}
          <IconButton
            onClick={handleCloseModal}
            sx={{
              position: 'absolute',
              top: 32,
              right: 32,
              color: '#fff',
              zIndex: 2100,
              background: 'rgba(0,0,0,0.3)',
              '&:hover': { background: 'rgba(0,0,0,0.5)' },
            }}
            aria-label="Fechar"
          >
            <CloseIcon fontSize="large" />
          </IconButton>
          {/* Imagem ampliada no modal */}
          {modalImg && (
            <Box
              component="img"
              src={modalImg}
              alt="Recomendação ampliada"
              sx={{
                maxWidth: { xs: '98vw', md: 900 },
                maxHeight: { xs: '80vh', md: '90vh' },
                borderRadius: 3,
                boxShadow: 6,
                objectFit: 'contain',
                width: 'auto',
                height: 'auto',
                background: '#222',
                p: 2,
              }}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default RecommendationsCarousel; 