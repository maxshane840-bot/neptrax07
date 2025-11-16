import {
  Sparkles,
  Rocket,
  ShoppingCart,
  Briefcase,
  Users,
  Code,
  Palette,
  Search,
  Target,
  Layers,
  Wrench,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import Silk from '../components/Silk';
import MissionSection from '../components/MissionSection';

interface HomeProps {
  onNavigate: (section: string) => void;
}

// Mobile detection hook
const useMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);
    
    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  return isMobile;
};

// Custom hook for scroll animations
const useScrollAnimation = (ref: React.RefObject<Element>, threshold = 0.1) => {
  const controls = useAnimation();
  const isInView = useInView(ref, { threshold });

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  return controls;
};

export default function Home({ onNavigate }: HomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const isMobile = useMobile();
  
  // Refs for scroll animations
  const heroRef = useRef(null);
  const clientsRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Animation controls
  const heroControls = useScrollAnimation(heroRef);
  const clientsControls = useScrollAnimation(clientsRef);
  const statsControls = useScrollAnimation(statsRef);
  const ctaControls = useScrollAnimation(ctaRef);

  // Parallax effects (from your list)
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  
  // Scroll-based opacity (from your list)
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Animation variants (using effects from your list)
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeLeftVariants = {
    hidden: { opacity: 0, x: 60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const fadeRightVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const zoomInVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const rotateInVariants = {
    hidden: { opacity: 0, rotate: -10 },
    visible: { 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  // Staggered animation for lists (from your list)
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const clients = [
    { icon: Briefcase, title: 'Local Service Businesses', description: 'Plumbers, electricians, consultants' },
    { icon: Rocket, title: 'SaaS Startups', description: 'Cloud-based software companies' },
    { icon: Sparkles, title: 'AI Startups', description: 'Machine learning innovations' },
    { icon: ShoppingCart, title: 'E-Commerce Brands', description: 'Online retail businesses' },
    { icon: Users, title: 'Agencies & Freelancers', description: 'Creative professionals' },
  ];

  const services = [
    { icon: Palette, title: 'Web Design', description: 'Beautiful, modern interfaces' },
    { icon: Code, title: 'Web Development', description: 'Fast, responsive websites' },
    { icon: Search, title: 'SEO Optimization', description: 'Higher search rankings' },
    { icon: Target, title: 'GEO Targeting', description: 'Local market reach' },
    { icon: Layers, title: 'UI/UX Design', description: 'User-centered experiences' },
    { icon: Wrench, title: 'Website Maintenance', description: 'Ongoing support & updates' },
  ];

  const stats = [
    { number: '100+', label: 'Sites Built' },
    { number: '50+', label: 'Verified Reviews' },
    { number: '5+', label: 'Years Experience' },
    { number: '100%', label: 'Client Satisfaction Rate' },
  ];

  return (
    <div className="min-h-screen overflow-hidden" ref={containerRef}>
      {/* Enhanced Hero Section with Fade Up & Parallax */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
        initial="hidden"
        animate={heroControls}
        variants={staggerContainer}
      >
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 opacity-100"
          style={{ y: backgroundY }}
        >
          <Silk
            speed={isMobile ? 4 : 8}
            scale={isMobile ? 0.8 : 1}
            color="#13717d"
            noiseIntensity={0.5}
            rotation={0}
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0d1117] to-[#1e3a8a] opacity-70"></div>
        
        {/* Parallax Blobs */}
        <motion.div 
          className="absolute top-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-[#2563eb] rounded-full blur-[120px] opacity-20 animate-pulseSlow"
          style={{ y: blob1Y }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-20 left-20 w-64 h-64 md:w-96 md:h-96 bg-[#1e3a8a] rounded-full blur-[120px] opacity-20 animate-pulseSlow2"
          style={{ y: blob2Y }}
        ></motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16 lg:pt-32">
          <div className="max-w-3xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Fade Up Main Heading */}
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font text-[#f1f5f9] mb-4 sm:mb-6 leading-tight"
              variants={fadeUpVariants}
              style={{ opacity: headingOpacity }}
            >
              Launch your brand online <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#2e4fdc] to-[#4da6ff] bg-clip-text text-transparent">
                with a website built to
              </span>
              <br className="hidden sm:block" />
              convert & scale.
            </motion.h1>

            {/* Slide Up Description */}
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-[#abbcd4] mb-6 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed px-4 sm:px-0"
              variants={slideUpVariants}
            >
              Guiding startups and small businesses from idea to digital success with websites built for performance and growth.
            </motion.p>

            {/* Fade Up Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-12 sm:mb-16 justify-center lg:justify-start px-4 sm:px-0"
              variants={fadeUpVariants}
            >
              <motion.button
                onClick={() => onNavigate('contact')}
                className="px-8 sm:px-12 md:px-16 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Call
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('portfolio')}
                className="group relative px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full bg-transparent border-2 border-purple-400/50 text-[#f1f5f9] font-medium overflow-hidden transition-all duration-500 hover:scale-105 hover:border-purple-400 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-sm flex items-center justify-center gap-2 text-sm sm:text-base"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>View Our Work</span>
                  <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
              </motion.button>
            </motion.div>

            {/* Fade In Trusted Brands */}
            <motion.div 
              className="px-4 sm:px-0"
              variants={fadeUpVariants}
            >
              <motion.h3 
                className="text-xs sm:text-sm text-[#abbcd4] font-bold mb-3 sm:mb-3 text-center lg:text-left"
                variants={rotateInVariants}
              >
                Trusted by Industry Leaders
              </motion.h3>
              <div className="flex items-center justify-center lg:justify-start gap-6 sm:gap-8 md:gap-12 flex-wrap">
                {['/brand logo/google.png', '/brand logo/stripe.png', '/brand logo/vercel.png'].map((src, index) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt={src.split('/').pop()?.split('.')[0]}
                    className="h-6 sm:h-8 filter brightness-0 saturate-0 hover:scale-110 transition-transform duration-300"
                    style={{ 
                      filter: 'brightness(0) saturate(100%) invert(1) sepia(1) saturate(0.5) hue-rotate(200deg) brightness(0.9)',
                      height: src.includes('stripe') || src.includes('vercel') ? '2rem' : '1.5rem'
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <MissionSection />

      {/* Clients Section with Staggered Reveal */}
      <motion.section 
        ref={clientsRef}
        className="py-16 sm:py-20 bg-[#111827]"
        initial="hidden"
        animate={clientsControls}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] text-center mb-4"
            variants={fadeUpVariants}
          >
            Who We Work With
          </motion.h2>

          <motion.p 
            className="text-[#94a3b8] text-center mb-8 sm:mb-12 text-sm sm:text-base px-4"
            variants={fadeUpVariants}
          >
            We partner with businesses of all sizes across industries
          </motion.p>

          {/* First Row - 3 Cards with Stagger */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 w-full max-w-5xl"
              variants={staggerContainer}
            >
              {clients.slice(0, 3).map((client, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] h-full border border-[#334155] hover:border-[#2563eb]"
                  whileHover={{
                    scale: 1.03,
                    y: -5
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <client.icon className="text-[#2563eb] mb-3 sm:mb-4" size={isMobile ? 24 : 32} />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f1f5f9] mb-2">{client.title}</h3>
                  <p className="text-[#94a3b8] text-xs sm:text-sm">{client.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Second Row - 2 Cards with Stagger */}
          <div className="flex justify-center">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-3xl"
              variants={staggerContainer}
            >
              {clients.slice(3).map((client, index) => (
                <motion.div
                  key={index + 3}
                  variants={staggerItem}
                  className="rounded-2xl p-4 sm:p-6 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:shadow-[0_0_30px_rgba(37,99,235,0.3)] h-full border border-[#334155] hover:border-[#2563eb]"
                  whileHover={{
                    scale: 1.03,
                    y: -5
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <client.icon className="text-[#2563eb] mb-3 sm:mb-4" size={isMobile ? 24 : 32} />
                  </motion.div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#f1f5f9] mb-2">{client.title}</h3>
                  <p className="text-[#94a3b8] text-xs sm:text-sm">{client.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Section with Zoom-in Effect */}
      <motion.section 
        ref={statsRef}
        className="py-16 sm:py-20 bg-[#0d1117]"
        initial="hidden"
        animate={statsControls}
        variants={staggerContainer}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] text-center mb-8 sm:mb-12"
            variants={zoomInVariants}
          >
            Our Credentials
          </motion.h2>

          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
            variants={staggerContainer}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={zoomInVariants}
                className="text-center p-4 sm:p-6 rounded-2xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  y: -5
                }}
              >
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-[#2563eb] to-[#3b82f6] bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-[#94a3b8] text-sm sm:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section with Fade Effects */}
      <motion.section 
        ref={ctaRef}
        className="py-16 sm:py-20 bg-gradient-to-br from-[#0f172a] to-[#1e3a8a]"
        initial="hidden"
        animate={ctaControls}
        variants={staggerContainer}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold text-[#f1f5f9] mb-4 sm:mb-6"
            variants={fadeUpVariants}
          >
            Ready to Start Your Project?
          </motion.h2>

          <motion.p 
            className="text-[#94a3b8] text-base sm:text-lg mb-6 sm:mb-8 px-4"
            variants={fadeUpVariants}
          >
            Let's discuss how we can help your business grow online
          </motion.p>

          <motion.button
            onClick={() => onNavigate('contact')}
            className="px-8 sm:px-10 py-3 sm:py-4 rounded-full bg-gradient-to-r from-[#2563eb] to-[#1e3a8a] text-[#f1f5f9] font-medium text-base sm:text-lg hover:shadow-[0_0_40px_rgba(37,99,235,0.7)] transition-all duration-300 border border-[#3b82f6] hover:border-[#60a5fa]"
            variants={fadeUpVariants}
            whileHover={{ 
              scale: 1.05,
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            Book a Call
          </motion.button>
        </div>
      </motion.section>

      {/* Add custom animations to global CSS */}
      <style>{`
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.1); }
        }
        @keyframes pulseSlow2 {
          0%, 100% { opacity: 0.3; transform: scale(1.1); }
          50% { opacity: 0.2; transform: scale(1); }
        }
        .animate-pulseSlow {
          animation: pulseSlow 8s ease-in-out infinite;
        }
        .animate-pulseSlow2 {
          animation: pulseSlow2 10s ease-in-out infinite;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}