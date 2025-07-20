import styled from 'styled-components';
import { motion } from 'framer-motion';

export default function LocationLoader() {
  const LoadingContainer = {
    height: '2rem',
    width: '2rem',
    display: 'flex',
    justifyContent: 'space-around',
  };

  const LoadingCircle = {
    display: 'block',
    width: '0.5rem',
    height: '0.5rem',
    backgroundColor: 'white',
    borderRadius: '0.25rem',
  };

  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.1,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      y: '0%',
    },
    end: {
      y: '100%',
    },
  };

  const loadingCircleTransition = {
    duration: 0.4,
    yoyo: Infinity,
    ease: 'easeInOut',
  };

  return (
    <Overlay>
      <Container>
        <Description>load weather data for current location</Description>
        <motion.div
          style={LoadingContainer}
          variants={loadingContainerVariants}
          initial="start"
          animate="end"
        >
          <motion.span
            style={LoadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={LoadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
          <motion.span
            style={LoadingCircle}
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          ></motion.span>
        </motion.div>
      </Container>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); /* Halbtransparenter Hintergrund */
  z-index: 999; /* Overlay muss hinter dem Popup liegen */
`;

const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Zentriert den Container */
  max-width: 600px; /* Optional: Maximale Breite für größere Bildschirme */
  z-index: 1000; /* Damit der Container vor allem anderen liegt */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const Description = styled.p`
  color: white;
  text-align: center;
  font-weight: bold;
`;
