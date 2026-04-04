import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [displayText, setDisplayText] = useState('');
  const fullText = 'Data Science Engineer & Full Stack Developer';
  const [showCursor, setShowCursor] = useState(true);

  // Typing animation
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, []);

  // Cursor blink
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // GSAP animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal animation
      gsap.fromTo(
        '.hero-greeting',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-name',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-description',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-cta',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1, ease: 'power3.out' }
      );

      gsap.fromTo(
        '.hero-socials',
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' }
      );

      // Image 3D flip reveal
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, rotateY: 90 },
        { opacity: 1, rotateY: 0, duration: 1.2, delay: 0.6, ease: 'power3.out' }
      );

      // Parallax on scroll
      gsap.to(textRef.current, {
        y: -100,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(imageRef.current, {
        y: -50,
        rotateZ: 5,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse follow effect for image
  useEffect(() => {
    const image = imageRef.current;
    if (!image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = image.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const rotateX = (e.clientY - centerY) / 30;
      const rotateY = (centerX - e.clientX) / 30;

      gsap.to(image, {
        rotateX: Math.max(-15, Math.min(15, rotateX)),
        rotateY: Math.max(-15, Math.min(15, rotateY)),
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    image.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      image.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-cyber-cyan/20 rounded-full animate-pulse-glow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-cyber-cyan/10 rounded-full animate-pulse-glow" style={{ animationDelay: '1s' }} />
      
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 text-center lg:text-left">
            <div className="hero-greeting mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm">
                <span className="w-2 h-2 bg-cyber-cyan rounded-full animate-pulse" />
                Hello, I'm
              </span>
            </div>

            <h1 className="hero-name text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold text-white mb-6">
              Avinash
              <br />
              <span className="text-gradient">Inapakurthi</span>
            </h1>

            <div className="hero-description mb-6">
              <p className="text-xl sm:text-2xl text-gray-300 font-heading">
                {displayText}
                <span
                  className={`inline-block w-0.5 h-6 bg-cyber-cyan ml-1 ${
                    showCursor ? 'opacity-100' : 'opacity-0'
                  }`}
                />
              </p>
            </div>

            <p className="hero-description text-gray-400 text-lg mb-8 max-w-xl mx-auto lg:mx-0">
              I transform complex data into intelligent solutions and build scalable 
              digital ecosystems that make a real impact.
            </p>

            <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <button
                onClick={scrollToProjects}
                className="group relative px-8 py-4 bg-cyber-cyan text-cyber-void font-heading font-bold rounded-lg overflow-hidden transition-all hover:shadow-glow-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore My Work
                  <ChevronDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
              </button>
              
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 border border-cyber-cyan/50 text-cyber-cyan font-heading font-bold rounded-lg hover:bg-cyber-cyan/10 transition-all"
              >
                Get In Touch
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-socials flex gap-4 justify-center lg:justify-start">
              <a
                href="https://github.com/avinashinapakurthi6-glitch"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/avinash-inapakurthi-1a3871316/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:avinashinapakurthi31@gmail.com"
                className="p-3 rounded-lg bg-cyber-navy border border-cyber-border text-gray-400 hover:text-cyber-cyan hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Profile Image */}
          <div className="order-1 lg:order-2 flex justify-center">
            <div
              ref={imageRef}
              className="relative"
              style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
            >
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-cyber-cyan/20 rounded-[2rem] blur-3xl scale-105 animate-pulse-glow" />
              
              {/* Image container */}
              <div className="relative w-56 h-72 sm:w-72 sm:h-96 lg:w-80 lg:h-[28rem]">
                <img
                  src="/images/profile.jpg"
                  alt="Avinash Inapakurthi"
                  className="w-full h-full object-cover rounded-[2rem] border-2 border-cyber-cyan/30"
                  style={{
                    filter: 'drop-shadow(0 0 30px rgba(0, 240, 255, 0.3))',
                    objectPosition: 'center 20%',
                  }}
                />
                
                {/* Holographic ring */}
                <div className="absolute inset-0 rounded-[2rem] border-2 border-cyber-cyan/30 animate-pulse-glow" />
                <div className="absolute inset-3 rounded-[1.5rem] border border-cyber-cyan/20" />
                
                {/* Corner decorations */}
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-cyber-cyan" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-cyber-cyan" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
