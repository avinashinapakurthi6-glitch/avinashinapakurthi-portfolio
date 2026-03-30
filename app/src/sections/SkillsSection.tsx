import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Layout, 
  GitBranch,
  Terminal,
  Cpu,
  Layers,
  Box,
  Figma,
  Workflow
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  icon: React.ReactNode;
  category: string;
  level: number;
}

const skills: Skill[] = [
  { name: 'Python', icon: <Terminal className="w-6 h-6" />, category: 'Programming', level: 90 },
  { name: 'C++', icon: <Code2 className="w-6 h-6" />, category: 'Programming', level: 85 },
  { name: 'Java', icon: <Cpu className="w-6 h-6" />, category: 'Programming', level: 80 },
  { name: 'JavaScript', icon: <Globe className="w-6 h-6" />, category: 'Web', level: 88 },
  { name: 'React', icon: <Layout className="w-6 h-6" />, category: 'Web', level: 85 },
  { name: 'Node.js', icon: <Server className="w-6 h-6" />, category: 'Backend', level: 75 },
  { name: 'SQL', icon: <Database className="w-6 h-6" />, category: 'Data', level: 82 },
  { name: 'Firebase', icon: <Box className="w-6 h-6" />, category: 'Data', level: 78 },
  { name: 'Git', icon: <GitBranch className="w-6 h-6" />, category: 'Tools', level: 85 },
  { name: 'APIs', icon: <Workflow className="w-6 h-6" />, category: 'Backend', level: 80 },
  { name: 'Figma', icon: <Figma className="w-6 h-6" />, category: 'Design', level: 70 },
  { name: 'ML Basics', icon: <Layers className="w-6 h-6" />, category: 'Data', level: 75 },
];

const SkillsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Skill nodes entrance
      gsap.fromTo(
        '.skill-node',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: {
            each: 0.05,
            from: 'center',
          },
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Category cards entrance
      gsap.fromTo(
        '.category-card',
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.categories-grid',
            start: 'top 80%',
          },
        }
      );

      // Floating animation for skill nodes
      gsap.to('.skill-node', {
        y: 'random(-10, 10)',
        x: 'random(-5, 5)',
        duration: 'random(3, 5)',
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.2,
          from: 'random',
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const categories = [
    { name: 'Programming', color: 'from-cyan-500 to-blue-500', skills: ['Python', 'C++', 'Java'] },
    { name: 'Web Development', color: 'from-purple-500 to-pink-500', skills: ['JavaScript', 'React', 'HTML/CSS'] },
    { name: 'Backend & APIs', color: 'from-green-500 to-emerald-500', skills: ['Node.js', 'APIs', 'SQL'] },
    { name: 'Data & ML', color: 'from-orange-500 to-red-500', skills: ['SQL', 'Firebase', 'ML Basics'] },
  ];

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyber-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            Digital Arsenal
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A comprehensive toolkit honed through projects, internships, and continuous learning.
          </p>
        </div>

        {/* Skills Cloud */}
        <div ref={cloudRef} className="mb-16">
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-node group relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/50 transition-all hover:shadow-glow cursor-default">
                  <span className="text-cyber-cyan group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </span>
                  <span className="text-white font-medium">{skill.name}</span>
                  
                  {/* Hover tooltip with level */}
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-cyber-cyan text-cyber-void text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    {skill.level}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Cards */}
        <div className="categories-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card group relative p-6 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/30 transition-all overflow-hidden"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
              
              <h3 className="text-lg font-heading font-bold text-white mb-4">
                {category.name}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Progress bar */}
              <div className="mt-4 h-1 bg-cyber-border rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${category.color} rounded-full transform -translate-x-full group-hover:translate-x-0 transition-transform duration-700`}
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Connection lines decoration */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" style={{ zIndex: -1 }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0" />
              <stop offset="50%" stopColor="#00f0ff" stopOpacity="1" />
              <stop offset="100%" stopColor="#00f0ff" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default SkillsSection;
