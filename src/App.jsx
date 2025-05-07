import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import portfolioData from './PortfolioData'

// Create a Navbar component
function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">LK</div>
        <div className={`menu-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
          <li><a onClick={() => scrollToSection('about')}>About</a></li>
          <li><a onClick={() => scrollToSection('skills')}>Skills</a></li>
          <li><a onClick={() => scrollToSection('experience')}>Experience</a></li>
          <li><a onClick={() => scrollToSection('education')}>Education</a></li>
          <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}

function About({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const keywords = ['Data Analyst', 'data visualization', 'statistical analysis', 'database management', 'SQL', 'Excel', 'Power BI', 'Python'];
  
  // Split summary into parts based on keywords for highlighting
  const renderHighlightedSummary = () => {
    let textParts = [data.summary];
    
    // Highlight each keyword
    keywords.forEach(keyword => {
      const newParts = [];
      textParts.forEach(part => {
        if (typeof part === 'string') {
          const splitText = part.split(new RegExp(`(${keyword})`, 'gi'));
          splitText.forEach((text, i) => {
            if (text.toLowerCase() === keyword.toLowerCase()) {
              newParts.push(<span key={`${keyword}-${i}`} className="keyword-highlight">{text}</span>);
            } else if (text.length > 0) {
              newParts.push(text);
            }
          });
        } else {
          newParts.push(part);
        }
      });
      textParts = newParts;
    });
    
    return textParts;
  };
  
  return (
    <section id="about" className="section-card summary-section">
      <div className="summary-container">
        <div className="summary-header">
          <h3>Summary</h3>
          <div className="summary-icon-container">
            <div className="summary-icon summary-icon-data">📊</div>
            <div className="summary-icon summary-icon-analysis">📈</div>
            <div className="summary-icon summary-icon-insight">💡</div>
          </div>
        </div>
        
        <div className={`summary-content ${isExpanded ? 'expanded' : ''}`}>
          <p>{renderHighlightedSummary()}</p>
          
          <div className="summary-stats">
            <div className="stat-item">
              <div className="stat-number">3m</div>
              <div className="stat-label">Experience</div>
              <div className="stat-bar">
                <div className="stat-fill stat-fill-1"></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-number">4</div>
              <div className="stat-label">Projects</div>
              <div className="stat-bar">
                <div className="stat-fill stat-fill-2"></div>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5</div>
              <div className="stat-label">Data Tools</div>
              <div className="stat-bar">
                <div className="stat-fill stat-fill-3"></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="summary-expand" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? 'Show Less' : 'Show More'}
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            {isExpanded ? '↑' : '↓'}
          </span>
        </div>
      </div>
      
      <div className="summary-decoration summary-decoration-1"></div>
      <div className="summary-decoration summary-decoration-2"></div>
      <div className="summary-decoration summary-decoration-3"></div>
    </section>
  );
}

function Skills({ data }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  
  // Define the specific skills requested
  const skills = ['Python', 'Power BI', 'Tableau', 'SQL', 'Excel', 'Statistical'];
  
  // Define categories and their associated skills
  const categories = {
    'All': skills,
    'Data Analysis': ['Python', 'Statistical'],
    'Visualization': ['Tableau', 'Power BI'],
    'Database': ['SQL', 'Excel']
  };
  
  // Define skill proficiency levels (out of 100)
  const proficiencyLevels = {
    'Python': 80,
    'Power BI': 75,
    'Tableau': 70,
    'SQL': 85,
    'Excel': 90,
    'Statistical': 75
  };
  
  // Filter skills based on selected category
  const filteredSkills = categories[selectedCategory] || skills;
  
  return (
    <section id="skills" className="section-card skills-section">
      <div className="skills-header">
        <h3>Technical Skills</h3>
        <div className="skills-decoration skills-decoration-1"></div>
        <div className="skills-decoration skills-decoration-2"></div>
      </div>
      
      <div className="skills-category-filter">
        {Object.keys(categories).map(category => (
          <button 
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="skills-grid-container">
        <div className="skills-grid">
          {filteredSkills.map(skill => (
            <div 
              key={skill} 
              className={`skill-card ${hoveredSkill === skill ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredSkill(skill)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <div className="skill-icon">
                {getSkillIcon(skill)}
              </div>
              <div className="skill-info">
                <h4>{skill}</h4>
                <div className="skill-proficiency-bar">
                  <div 
                    className="skill-proficiency-fill" 
                    style={{ width: `${proficiencyLevels[skill] || 50}%` }}
                  ></div>
                </div>
                <div className="skill-proficiency-level">
                  {getProficiencyLabel(proficiencyLevels[skill] || 50)}
                </div>
              </div>
              
              {hoveredSkill === skill && (
                <div className="skill-detail-popup">
                  <h5>{skill}</h5>
                  <div className="skill-detail-bar">
                    <div 
                      className="skill-detail-fill" 
                      style={{ width: `${proficiencyLevels[skill] || 50}%` }}
                    ></div>
                  </div>
                  <p>{getSkillDescription(skill)}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper functions for Skills component
function getSkillIcon(skill) {
  const icons = {
    'Python': '🐍',
    'Power BI': '📊',
    'Tableau': '📈',
    'SQL': '💾',
    'Excel': '📑',
    'Statistical': '📉'
  };
  
  return icons[skill] || '💻';
}

function getProficiencyLabel(level) {
  if (level >= 90) return 'Expert';
  if (level >= 75) return 'Advanced';
  if (level >= 60) return 'Intermediate';
  if (level >= 40) return 'Familiar';
  return 'Beginner';
}

function getSkillDescription(skill) {
  const descriptions = {
    'Python': 'Proficient in Python programming for data analysis, automation, and building applications.',
    'Power BI': 'Creating interactive dashboards, data modeling, and business intelligence reports with Power BI.',
    'Tableau': 'Designing data visualizations, interactive dashboards, and performing visual analytics in Tableau.',
    'SQL': 'Experienced in writing complex queries, data extraction, and database management using SQL.',
    'Excel': 'Advanced Excel skills including pivot tables, VLOOKUP, macros, data modeling, and statistical analysis.',
    'Statistical': 'Strong foundation in statistical methods including hypothesis testing, regression analysis, and data interpretation.'
  };
  
  return descriptions[skill] || 'Skilled in various aspects of this technology.';
}

function Experience({ data }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Define experience categories (could be 'Data Analysis', 'Internship', etc.)
  const categories = {
    'All': data.experience,
    'Recent': data.experience.slice(0, 1),
    'Previous': data.experience.slice(1)
  };
  
  // Get filtered experiences based on selected category
  const filteredExperiences = categories[selectedFilter] || data.experience;
  
  return (
    <section id="experience" className="section-card experience-section">
      <div className="experience-header">
        <h3>Professional Experience</h3>
        <div className="experience-decoration experience-decoration-1"></div>
        <div className="experience-decoration experience-decoration-2"></div>
      </div>
      
      <div className="experience-filter">
        {Object.keys(categories).map(category => (
          <button 
            key={category}
            className={`category-button ${selectedFilter === category ? 'active' : ''}`}
            onClick={() => setSelectedFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="experience-grid-container">
        <div className="experience-grid">
          {filteredExperiences.map((exp, idx) => (
            <div 
              key={idx} 
              className={`experience-card ${hoveredItem === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="experience-card-header">
                <div className="experience-icon">
                  {getExperienceIcon(exp.company)}
                </div>
                <div className="experience-company-info">
                  <h4>{exp.company}</h4>
                  <span className="experience-period">{exp.period}</span>
                </div>
              </div>
              
              <div className="experience-divider"></div>
              
              <div className="experience-content">
                <ul className="achievements-list">
                  {exp.achievements.map((ach, i) => (
                    <li key={i} className="achievement-item">
                      <div className="achievement-bullet"></div>
                      <span className="achievement-text">{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="experience-card-footer">
                <div className="experience-skills">
                  {getRelevantSkills(exp.company).map((skill, i) => (
                    <span key={i} className="experience-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper functions for Experience component
function getExperienceIcon(company) {
  // Default icon is a briefcase, but you could customize per company
  const icons = {
    // Customize with actual company names if needed
    "Sample Company": "💼",
    "Another Corp": "🏢"
  };
  
  return icons[company] || "💼";
}

function getRelevantSkills(company) {
  // Map companies to skills used (for demonstration)
  const companySkills = {
    // Customize with actual company names and skills used
    "Sample Company": ["Python", "SQL", "Excel"],
    "Another Corp": ["Tableau", "Power BI", "Statistical"]
  };
  
  return companySkills[company] || ["Data Analysis"];
}

function Education({ data }) {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Define education level categories
  const categories = {
    'All': data.education,
    'Degrees': data.education.filter(edu => edu.degree.includes('B.') || edu.degree.includes('M.')),
    'Certificates': data.education.filter(edu => !edu.degree.includes('B.') && !edu.degree.includes('M.'))
  };
  
  // Get filtered education items based on selected category
  const filteredEducation = categories[selectedFilter] || data.education;
  
  return (
    <section id="education" className="section-card education-section">
      <div className="education-header">
        <h3>Education</h3>
        <div className="education-decoration education-decoration-1"></div>
        <div className="education-decoration education-decoration-2"></div>
      </div>
      
      <div className="education-filter">
        {Object.keys(categories).map(category => (
          <button 
            key={category}
            className={`category-button ${selectedFilter === category ? 'active' : ''}`}
            onClick={() => setSelectedFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="education-grid-container">
        <div className="education-grid">
          {filteredEducation.map((edu, idx) => (
            <div 
              key={idx} 
              className={`education-card ${hoveredItem === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="education-card-header">
                <div className="education-icon">
                  {getEducationIcon(edu.degree)}
                </div>
                <div className="education-degree-info">
                  <h4>{edu.degree}</h4>
                  <span className="education-period">{edu.period}</span>
                </div>
              </div>
              
              <div className="education-divider"></div>
              
              <div className="education-content">
                <div className="education-institution">
                  <div className="institution-icon">🏫</div>
                  <span>{edu.institution}</span>
                </div>
                
                {edu.accomplishments && (
                  <div className="education-accomplishments">
                    <div className="accomplishments-label">Accomplishments</div>
                    <ul className="accomplishments-list">
                      {edu.accomplishments && edu.accomplishments.map((acc, i) => (
                        <li key={i} className="accomplishment-item">
                          <div className="accomplishment-bullet"></div>
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper functions for Education component
function getEducationIcon(degree) {
  if (degree.includes('Master') || degree.includes('M.')) {
    return "🎓";
  } else if (degree.includes('Bachelor') || degree.includes('B.')) {
    return "🎓";
  } else if (degree.includes('Certificate') || degree.includes('Certification')) {
    return "📜";
  } else if (degree.includes('Diploma')) {
    return "🔖";
  }
  return "📚";
}

function Certifications({ data }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter certifications based on search term
  const filteredCertifications = data.certifications.filter(cert => 
    cert.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <section id="certifications" className="section-card certifications-section">
      <div className="certifications-header">
        <h3>Certifications</h3>
        <div className="certifications-decoration certifications-decoration-1"></div>
        <div className="certifications-decoration certifications-decoration-2"></div>
      </div>
      
      <div className="search-container">
        <div className="search-input-wrapper">
          <input 
            type="text" 
            placeholder="Search certifications..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <div className="search-icon">🔍</div>
        </div>
      </div>
      
      <div className="certifications-grid-container">
        <div className="certifications-grid">
          {filteredCertifications.map((cert, idx) => (
            <div 
              key={idx} 
              className={`certification-card ${hoveredItem === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="certification-icon">
                {getCertificationIcon(cert)}
              </div>
              <div className="certification-content">
                <h4>{cert}</h4>
                <div className="certification-issuer">
                  {getCertificationIssuer(cert)}
                </div>
              </div>
              <div className="certification-badge">
                <div className="badge-icon">🏆</div>
              </div>
            </div>
          ))}
          
          {filteredCertifications.length === 0 && (
            <div className="no-results">
              <div className="no-results-icon">🔎</div>
              <p>No certifications found matching "{searchTerm}"</p>
              <button onClick={() => setSearchTerm('')} className="clear-search">Clear Search</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Helper functions for Certifications component
function getCertificationIcon(certification) {
  // Determine icon based on certification content
  if (certification.toLowerCase().includes('data')) {
    return '📊';
  } else if (certification.toLowerCase().includes('python')) {
    return '🐍';
  } else if (certification.toLowerCase().includes('sql')) {
    return '💾';
  } else if (certification.toLowerCase().includes('excel')) {
    return '📑';
  } else if (certification.toLowerCase().includes('tableau') || certification.toLowerCase().includes('visualization')) {
    return '📈';
  } else if (certification.toLowerCase().includes('machine') || certification.toLowerCase().includes('ml')) {
    return '🤖';
  } else if (certification.toLowerCase().includes('ai')) {
    return '🧠';
  }
  return '📜';
}

function getCertificationIssuer(certification) {
  // Extract or guess the issuer based on certification text
  const knownIssuers = [
    { keyword: 'google', name: 'Google', icon: '🔍' },
    { keyword: 'microsoft', name: 'Microsoft', icon: '⊞' },
    { keyword: 'aws', name: 'Amazon Web Services', icon: '☁️' },
    { keyword: 'coursera', name: 'Coursera', icon: '🌐' },
    { keyword: 'udemy', name: 'Udemy', icon: '🎓' },
    { keyword: 'datacamp', name: 'DataCamp', icon: '📊' },
    { keyword: 'ibm', name: 'IBM', icon: '💻' }
  ];
  
  const foundIssuer = knownIssuers.find(issuer => 
    certification.toLowerCase().includes(issuer.keyword.toLowerCase())
  );
  
  if (foundIssuer) {
    return (
      <span><span className="issuer-icon">{foundIssuer.icon}</span> {foundIssuer.name}</span>
    );
  }
  
  return <span>Professional Certification</span>;
}

function Awards({ data }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Define award categories - Estimate categories based on award names
  const categories = {
    'All': data.awards,
    'Academic': data.awards.filter(award => 
      award.toLowerCase().includes('academic') || 
      award.toLowerCase().includes('scholarship') ||
      award.toLowerCase().includes('dean') ||
      award.toLowerCase().includes('university')
    ),
    'Professional': data.awards.filter(award => 
      award.toLowerCase().includes('professional') || 
      award.toLowerCase().includes('industry') ||
      award.toLowerCase().includes('award') ||
      award.toLowerCase().includes('achievement')
    ),
    'Activities': data.awards.filter(award => 
      award.toLowerCase().includes('volunteer') || 
      award.toLowerCase().includes('participate') ||
      award.toLowerCase().includes('event') ||
      award.toLowerCase().includes('activity')
    )
  };
  
  // Get filtered awards based on selected category
  const filteredAwards = categories[selectedCategory] || data.awards;
  
  return (
    <section id="awards" className="section-card awards-section">
      <div className="awards-header">
        <h3>Awards & Activities</h3>
        <div className="awards-decoration awards-decoration-1"></div>
        <div className="awards-decoration awards-decoration-2"></div>
      </div>
      
      <div className="awards-category-filter">
        {Object.keys(categories).map(category => (
          <button 
            key={category}
            className={`category-button ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className="awards-grid-container">
        <div className="awards-grid">
          {filteredAwards.map((award, idx) => (
            <div 
              key={idx} 
              className={`award-card ${hoveredItem === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="award-icon">
                {getAwardIcon(award)}
              </div>
              <div className="award-content">
                <h4>{award}</h4>
              </div>
              <div className="award-shine"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function for Awards component
function getAwardIcon(award) {
  // Determine appropriate icon based on award text
  if (award.toLowerCase().includes('academic') || award.toLowerCase().includes('dean')) {
    return '🎓';
  } else if (award.toLowerCase().includes('scholarship')) {
    return '💰';
  } else if (award.toLowerCase().includes('award') || award.toLowerCase().includes('achievement')) {
    return '🏆';
  } else if (award.toLowerCase().includes('volunteer') || award.toLowerCase().includes('service')) {
    return '🤝';
  } else if (award.toLowerCase().includes('present') || award.toLowerCase().includes('speaker')) {
    return '🎤';
  } else if (award.toLowerCase().includes('leader') || award.toLowerCase().includes('president')) {
    return '👑';
  } else if (award.toLowerCase().includes('research') || award.toLowerCase().includes('project')) {
    return '🔬';
  } else if (award.toLowerCase().includes('competition')) {
    return '🥇';
  } else if (award.toLowerCase().includes('event') || award.toLowerCase().includes('organize')) {
    return '📅';
  }
  return '🌟';
}

function Languages({ data }) {
  const [hoveredItem, setHoveredItem] = useState(null);
  
  // Define language proficiency levels
  const proficiencyLevels = {
    'English': 90,
    'Hindi': 85,
    'Kannada': 95
  };
  
  // Get proficiency level with fallback
  const getProficiency = (language) => {
    return proficiencyLevels[language] || 80;
  };
  
  // Get proficiency label
  const getProficiencyLabel = (level) => {
    if (level >= 90) return 'Native';
    if (level >= 80) return 'Fluent';
    if (level >= 70) return 'Advanced';
    if (level >= 50) return 'Intermediate';
    return 'Basic';
  };
  
  return (
    <section id="languages" className="section-card languages-section">
      <div className="languages-header">
        <h3>Languages</h3>
        <div className="languages-decoration languages-decoration-1"></div>
        <div className="languages-decoration languages-decoration-2"></div>
      </div>
      
      <div className="languages-grid-container">
        <div className="languages-grid">
          {data.languages.map((language, idx) => (
            <div 
              key={idx} 
              className={`language-card ${hoveredItem === idx ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="language-icon">
                {getLanguageIcon(language)}
              </div>
              <div className="language-content">
                <h4>{language}</h4>
                <div className="language-proficiency-bar">
                  <div 
                    className="language-proficiency-fill" 
                    style={{ width: `${getProficiency(language)}%` }}
                  ></div>
                </div>
                <div className="language-proficiency-level">
                  {getProficiencyLabel(getProficiency(language))}
                </div>
              </div>
              
              {hoveredItem === idx && (
                <div className="language-details">
                  <div className="language-skills">
                    <div className="language-skill-item">
                      <span className="skill-name">Speaking</span>
                      <div className="skill-dots">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`skill-dot ${i < Math.ceil(getProficiency(language) / 20) ? 'active' : ''}`}></span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="language-skill-item">
                      <span className="skill-name">Writing</span>
                      <div className="skill-dots">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`skill-dot ${i < Math.ceil(getProficiency(language) / 20) ? 'active' : ''}`}></span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="language-skill-item">
                      <span className="skill-name">Reading</span>
                      <div className="skill-dots">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className={`skill-dot ${i < Math.ceil(getProficiency(language) / 20) ? 'active' : ''}`}></span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Helper function for Languages component
function getLanguageIcon(language) {
  const icons = {
    'English': '🇬🇧',
    'Hindi': '🇮🇳',
    'Kannada': '🇮🇳',
    'Spanish': '🇪🇸',
    'French': '🇫🇷',
    'German': '🇩🇪',
    'Chinese': '🇨🇳',
    'Japanese': '🇯🇵',
    'Korean': '🇰🇷',
    'Portuguese': '🇵🇹'
  };
  
  return icons[language] || '🌐';
}

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  const [formTouched, setFormTouched] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (!formTouched) setFormTouched(true);
  };

  const handleFocus = (field) => {
    setActiveField(field);
  };

  const handleBlur = () => {
    setActiveField(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission - in a real app, you would connect this to a backend service
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setFormTouched(false);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus(null);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="section-card contact-section">
      <div className="contact-header">
        <h3>Get In Touch</h3>
        <div className="contact-underline"></div>
        <p className="contact-intro">I'm currently looking for new opportunities. If you have any questions or want to work together, feel free to reach out!</p>
      </div>
      
      <div className="contact-floating-shapes">
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-shape contact-shape-3"></div>
        <div className="contact-shape contact-shape-4"></div>
        <div className="contact-shape contact-shape-5"></div>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          <div className="contact-info-header">
            <h4>Contact Information</h4>
            <p>Feel free to reach out using any of these methods</p>
          </div>
          <div className="contact-info-content">
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <i className="contact-icon">📧</i>
                <div className="icon-glow"></div>
              </div>
              <div className="contact-details">
                <span className="contact-label">Email</span>
                <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <i className="contact-icon">📱</i>
                <div className="icon-glow"></div>
              </div>
              <div className="contact-details">
                <span className="contact-label">Phone</span>
                <a href={`tel:${portfolioData.phone}`}>{portfolioData.phone}</a>
              </div>
            </div>
            
            <div className="contact-item">
              <div className="contact-icon-wrapper">
                <i className="contact-icon">📍</i>
                <div className="icon-glow"></div>
              </div>
              <div className="contact-details">
                <span className="contact-label">Location</span>
                <p>{portfolioData.location}</p>
              </div>
            </div>
          </div>
          
          <div className="social-links-wrapper">
            <h5>Connect With Me</h5>
            <div className="social-links">
              <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="social-icon">
                <i>🔗</i>
                <span className="social-tooltip">LinkedIn</span>
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-icon">
                <i>👨‍💻</i>
                <span className="social-tooltip">GitHub</span>
              </a>
              <a href="https://www.kaggle.com" target="_blank" rel="noreferrer" className="social-icon">
                <i>📊</i>
                <span className="social-tooltip">Kaggle</span>
              </a>
            </div>
          </div>
          
          <div className="contact-decoration"></div>
          <div className="contact-pattern"></div>
        </div>
        
        <div className="contact-form-container">
          <div className="form-decoration form-decoration-top"></div>
          <div className="form-decoration form-decoration-bottom"></div>
          
          <h4 className="form-title">Send a Message</h4>
          
          {submitStatus === 'success' ? (
            <div className="success-message">
              <div className="success-icon">
                <span>✓</span>
              </div>
              <div className="success-text">
                <h5>Message Sent Successfully!</h5>
                <p>Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className={`form-group ${(formData.name || activeField === 'name') ? 'active' : ''}`}>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => handleFocus('name')}
                    onBlur={handleBlur}
                    placeholder="John Doe"
                    required 
                  />
                  <label htmlFor="name">Your Name</label>
                  <div className="form-highlight"></div>
                  <span className="form-icon">👤</span>
                </div>
                
                <div className={`form-group ${(formData.email || activeField === 'email') ? 'active' : ''}`}>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => handleFocus('email')}
                    onBlur={handleBlur}
                    placeholder="your.email@example.com"
                    required 
                  />
                  <label htmlFor="email">Your Email</label>
                  <div className="form-highlight"></div>
                  <span className="form-icon">✉️</span>
                </div>
              </div>
              
              <div className={`form-group ${(formData.subject || activeField === 'subject') ? 'active' : ''}`}>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={() => handleFocus('subject')}
                  onBlur={handleBlur}
                  placeholder="Subject of your message"
                  required 
                />
                <label htmlFor="subject">Subject</label>
                <div className="form-highlight"></div>
                <span className="form-icon">📝</span>
              </div>
              
              <div className={`form-group ${(formData.message || activeField === 'message') ? 'active' : ''}`}>
                <textarea 
                  id="message" 
                  name="message" 
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => handleFocus('message')}
                  onBlur={handleBlur}
                  placeholder="Type your message here..."
                  required 
                  rows="6"
                ></textarea>
                <label htmlFor="message">Your Message</label>
                <div className="form-highlight"></div>
                <span className="form-icon form-icon-message">💬</span>
              </div>
              
              <div className="form-footer">
                <button 
                  type="submit" 
                  className={`submit-btn ${formTouched ? 'ready' : ''} ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="submit-spinner"></span>
                  ) : (
                    <>
                      Send Message
                      <span className="btn-icon">↗️</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer({ data }) {
  const currentYear = new Date().getFullYear();
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="enhanced-footer">
      <div className="footer-decoration-dot footer-decoration-dot-1"></div>
      <div className="footer-decoration-dot footer-decoration-dot-2"></div>
      <div className="footer-decoration-dot footer-decoration-dot-3"></div>
      <div className="footer-content">
        <div className="footer-top">
          <div className="footer-logo" onClick={scrollToTop}>
            <div className="logo-text">LK</div>
          </div>
          <div className="footer-social">
            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <i>🔗</i>
              <span className="social-tooltip">LinkedIn</span>
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
              <i>👨‍💻</i>
              <span className="social-tooltip">GitHub</span>
            </a>
            <a href="https://www.kaggle.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Kaggle">
              <i>📊</i>
              <span className="social-tooltip">Kaggle</span>
            </a>
          </div>
        </div>
        
        <div className="footer-middle">
          <div className="footer-info">
            <h4>{data.name}</h4>
            <p className="footer-tagline">Data Analyst specializing in transforming raw data into actionable insights</p>
          </div>
          
          <div className="footer-nav">
            <div className="footer-nav-column">
              <h5>Sections</h5>
              <ul>
                <li><a href="#about">About</a></li>
                <li><a href="#skills">Skills</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#education">Education</a></li>
              </ul>
            </div>
            <div className="footer-nav-column">
              <h5>More Info</h5>
              <ul>
                <li><a href="#certifications">Certifications</a></li>
                <li><a href="#awards">Awards</a></li>
                <li><a href="#languages">Languages</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p className="copyright">© {currentYear} {data.name} - All Rights Reserved</p>
        <div className="back-to-top" onClick={scrollToTop}>
          <span>Back to top</span>
          <span className="top-arrow">↑</span>
        </div>
      </div>
    </footer>
  );
}

function App() {
  // Get the base URL for assets
  const baseUrl = import.meta.env.BASE_URL || '/';
  
  // Function to scroll to the next section
  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <div className="portfolio-container">
      <Navbar />
      <div className="hero-wrapper">
        <div className="hero">
          <div className="hero-bg-squares">
            <div className="hero-square hero-square-1"></div>
            <div className="hero-square hero-square-2"></div>
            <div className="hero-square hero-square-3"></div>
          </div>
          <div className="hero-content">
            <div className="hero-left">
              <div className="hero-greeting">Hello, I'm</div>
              <h1>{portfolioData.name}</h1>
              <div className="hero-underline"></div>
              <h2>{portfolioData.title}</h2>
              <p className="hero-tagline">Transforming raw data into actionable insights</p>
              <div className="hero-info">
                <div className="hero-info-item">
                  <span className="hero-info-icon">📍</span>
                  <span>{portfolioData.location}</span>
                </div>
                <div className="hero-info-item">
                  <span className="hero-info-icon">📧</span>
                  <a href={`mailto:${portfolioData.email}`}>{portfolioData.email}</a>
                </div>
                <div className="hero-info-item">
                  <span className="hero-info-icon">📱</span>
                  <a href={`tel:${portfolioData.phone}`}>{portfolioData.phone}</a>
                </div>
              </div>
              <div className="hero-buttons">
                <a href="#contact" className="primary-button">Get in Touch</a>
                <a href="/resume.pdf" download className="secondary-button">Download CV <span className="download-icon">📄</span></a>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-img-wrapper">
                <div className="hero-img-bg"></div>
                <div className="hero-img-container">
                  <img className="hero-img" src={`${baseUrl}profile.jpeg`} alt="Lingeshwar Kulal" />
                </div>
                <div className="hero-decor-circle"></div>
                <div className="hero-decor-dots"></div>
                <div className="hero-img-shape"></div>
              </div>
            </div>
          </div>
          <div className="hero-scroll-indicator" onClick={scrollToNextSection}>
            <div className="scroll-text">Scroll Down</div>
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      <div className="content-wrapper">
        <About data={portfolioData} />
        <Skills data={portfolioData} />
        <Experience data={portfolioData} />
        <Education data={portfolioData} />
        <Certifications data={portfolioData} />
        <Awards data={portfolioData} />
        <Languages data={portfolioData} />
        <Contact />
        <Footer data={portfolioData} />
      </div>
      <div className="shape shape-1"></div>
      <div className="shape shape-2"></div>
      <div className="shape shape-3"></div>
    </div>
  )
}

export default App
