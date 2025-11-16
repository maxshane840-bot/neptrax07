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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  // Intersection Observer for card animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('card-visible');
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

  // Reveal on scroll for showcase section
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal-up');
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      },
      { threshold: 0.15 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    return () => revealObserver.disconnect();
  }, []);

  // Image tilt effect
  useEffect(() => {
    const images = document.querySelectorAll('.services-visual img');

    images.forEach((img) => {
      const handleMouseMove = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        const r = target.getBoundingClientRect();
        const x = (ev.clientX - r.left) / r.width - 0.5;
        const y = (ev.clientY - r.top) / r.height - 0.5;
        target.style.transform = `perspective(900px) rotateX(${y * 6}deg) rotateY(${x * -6}deg) scale(1.02)`;
      };

      const handleMouseLeave = (ev: MouseEvent) => {
        const target = ev.currentTarget as HTMLElement;
        target.style.transform = '';
      };

      img.addEventListener('mousemove', handleMouseMove as EventListener);
      img.addEventListener('mouseleave', handleMouseLeave as EventListener);

      return () => {
        img.removeEventListener('mousemove', handleMouseMove as EventListener);
        img.removeEventListener('mouseleave', handleMouseLeave as EventListener);
      };
    });
  }, []);

  const servicesList = [
    {
      title: 'Custom Website Design',
      description: 'Crafted pixel-perfect designs that reflect your brand identity. We create stunning, user-friendly websites that captivate visitors and convert them into loyal customers through strategic visual storytelling,',
      icon: Code,
    },
    {
      title: 'Full-Stack Web Development',
      description: 'Building robust, scalable web applications with cutting-edge technologies. From front-end interfaces to back-end architecture, we deliver high-performance solutions that grow with your business needs.',
      icon: Code,
    },
    {
      title: 'AI-Powered Chatbots',
      description: 'Intelligent conversational AI that engages customers 24/7. Our chatbots provide instant support, answer queries, and guide users through seamless experiences while learning from every interaction.',
      icon: Bot,
    },
    {
      title: 'Social Media Management & Growth',
      description: 'Strategic social media campaigns that build communities and drive engagement. We manage your presence across platforms, create compelling content, and grow your audience organically with data-driven strategies.',
      icon: Share2,
    },
    {
      title: 'Brand Identity & Visual Design',
      description: 'Comprehensive brand development from concept to execution. We craft memorable logos, color palettes, and visual systems that establish strong brand recognition and communicate your unique value proposition.',
      icon: Layers,
    },
    {
      title: 'Social Media & Digital Advertising',
      description: 'High-converting ad campaigns across Facebook, Instagram, LinkedIn, and Google. We optimize targeting, creative, and messaging to maximize ROI and deliver measurable results for your marketing investment.',
      icon: TrendingUp,
    },
    {
      title: 'SEO Optimization & Growth Strategy',
      description: 'Comprehensive SEO solutions that boost your search rankings and organic traffic. We implement technical optimizations, content strategies, and link-building campaigns that deliver sustainable growth and visibility.',
      icon: Search,
    },
    {
      title: 'AI Automation Agents',
      description: 'Custom AI-powered automation that streamlines workflows and increases efficiency. From data processing to customer service, we build intelligent agents that handle repetitive tasks and free up your team.',
      icon: Zap,
    },
    {
      title: 'Mobile App Design & Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences. We design and develop iOS and Android apps that are intuitive, fast, and aligned with your business objectives.',
      icon: Smartphone,
    },
    {
      title: 'Marketing Audit & Strategic Planning',
      description: 'In-depth analysis of your marketing performance with actionable recommendations. We identify opportunities, optimize spending, and create comprehensive strategies that align with your business goals and budget.',
      icon: BarChart3,
    },
    {
      title: 'E-Commerce Store Development',
      description: 'Complete e-commerce solutions built for conversions and scalability. From product catalogs to secure checkout systems, we create online stores that provide seamless shopping experiences and drive revenue.',
      icon: ShoppingCart,
    },
    {
      title: 'Content Creation & Copywriting',
      description: 'Compelling content that resonates with your audience and drives action. Our expert writers craft SEO-optimized blog posts, website copy, and marketing materials that establish authority and generate leads.',
      icon: PenTool,
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] overflow-hidden">
      {/* Hero Section */}
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
      </section>

      {/* Services Grid Section */}
      <section className="relative py-24 bg-gradient-to-b from-[#0a0a0a] to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, index) => {
              const Icon = service.icon;
              return (
                <div
                  key={index}
                  ref={(el) => (cardsRef.current[index] = el)}
                  className="service-card group relative bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden"
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>

                  {/* Card Corner Accent */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Image Placeholder */}
                  <div className="relative mb-6 rounded-xl overflow-hidden h-48 bg-gray-800/50 group-hover:scale-105 transition-transform duration-500">
                    <img
                      src="/demo.png"
                      alt={service.title}
                      className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30 mix-blend-overlay`}></div>

                    {/* Icon Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                        <Icon className="text-white" size={32} />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4 group-hover:text-gray-300 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 pointer-events-none`}></div>

                  {/* Animated Border */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${service.gradient} p-[1px]`}>
                      <div className="w-full h-full bg-transparent rounded-2xl"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Showcase Section */}
      <section id="services-showcase-2" aria-label="Services showcase" className="relative bg-[#0b0b0b] py-[120px]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
          {/* First Row - Featured Service */}
          <div className="reveal-up mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div className="order-2 lg:order-1">
                <div className="badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#222222] text-[#d7d7d7] text-xs uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2b3]"></span>
                  Featured Service
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  Website Development
                </h2>
                <p className="text-lg md:text-xl text-[#bdbdbd] mb-8 leading-relaxed">
                  Developing digital experiences that are as beautiful as they are functional.
                </p>
                <button
                  className="cta-outline group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/12 text-white transition-all duration-300 hover:bg-white/95 hover:text-[#0b0b0b] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00c2b3] focus:ring-offset-4 focus:ring-offset-[#0b0b0b]"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span>Explore Projects</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              {/* Right Column - Visual */}
              <div className="services-visual order-1 lg:order-2">
                <div className="relative">
                  <img
                    src="public/portfolio/wildebrands.png"
                    alt="Website development demo"
                    className="w-full h-[500px] rounded-3xl border-2 border-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] object-cover transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Second Row - Large Typographic Hero */}
          <div className="reveal-up mb-32">
            <div className="relative max-w-5xl">
              {/* Soft glow background */}
              <div className="absolute -inset-8 bg-gradient-radial from-[#061e28]/22 via-transparent to-transparent rounded-full blur-3xl opacity-60 mix-blend-screen pointer-events-none"></div>

              <h2 className="display-hero text-7xl md:text-7xl lg:text-7xl xl:text-6xl font-black text-white leading-[0.98] tracking-tight">
                Simplify operations.<br />
                Accelerate results.<br />
                Reclaim your time for what<br />
                truly grows your business.<br />
                From no-code agility to custom<br />
                development, we make workflows<br />
                effortless and impactful.
              </h2>
            </div>
          </div>

          {/* Third Row - Newly Added */}
          <div className="reveal-up">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left Column - Text */}
              <div>
                <div className="badge-pill inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#222222] text-[#d7d7d7] text-xs uppercase tracking-wider mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00c2b3]"></span>
                  Newly Added
                </div>
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight">
                  AI Chatbots Development
                </h2>
                <p className="text-lg md:text-xl text-[#bdbdbd] mb-8 leading-relaxed">
                  Your Dedicated AI Support Bot, Built Just for Coaches
                </p>
                <button
                  className="cta-outline group inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-[1.5px] border-white/12 text-white transition-all duration-300 hover:bg-white/95 hover:text-[#0b0b0b] hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)] focus:outline-none focus:ring-2 focus:ring-[#00c2b3] focus:ring-offset-4 focus:ring-offset-[#0b0b0b]"
                  onClick={() => onNavigate('portfolio')}
                >
                  <span>Explore Projects</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </button>
              </div>

              {/* Right Column - Visual */}
              <div className="services-visual">
                <div className="relative">
                  <img
                    src="public/portfolio/wildebrands.png"
                    alt="AI Chatbot demo"
                    className="w-full h-[500px] rounded-3xl border-2 border-[#141414] shadow-[0_20px_60px_rgba(0,0,0,0.5)] object-cover transition-transform duration-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Animation Styles */}
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
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-glow-text {
          animation: glow-text 3s ease-in-out infinite;
        }

        .service-card {
          opacity: 0;
          transform: translateY(30px) scale(0.95);
          transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .service-card.card-visible {
          animation: card-fade-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Reveal animations for showcase section */
        .reveal-up {
          opacity: 0;
          transform: translateY(18px);
          transition: transform 0.7s cubic-bezier(0.2, 0.9, 0.2, 1), opacity 0.6s;
        }

        .reveal-up.in-view {
          opacity: 1;
          transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-up {
            transform: none;
            opacity: 1;
            transition: none;
          }
        }

        /* Badge styles */
        .badge-pill {
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        /* Display hero typography */
        .display-hero {
          word-break: keep-all;
        }

        /* Radial gradient utility */
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--tw-gradient-stops));
        }

        /* Services visual hover effects */
        .services-visual img {
          cursor: pointer;
          transition: transform 0.45s cubic-bezier(0.2, 0.9, 0.2, 1);
        }

        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .display-hero {
            font-size: 3rem;
            line-height: 1.1;
          }
        }

        @media (max-width: 640px) {
          .grid {
            grid-template-columns: repeat(1, 1fr);
          }

          .display-hero {
            font-size: 2rem;
            line-height: 1.15;
            text-align: center;
          }

          #services-showcase-2 {
            padding: 60px 0;
          }

          .reveal-up {
            margin-bottom: 60px !important;
          }
        }

        /* Mobile order fixes */
        @media (max-width: 1023px) {
          .services-visual {
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </div>
  );
}