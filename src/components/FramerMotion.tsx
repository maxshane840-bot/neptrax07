import { 
  motion, 
  useScroll, 
  useTransform, 
  useInView, 
  useAnimation,
  AnimatePresence,
  MotionConfig,
  MotionValue,
  SpringOptions,
  Transition,
  Variants 
} from 'framer-motion';
import { ReactNode, RefObject } from 'react';

// Re-export all Framer Motion components
export {
  motion,
  useScroll,
  useTransform,
  useInView,
  useAnimation,
  AnimatePresence,
  MotionConfig
};

// Export types for better TypeScript support
export type {
  MotionValue,
  SpringOptions,
  Transition,
  Variants
};

// Custom ScrollReveal component with better performance
interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

export const ScrollReveal = ({ 
  children, 
  direction = 'up', 
  delay = 0, 
  duration = 0.6, 
  distance = 50,
  threshold = 0.1,
  className = "" 
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold, once: true });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);

  const getInitialState = () => {
    switch (direction) {
      case 'up':
        return { y: distance, opacity: 0 };
      case 'down':
        return { y: -distance, opacity: 0 };
      case 'left':
        return { x: distance, opacity: 0 };
      case 'right':
        return { x: -distance, opacity: 0 };
      case 'fade':
        return { opacity: 0 };
      default:
        return { y: distance, opacity: 0 };
    }
  };

  const variants = {
    hidden: getInitialState(),
    visible: {
      y: 0,
      x: 0,
      opacity: 1,
      transition: {
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for lists
interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const StaggerContainer = ({ 
  children, 
  delay = 0.2, 
  className = "" 
}: StaggerContainerProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger item for use with StaggerContainer
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export const StaggerItem = ({ children, className = "" }: StaggerItemProps) => {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};

// Parallax component for scroll-based movement
interface ParallaxProps {
  children: ReactNode;
  yOffset?: number;
  className?: string;
  triggerRef?: RefObject<HTMLElement>;
}

export const Parallax = ({ 
  children, 
  yOffset = 50, 
  className = "",
  triggerRef 
}: ParallaxProps) => {
  const { scrollYProgress } = useScroll({
    target: triggerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-yOffset, yOffset]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};

// Fade in component with intersection observer
interface FadeInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  direction?: 'none' | 'up' | 'down' | 'left' | 'right';
  distance?: number;
}

export const FadeIn = ({ 
  children, 
  duration = 0.6, 
  delay = 0,
  className = "",
  direction = 'none',
  distance = 30
}: FadeInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: true,
    margin: "-50px"
  });

  const getInitialState = () => {
    if (direction === 'none') return { opacity: 0 };
    
    const directions = {
      up: { y: distance, opacity: 0 },
      down: { y: -distance, opacity: 0 },
      left: { x: distance, opacity: 0 },
      right: { x: -distance, opacity: 0 },
    };
    
    return directions[direction];
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitialState()}
      animate={isInView ? { 
        y: 0, 
        x: 0, 
        opacity: 1 
      } : getInitialState()}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale in component
interface ScaleInProps {
  children: ReactNode;
  duration?: number;
  delay?: number;
  className?: string;
  scale?: number;
}

export const ScaleIn = ({ 
  children, 
  duration = 0.6, 
  delay = 0,
  className = "",
  scale = 0.8
}: ScaleInProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ scale, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale, opacity: 0 }}
      transition={{
        duration,
        delay: delay / 1000,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Custom hook for scroll progress
export const useScrollProgress = (targetRef: RefObject<HTMLElement>) => {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  return scrollYProgress;
};

// Custom hook for element visibility
export const useElementVisibility = (ref: RefObject<HTMLElement>, threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const isInView = useInView(ref, { threshold });

  useEffect(() => {
    if (isInView && !isVisible) {
      setIsVisible(true);
    }
  }, [isInView, isVisible]);

  return isVisible;
};