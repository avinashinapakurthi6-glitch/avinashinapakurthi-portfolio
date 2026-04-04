import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, Calendar, MapPin, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: 'work' | 'education';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  achievements?: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Java Full Stack Developer',
    organization: 'EduSkills Academy',
    location: 'Online',
    period: 'Jan 2026 - Mar 2026',
    description: 'Completed a 10-week intensive internship gaining hands-on experience in modern web development technologies.',
    achievements: [
      'Built full-stack applications using Spring Boot and React',
      'Implemented RESTful APIs with Hibernate ORM',
      'Designed responsive UI with HTML, CSS, JavaScript',
    ],
  },
  {
    id: 2,
    type: 'work',
    title: 'Web Development & Design Support',
    organization: 'CLIENTURA',
    location: 'Remote',
    period: '2025',
    description: 'Worked closely with clients and team members to manage projects end-to-end, delivering branding and marketing content.',
    achievements: [
      'Designed user-friendly interfaces for client projects',
      'Created posters and visual content for brand identity',
      'Coordinated digital marketing efforts',
    ],
  },
  {
    id: 3,
    type: 'education',
    title: 'B.Tech - CSE (Data Science)',
    organization: 'MVGR College of Engineering',
    location: 'Vizianagaram, India',
    period: '2024 - 2028',
    description: 'Pursuing Computer Science Engineering with specialization in Data Science. Current CGPA: 8.7',
    achievements: [
      'Google Developers Hackathon Finalist 2026',
      'Active member of coding clubs and tech communities',
    ],
  },
  {
    id: 4,
    type: 'education',
    title: 'Higher Secondary Education (12th)',
    organization: 'SR Educational Academy',
    location: 'Andhra Pradesh',
    period: '2022 - 2024',
    description: 'Completed higher secondary education with focus on Mathematics and Computer Science.',
    achievements: [
      'Scored 91.5% in final examinations',
      'Participated in science fairs and coding competitions',
    ],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line draw
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      );

      // Timeline items
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          },
        }
      );

      // Nodes spark
      gsap.fromTo(
        '.timeline-node',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.3,
          stagger: 0.3,
          ease: 'elastic.out(1, 0.5)',
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 70%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            System Logs
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Experience & <span className="text-gradient">Education</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            My journey through professional experiences and academic achievements.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container relative">
          {/* Center line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyber-cyan via-cyber-blue to-cyber-cyan origin-top"
          />

          {/* Timeline items */}
          <div className="space-y-12">
            {experiences.map((item, index) => (
              <div
                key={item.id}
                className={`timeline-item relative flex items-start gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Node */}
                <div className="timeline-node absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-cyber-cyan shadow-glow z-10" />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[45%] ${
                  index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'
                }`}>
                  <div className="group relative p-6 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/50 transition-all hover:shadow-glow">
                    {/* Icon */}
                    <div className={`absolute -top-3 ${
                      index % 2 === 0 ? 'md:right-6 right-6' : 'md:left-6 left-6'
                    } w-10 h-10 rounded-lg bg-cyber-cyan/20 flex items-center justify-center`}>
                      {item.type === 'work' ? (
                        <Briefcase className="w-5 h-5 text-cyber-cyan" />
                      ) : (
                        <GraduationCap className="w-5 h-5 text-cyber-cyan" />
                      )}
                    </div>

                    {/* Period */}
                    <div className={`flex items-center gap-2 text-cyber-cyan text-sm mb-2 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <Calendar className="w-4 h-4" />
                      {item.period}
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold text-white mb-1">
                      {item.title}
                    </h3>

                    {/* Organization */}
                    <div className={`flex items-center gap-2 text-gray-400 mb-3 ${
                      index % 2 === 0 ? 'md:justify-end' : ''
                    }`}>
                      <MapPin className="w-4 h-4" />
                      {item.organization} • {item.location}
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-4">
                      {item.description}
                    </p>

                    {/* Achievements */}
                    {item.achievements && (
                      <div className={`space-y-2 ${
                        index % 2 === 0 ? 'md:text-right' : ''
                      }`}>
                        {item.achievements.map((achievement, i) => (
                          <div 
                            key={i}
                            className={`flex items-start gap-2 text-sm text-gray-300 ${
                              index % 2 === 0 ? 'md:flex-row-reverse' : ''
                            }`}
                          >
                            <Award className="w-4 h-4 text-cyber-cyan flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Hover glow effect */}
                    <div className="absolute inset-0 rounded-xl bg-cyber-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  </div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
