import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tech: string[];
  github?: string;
  live?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'BloodConnect',
    description: 'A real-time emergency blood donation system featuring SOS broadcasting, donor availability queue, blood inventory tracking, and rule-based medical eligibility verification to support faster emergency response.',
    image: '/images/project-bloodconnect.jpg',
    tech: ['React', 'Node.js', 'Firebase', 'Maps API'],
    github: 'https://github.com/avinashinapakurthi6-glitch',
  },
  {
    id: 2,
    title: 'Hospital Availability System',
    description: 'A web application that suggests nearby hospitals with address, contact details, Aarogyasri availability, and provides guidance on symptoms, prevention, and precautionary measures for users.',
    image: '/images/project-hospital.jpg',
    tech: ['JavaScript', 'HTML/CSS', 'APIs', 'MySQL'],
    github: 'https://github.com/avinashinapakurthi6-glitch',
  },
  {
    id: 3,
    title: 'AI Data Pipeline',
    description: 'An automated machine learning workflow that processes, cleans, and analyzes data streams in real-time, featuring neural network visualization and predictive analytics dashboard.',
    image: '/images/project-ai-pipeline.jpg',
    tech: ['Python', 'TensorFlow', 'Pandas', 'React'],
    github: 'https://github.com/avinashinapakurthi6-glitch',
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards entrance
      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            Featured Deployments
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Real-world applications built with passion and precision.
          </p>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group relative"
              onMouseEnter={() => setIsFlipped(project.id)}
              onMouseLeave={() => setIsFlipped(null)}
            >
              <div 
                className="relative h-[400px] rounded-2xl overflow-hidden cursor-pointer"
                style={{ perspective: '1000px' }}
              >
                {/* Front */}
                <div 
                  className={`absolute inset-0 transition-all duration-700 ${
                    isFlipped === project.id ? 'opacity-0 rotateY-180' : 'opacity-100'
                  }`}
                  style={{ 
                    transform: isFlipped === project.id ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyber-void via-cyber-void/50 to-transparent opacity-60" />
                  <div className="absolute inset-0 scanline opacity-20" />
                  
                  {/* Content overlay */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <h3 className="text-2xl font-heading font-bold text-white mb-2">
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded-md bg-cyber-cyan/20 text-cyber-cyan text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-cyber-cyan/50" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-cyber-cyan/50" />
                </div>

                {/* Back */}
                <div 
                  className={`absolute inset-0 bg-cyber-navy border border-cyber-cyan/30 rounded-2xl p-6 flex flex-col justify-center transition-all duration-700 ${
                    isFlipped === project.id ? 'opacity-100' : 'opacity-0 rotateY-180'
                  }`}
                  style={{ 
                    transform: isFlipped === project.id ? 'rotateY(0deg)' : 'rotateY(-180deg)',
                    transformStyle: 'preserve-3d',
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <h3 className="text-xl font-heading font-bold text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        <span className="text-sm">Code</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan text-cyber-void hover:bg-cyber-cyan/90 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span className="text-sm">Live</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="lg:hidden">
          <div className="relative">
            <div className="overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="w-full flex-shrink-0"
                  >
                    <div className="relative h-[400px] rounded-2xl overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cyber-void via-cyber-void/50 to-transparent" />
                      
                      <div className="absolute inset-0 p-6 flex flex-col justify-end">
                        <h3 className="text-2xl font-heading font-bold text-white mb-2">
                          {project.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.tech.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-1 rounded-md bg-cyber-cyan/20 text-cyber-cyan text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyber-cyan/10 text-cyber-cyan w-fit"
                        >
                          <Github className="w-4 h-4" />
                          <span className="text-sm">View Code</span>
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation buttons */}
            <button
              onClick={prevProject}
              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyber-navy/80 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cyber-navy/80 border border-cyber-cyan/30 text-cyber-cyan hover:bg-cyber-cyan/20 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
            
            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-4">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === activeIndex 
                      ? 'w-8 bg-cyber-cyan' 
                      : 'bg-cyber-cyan/30 hover:bg-cyber-cyan/50'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
