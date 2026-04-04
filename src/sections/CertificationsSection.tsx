import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, ExternalLink, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Certification {
  id: number;
  title: string;
  issuer: string;
  date: string;
  description: string;
  skills: string[];
  link?: string;
}

const certifications: Certification[] = [
  {
    id: 1,
    title: 'Full Stack Developer Course',
    issuer: 'Certification Platform',
    date: '2025',
    description: 'Comprehensive training in modern full-stack development covering frontend, backend, and deployment.',
    skills: ['React', 'Node.js', 'MongoDB', 'Express'],
  },
  {
    id: 2,
    title: 'ML Foundations',
    issuer: 'IIT Bombay',
    date: '2025',
    description: 'Foundational course in Machine Learning covering supervised and unsupervised learning algorithms.',
    skills: ['Python', 'Scikit-learn', 'Pandas', 'NumPy'],
  },
  {
    id: 3,
    title: 'Generative AI Certification',
    issuer: 'Techfest',
    date: '2025',
    description: 'Advanced certification in Generative AI technologies and applications.',
    skills: ['AI/ML', 'Neural Networks', 'Deep Learning'],
  },
];

const achievements = [
  {
    title: 'Google Developers Hackathon',
    description: 'Finalist - Certificate of Excellence',
    year: '2026',
  },
  {
    title: 'Academic Excellence',
    description: 'CGPA 8.7 in B.Tech CSE (Data Science)',
    year: '2024-2028',
  },
];

const CertificationsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Certification cards
      gsap.fromTo(
        '.cert-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.certs-grid',
            start: 'top 80%',
          },
        }
      );

      // Achievement cards
      gsap.fromTo(
        '.achievement-card',
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: '.achievements-grid',
            start: 'top 85%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative py-24 px-4 sm:px-6 lg:px-8"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-cyber-cyan/5 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-72 h-72 bg-cyber-blue/5 rounded-full blur-3xl -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-cyber-cyan/10 border border-cyber-cyan/30 text-cyber-cyan text-sm mb-4">
            Credentials
          </span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-4">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Professional certifications and notable accomplishments that validate my expertise.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="cert-card group relative p-6 rounded-xl bg-cyber-navy border border-cyber-border hover:border-cyber-cyan/50 transition-all hover:shadow-glow"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-cyber-cyan/10">
                  <Award className="w-6 h-6 text-cyber-cyan" />
                </div>
                <span className="text-sm text-cyber-cyan">{cert.date}</span>
              </div>

              {/* Content */}
              <h3 className="text-lg font-heading font-bold text-white mb-1">
                {cert.title}
              </h3>
              <p className="text-gray-400 text-sm mb-3">{cert.issuer}</p>
              <p className="text-gray-500 text-sm mb-4">
                {cert.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {cert.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 rounded-md bg-cyber-cyan/10 text-cyber-cyan text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Link */}
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyber-cyan text-sm hover:underline"
                >
                  View Certificate
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyber-cyan/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-heading font-bold text-white mb-2">
            Notable <span className="text-gradient">Achievements</span>
          </h3>
        </div>

        <div className="achievements-grid flex flex-wrap justify-center gap-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="achievement-card flex items-center gap-4 px-6 py-4 rounded-xl bg-cyber-cyan/10 border border-cyber-cyan/30"
            >
              <CheckCircle className="w-6 h-6 text-cyber-cyan flex-shrink-0" />
              <div>
                <h4 className="font-heading font-bold text-white">
                  {achievement.title}
                </h4>
                <p className="text-gray-400 text-sm">{achievement.description}</p>
              </div>
              <span className="ml-4 px-3 py-1 rounded-full bg-cyber-cyan/20 text-cyber-cyan text-sm">
                {achievement.year}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
