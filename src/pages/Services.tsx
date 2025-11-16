import { useState, useEffect, useRef } from 'react';
import {
  Palette,
  Code,
  Search,
  Layers,
  Bot,
  Share2,
  TrendingUp,
  Zap,
  Smartphone,
  BarChart3,
  ShoppingCart,
  PenTool
} from 'lucide-react';
import WebGLParticles from './WebGLParticles';

interface ServicesProps {
  onNavigate: (section: string) => void;
}

export default function Services({ onNavigate }: ServicesProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stickyHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
    
    // Scroll listener for sticky heading effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 100);
      
      // Sticky heading condense effect
      if (stickyHeadingRef.current) {
        const progress = Math.min(scrollY / 200, 1);
        stickyHeadingRef.current.style.transform = `scale(${1 - progress * 0.1})`;
        stickyHeadingRef.current.style.opacity = `${1 - progress * 0.3}`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for card animations with staggered delays
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('card-visible');
            }, index * 100);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  // Advanced scroll reveal for sections
  useEffect(() => {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            const delay = element.dataset.delay || '0';
            setTimeout(() => {
              element.classList.add('section-visible');
            }, parseInt(delay));
          }
        });
      },
      { threshold: 0.15, rootMargin: '-50px' }
    );

    sectionRefs.current.forEach((section) => {
      if (section) revealObserver.observe(section);
    });

    return () => revealObserver.disconnect();
  }, []);

  // Parallax scroll effect for background elements
  useEffect(() => {
    const handleParallax = () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.parallax-element');
      
      parallaxElements.forEach((element) => {
        const speed = parseFloat(element.getAttribute('data-speed') || '0.5');
        const yPos = -(scrolled * speed);
        (element as HTMLElement).style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  // Advanced image tilt with gyroscope effect
  useEffect(() => {
    const images = document.querySelectorAll('.tilt-element');

    images.forEach((img) => {
      const handleMouseMove = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        const r = target.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        
        target.style.transform = `
          perspective(1200px) 
          rotateX(${y * 8}deg) 
          rotateY(${x * -8}deg) 
          scale3d(1.02, 1.02, 1.02)
          translateZ(20px)
        `;
        target.style.filter = `brightness(${1.05 + Math.abs(x + y) * 0.1})`;
      };

      const handleMouseLeave = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        target.style.transform = '';
        target.style.filter = '';
      };

      img.addEventListener('mousemove', handleMouseMove as EventListener);
      img.addEventListener('mouseleave', handleMouseLeave as EventListener);

      return () => {
        img.removeEventListener('mousemove', handleMouseMove as EventListener);
        img.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      };
    });
  }, []);

  // Gradient text scroll animation
  useEffect(() => {
    const gradientTexts = document.querySelectorAll('.gradient-scroll');
    
    const updateGradients = () => {
      const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      
      gradientTexts.forEach((text) => {
        const hue = (scrollPercent * 360 + 180) % 360;
        (text as HTMLElement).style.backgroundImage = 
          `linear-gradient(45deg, hsl(${hue}, 100%, 65%), hsl(${(hue + 60) % 360}, 100%, 65%))`;
      });
    };

    window.addEventListener('scroll', updateGradients);
    return () => window.removeEventListener('scroll', updateGradients);
  }, []);

  const servicesList = [
    {
      title: 'Custom Website Design',
      description: 'Crafted pixel-perfect designs that reflect your brand identity. We create stunning, user-friendly websites that captivate visitors and convert them into loyal customers through strategic visual storytelling.',
      icon: Palette,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Building robust, scalable web applications with cutting-edge technologies. From front-end interfaces to back-end architecture, we deliver high-performance solutions that grow with your business needs.',
      icon: Code,
      gradient: 'from-cyan-500 via-blue-500 to-blue-600'
    },
    {
      title: 'AI-Powered Chatbots',
      description: 'Intelligent conversational AI that engages customers 24/7. Our chatbots provide instant support, answer queries, and guide users through seamless experiences while learning from every interaction.',
      icon: Bot,
      gradient: 'from-green-500 via-emerald-500 to-teal-500'
    },
    {
      title: 'Social Media Management & Growth',
      description: 'Strategic social media campaigns that build communities and drive engagement. We manage your presence across platforms, create compelling content, and grow your audience organically with data-driven strategies.',
      icon: Share2,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    },
    {
      title: 'Brand Identity & Visual Design',
      description: 'Comprehensive brand development from concept to execution. We craft memorable logos, color palettes, and visual systems that establish strong brand recognition and communicate your unique value proposition.',
      icon: Layers,
      gradient: 'from-blue-600 via-blue-500 to-cyan-500'
    },
    {
      title: 'Social Media & Digital Advertising',
      description: 'High-converting ad campaigns across Facebook, Instagram, LinkedIn, and Google. We optimize targeting, creative, and messaging to maximize ROI and deliver measurable results for your marketing investment.',
      icon: TrendingUp,
      gradient: 'from-cyan-500 via-teal-500 to-green-500'
    },
    {
      title: 'SEO Optimization & Growth Strategy',
      description: 'Comprehensive SEO solutions that boost your search rankings and organic traffic. We implement technical optimizations, content strategies, and link-building campaigns that deliver sustainable growth and visibility.',
      icon: Search,
      gradient: 'from-teal-500 via-cyan-500 to-blue-500'
    },
    {
      title: 'AI Automation Agents',
      description: 'Custom AI-powered automation that streamlines workflows and increases efficiency. From data processing to customer service, we build intelligent agents that handle repetitive tasks and free up your team.',
      icon: Zap,
      gradient: 'from-blue-500 via-blue-600 to-blue-700'
    },
    {
      title: 'Mobile App Design & Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We design and develop iOS and Android apps that are intuitive, fast, and aligned with your business objectives.',
      icon: Smartphone,
      gradient: 'from-cyan-500 via-blue-500 to-blue-600'
    },
    {
      title: 'Marketing Audit & Strategic Planning',
      description: 'In-depth analysis of your marketing performance with actionable recommendations. We identify opportunities, optimize spending, and create comprehensive strategies that align with your business goals and budget.',
      icon: BarChart3,
      gradient: 'from-green-500 via-teal-500 to-cyan-500'
    },
    {
      title: 'E-Commerce Store Development',
      description: 'Complete e-commerce solutions built for conversions and scalability. From product catalogs to secure checkout systems, we create online stores that provide seamless shopping experiences and drive revenue.',
      icon: ShoppingCart,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500'
    },
    {
      title: 'Content Creation & Copywriting',
      description: 'Compelling content that resonates with your audience and drives action. Our expert writers craft SEO-optimized blog posts, website copy, and marketing materials that establish authority and generate leads.',
      icon: PenTool,
      gradient: 'from-orange-500 via-red-500 to-pink-500'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section - Preserved as requested */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        <div className="absolute inset-0">
          <WebGLParticles />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className={`relative z-10 max-w-6xl mx-auto px-6 text-center transition-all duration-1000 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-black mb-6">
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent animate-glow-text">
                OUR SERVICES
              </span>
            </h1>
          </div>

          <div className="mb-12">
            <p className="text-xl md:text-2xl text-gray-300 font-light max-w-3xl mx-auto leading-relaxed">
              Crafting digital excellence through innovative solutions that transform your vision into reality
            </p>
          </div>

          <div className="flex gap-6 justify-center flex-wrap">
            <button
              onClick={() => onNavigate('contact')}
              className="group relative px-12 py-4 rounded-full bg-transparent border-2 border-cyan-400/50 text-white font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/25 backdrop-blur-sm"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Start Your Project</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-600/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </button>
          </div>
        </div>

        {/* Animated scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400/70 rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Animated Shape Divider */}
      <div className="relative h-24 -mt-24 overflow-hidden">
        <svg 
          className="absolute bottom-0 w-full h-24" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            className="fill-[#0f172a] animate-wave"
          ></path>
        </svg>
      </div>

      {/* Sticky Heading Section */}
      <section className="sticky top-0 z-40 bg-[#0f172a] py-4 shadow-2xl shadow-black/50 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 
            ref={stickyHeadingRef}
            className="text-2xl md:text-4xl font-black gradient-scroll bg-clip-text text-transparent transition-all duration-300"
          >
            Comprehensive Digital Solutions
          </h2>
        </div>
      </section>

      {/* Services Grid Section with Enhanced Animations */}
      <section 
        ref={el => sectionRefs.current[0] = el}
        data-delay="200"
        className="relative py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] section-hidden parallax-section"
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-10 parallax-element"
          data-speed="0.3"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 animate-pulse"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16 reveal-up">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                Our Expertise
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                What We Offer
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
              Comprehensive digital solutions tailored to elevate your brand and drive measurable results
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="service-card group relative bg-gradient-to-br from-gray-900/80 to-gray-800/40 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 hover:border-cyan-400/30 transition-all duration-700 overflow-hidden transform-gpu"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-all duration-700 transform-gpu`}></div>

                  {/* Floating Particles Background */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
                    <div className="absolute top-4 left-4 w-2 h-2 bg-white rounded-full animate-float"></div>
                    <div className="absolute top-12 right-6 w-1 h-1 bg-cyan-400 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
                    <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
                  </div>

                  {/* Card Corner Accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-700 transform-gpu"></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${service.gradient} p-[2px]`}>
                      <div className="w-full h-full bg-gray-900/95 rounded-3xl backdrop-blur-sm"></div>
                    </div>
                  </div>

                  {/* Icon with Enhanced Animation */}
                  <div className="relative mb-8">
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-2xl relative overflow-hidden`}>
                      <Icon className="text-white z-10 relative" size={32} />
                      <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-300"></div>
                    </div>
                  </div>

                  {/* Content with Staggered Animations */}
                  <div className="relative z-10 space-y-4">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-all duration-500 transform group-hover:translate-x-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-all duration-500 transform group-hover:translate-x-1">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-700 transform-gpu scale-95 group-hover:scale-100`}></div>

                  {/* Animated Underline */}
                  <div className="absolute bottom-6 left-8 right-8 h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent group-hover:via-cyan-400 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Services Showcase Section */}
      <section 
        ref={el => sectionRefs.current[1] = el}
        data-delay="400"
        className="relative bg-[#0b0b0b] py-32 overflow-hidden section-hidden"
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 relative z-10">
          {/* First Row - Featured Service with Slide-in Animation */}
          <div 
            ref={el => sectionRefs.current[2] = el}
            data-delay="600"
            className="reveal-slide-left mb-32 section-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span className="text-cyan-300 font-semibold text-sm uppercase tracking-wider">
                    Featured Service
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x">
                    Website Development
                  </span>
                </h2>
                
                <p className="text-xl text-gray-400 leading-relaxed">
                  Developing digital experiences that are as beautiful as they are functional.
                </p>
                
                <button
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Explore Projects</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>

              {/* Right Column - Visual with Enhanced Tilt */}
              <div className="relative">
                <div className="relative tilt-element transform-gpu">
                  <img
                    src="/demo.png"
                    alt="Website development demo"
                    className="w-full h-[600px] rounded-3xl border-2 border-gray-800/50 shadow-2xl object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-3xl mix-blend-overlay"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 animate-float">
                    <Code className="text-white" size={32} />
                  </div>
                  <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 animate-float" style={{animationDelay: '1.5s'}}>
                    <Palette className="text-white" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Large Typographic Hero with Scale Animation */}
          <div 
            ref={el => sectionRefs.current[3] = el}
            data-delay="800"
            className="reveal-scale mb-32 section-hidden"
          >
            <div className="relative max-w-6xl mx-auto text-center">
              {/* Background Glow */}
              <div className="absolute -inset-8 bg-gradient-radial from-cyan-500/10 via-transparent to-transparent rounded-full blur-3xl opacity-60 mix-blend-screen"></div>

              <h2 className="text-6xl md:text-7xl lg:text-8xl xl:text-8xl font-black text-white leading-[0.95] tracking-tight transform-gpu">
                <span className="bg-gradient-to-br from-gray-100 via-cyan-100 to-blue-200 bg-clip-text text-transparent">
                  Simplify operations.
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
                    Accelerate results.
                  </span>
                  <br />
                  Reclaim your time for what
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text">
                    truly grows your business.
                  </span>
                </span>
              </h2>
            </div>
          </div>

          {/* Third Row - Newly Added with Slide-in from Right */}
          <div 
            ref={el => sectionRefs.current[4] = el}
            data-delay="1000"
            className="reveal-slide-right section-hidden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              {/* Left Column - Text */}
              <div className="space-y-8">
                <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-300 font-semibold text-sm uppercase tracking-wider">
                    Newly Added
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight">
                  <span className="bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 bg-clip-text text-transparent animate-gradient-x">
                    AI Chatbots
                  </span>
                </h2>
                
                <p className="text-xl text-gray-400 leading-relaxed">
                  Your Dedicated AI Support Bot, Built Just for Coaches
                </p>
                
                <button
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold text-lg overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Explore Projects</span>
                    <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </button>
              </div>

              {/* Right Column - Visual */}
              <div className="relative">
                <div className="relative tilt-element transform-gpu">
                  <img
                    src="/demo.png"
                    alt="AI Chatbot demo"
                    className="w-full h-[600px] rounded-3xl border-2 border-gray-800/50 shadow-2xl object-cover transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-600/10 rounded-3xl mix-blend-overlay"></div>
                  
                  {/* Floating AI Elements */}
                  <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-2xl flex items-center justify-center transform -rotate-12 animate-float">
                    <Bot className="text-white" size={32} />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12 animate-float" style={{animationDelay: '2s'}}>
                    <Zap className="text-white" size={28} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CSS Animations and Styles */}
      <style jsx>{`
        @keyframes glow-text {
          0%, 100% {
            text-shadow:
              0 0 20px rgba(34, 211, 238, 0.5),
              0 0 40px rgba(34, 211, 238, 0.3),
              0 0 60px rgba(34, 211, 238, 0.2);
          }
          50% {
            text-shadow:
              0 0 30px rgba(34, 211, 238, 0.7),
              0 0 60px rgba(34, 211, 238, 0.5),
              0 0 80px rgba(34, 211, 238, 0.3);
          }
        }

        @keyframes card-fade-in {
          from {
            opacity: 0;
            transform: translateY(40px) scale(0.95) rotateX(5deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-80px) skewX(-5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(80px) skewX(5deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(0);
          }
        }

        @keyframes scale-reveal {
          from {
            opacity: 0;
            transform: scale(0.8) rotate(-2deg);
          }
          to {
            opacity: 1;
            transform: scale(1) rotate(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes wave {
          0% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(-25%) translateY(5px);
          }
          100% {
            transform: translateX(0) translateY(0);
          }
        }

        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        .animate-wave {
          animation: wave 8s ease-in-out infinite;
        }

        /* Card Animations */
        .service-card {
          opacity: 0;
          transform: translateY(40px) scale(0.95) rotateX(5deg);
          transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .service-card.card-visible {
          animation: card-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        /* Section Reveal Animations */
        .section-hidden {
          opacity: 0;
          transform: translateY(60px);
        }

        .reveal-slide-left.section-visible {
          animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .reveal-slide-right.section-visible {
          animation: slide-in-right 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .reveal-scale.section-visible {
          animation: scale-reveal 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .parallax-section {
          transform: translateZ(0);
        }

        /* Utility Classes */
        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        /* Enhanced hover effects */
        .service-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .display-hero {
            font-size: 3rem;
            line-height: 1.1;
          }
        }

        @media (max-width: 768px) {
          .grid {
            grid-template-columns: repeat(1, 1fr);
          }

          .display-hero {
            font-size: 2.5rem;
            line-height: 1.15;
            text-align: center;
          }

          .reveal-slide-left,
          .reveal-slide-right {
            margin-bottom: 60px !important;
          }

          .service-card {
            margin-bottom: 2rem;
          }
        }

        @media (max-width: 640px) {
          .display-hero {
            font-size: 2rem;
            line-height: 1.2;
          }

          .service-card {
            padding: 1.5rem;
          }
        }

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .service-card,
          .reveal-slide-left,
          .reveal-slide-right,
          .reveal-scale,
          .section-hidden {
            animation: none;
            transition: none;
            opacity: 1;
            transform: none;
          }
          
          .animate-glow-text,
          .animate-float,
          .animate-gradient-x,
          .animate-wave {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}