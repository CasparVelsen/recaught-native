import { motion } from 'framer-motion';

export default function Loader() {
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
    backgroundColor: '#687a48',
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
  );
}
