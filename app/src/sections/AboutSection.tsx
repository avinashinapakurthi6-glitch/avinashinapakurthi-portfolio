import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Code2, GraduationCap, Briefcase } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface StatProps {
  value: string;
  label: string;
  icon: React.ReactNode;
  suffix?: string;
}

const AnimatedStat = ({ value, label, icon, suffix = '' }: StatProps) => {
  const [displayValue, setDisplayValue] = useState('0');
  const statRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const element = statRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: element,
      start: 'top 80%',
      onEnter: () => {
        if (hasAnimated.current) return;
        hasAnimated.current = true;

        const numericValue = parseFloat(value);
        const isDecimal = value.includes('.');
        const duration = 2;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = (Date.now() - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = numericValue * eased;

          if (isDecimal) {
            setDisplayValue(current.toFixed(1));
          } else {
            setDisplayValue(Math.floor(current).toString());
          }

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setDisplayValue(value);
          }
        };

        animate();
      },
    });

    return () => trigger.kill();
  }, [value]);

  return (
    <div ref={statRef} className="stat-card group relative p-6 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/50 transition-all hover:shadow-glow">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-cyber-cyan/10 text-cyber-cyan group-hover:scale-110 transition-transform">
          {icon}
        </div>
        <div>
          <div className="text-3xl font-heading font-bold text-white">
            {displayValue}
            <span className="text-cyber-cyan">{suffix}</span>
          </div>
          <div className="text-sm text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image scan reveal
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0% 0 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Content glitch assemble
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Stats stagger
      gsap.fromTo(
        '.stat-card',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.stats-grid',
            start: 'top 80%',
          },
        }
      );

      // Parallax effect
      gsap.to(imageRef.current, {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { value: '8.7', label: 'CGPA', icon: <GraduationCap className="w-6 h-6" />, suffix: '' },
    { value: '10', label: 'Projects', icon: <Code2 className="w-6 h-6" />, suffix: '+' },
    { value: '5', label: 'Certifications', icon: <Award className="w-6 h-6" />, suffix: '+' },
    { value: '2', label: 'Internships', icon: <Briefcase className="w-6 h-6" />, suffix: '' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            The Architect Behind <span className="text-gradient">The Code</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/about.jpg"
                alt="About Avinash"
                className="w-full h-auto object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyber-void/80 via-transparent to-transparent" />
              
              {/* Scanline effect */}
              <div className="absolute inset-0 scanline opacity-30" />
            </div>
            
            {/* Decorative frame */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-cyber-cyan/50" />
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-cyber-cyan/50" />
          </div>

          {/* Content */}
          <div ref={contentRef}>
            <div className="glass rounded-2xl p-8 cyber-border">
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Currently pursuing my <span className="text-cyber-cyan font-semibold">B.Tech in CSE (Data Science)</span> at 
                MVGR College of Engineering. I operate at the intersection of data intelligence 
                and web architecture.
              </p>
              
              <p className="text-gray-400 leading-relaxed mb-6">
                My passion lies in creating systems that not only function flawlessly but learn 
                and adapt. From emergency blood donation networks to hospital availability systems, 
                I build tools that matter.
              </p>

              <p className="text-gray-400 leading-relaxed mb-8">
                With expertise in <span className="text-white">Python</span>,{' '}
                <span className="text-white">React</span>, and{' '}
                <span className="text-white">Machine Learning</span>, I transform complex 
                problems into elegant, scalable solutions.
              </p>

              {/* Tech stack tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {['Python', 'React', 'Node.js', 'SQL', 'Firebase', 'ML'].map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid grid grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
          {stats.map((stat) => (
            <AnimatedStat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
