import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const ui = {
    en: {
        // MenuBar
        finder: 'Finder', file: 'File', edit: 'Edit', view: 'View', go: 'Go', window: 'Window', help: 'Help',
        // Dock tooltips
        resumeExplorer: 'Resume Explorer', portfolio: 'Portfolio', terminal: 'Terminal', notes: 'Notes',
        ticTacToe: 'Tic-Tac-Toe', snake: 'Snake', aboutMe: 'About Me',
        // Finder sidebar
        experience: 'Experience', skills: 'Skills', education: 'Education', resume: 'Resume',
        companies: 'Companies', back: 'Back', keyAchievements: 'Key Achievements', techStack: 'Tech Stack',
        certifications: 'Certifications',
        // About Mac
        specialties: 'Specialties', languages: 'Languages', location: 'Location',
        // Settings
        about: 'About', contact: 'Contact', network: 'Network', languageRegion: 'Language & Region',
        display: 'Display', focus: 'Focus', notifications: 'Notifications',
        machineName: 'Machine Name', summary: 'Summary', email: 'Email', phone: 'Phone',
        viewProfile: 'View Profile', website: 'Website', region: 'Region', calendar: 'Calendar',
        status: 'Status', available: 'Available',
        // Tutorial
        tutorialTitle: 'Welcome to my Interactive Resume',
        tutorialSubtitle: 'Navigate my professional profile like a macOS experience',
        tutorialSteps: [
            { icon: '🍎', title: 'Apple Menu', desc: 'Click the  to see my profile summary' },
            { icon: '📁', title: 'Resume Explorer', desc: 'Browse my experience by company and project' },
            { icon: '🖥', title: 'Terminal', desc: 'Type "skills", "experience", or "neofetch"' },
            { icon: '📝', title: 'Notes', desc: 'Read my education, certifications & career summary' },
            { icon: '🌐', title: 'Portfolio', desc: 'View my online resume in Safari' },
            { icon: '⚙️', title: 'About Me', desc: 'Contact info, languages & links' },
        ],
        tutorialStart: 'Start Exploring',
        tutorialLang: 'También disponible en Español',
        // Notes
        aboutMeNote: '👋 About Me', educationNote: '🎓 Education', certsNote: '☁️ Certifications',
        languagesNote: '🌐 Languages', careerNote: '💼 Career Summary', profile: 'Profile',
        certs: 'certs', roles: 'roles',
        // Terminal
        terminalWelcome: "Welcome to Jhulian Ramírez's Interactive Resume",
        terminalHint: 'Type "help" to see available commands, or "neofetch" for a profile overview.',
    },
    es: {
        finder: 'Finder', file: 'Archivo', edit: 'Editar', view: 'Vista', go: 'Ir', window: 'Ventana', help: 'Ayuda',
        resumeExplorer: 'Explorador CV', portfolio: 'Portafolio', terminal: 'Terminal', notes: 'Notas',
        ticTacToe: 'Tic-Tac-Toe', snake: 'Snake', aboutMe: 'Sobre Mí',
        experience: 'Experiencia', skills: 'Habilidades', education: 'Educación', resume: 'Hoja de Vida',
        companies: 'Empresas', back: 'Volver', keyAchievements: 'Logros Clave', techStack: 'Stack Tecnológico',
        certifications: 'Certificaciones',
        specialties: 'Especialidades', languages: 'Idiomas', location: 'Ubicación',
        about: 'Acerca de', contact: 'Contacto', network: 'Red', languageRegion: 'Idioma y Región',
        display: 'Pantalla', focus: 'Concentración', notifications: 'Notificaciones',
        machineName: 'Nombre del Equipo', summary: 'Resumen', email: 'Correo', phone: 'Teléfono',
        viewProfile: 'Ver Perfil', website: 'Sitio Web', region: 'Región', calendar: 'Calendario',
        status: 'Estado', available: 'Disponible',
        tutorialTitle: 'Bienvenido a mi Hoja de Vida Interactiva',
        tutorialSubtitle: 'Navega mi perfil profesional como si fuera macOS',
        tutorialSteps: [
            { icon: '🍎', title: 'Menú Apple', desc: 'Haz clic en  para ver mi resumen profesional' },
            { icon: '📁', title: 'Explorador CV', desc: 'Navega mi experiencia por empresa y proyecto' },
            { icon: '🖥', title: 'Terminal', desc: 'Escribe "skills", "experience" o "neofetch"' },
            { icon: '📝', title: 'Notas', desc: 'Lee mi educación, certificaciones y resumen de carrera' },
            { icon: '🌐', title: 'Portafolio', desc: 'Mira mi hoja de vida en línea en Safari' },
            { icon: '⚙️', title: 'Sobre Mí', desc: 'Info de contacto, idiomas y enlaces' },
        ],
        tutorialStart: 'Comenzar a Explorar',
        tutorialLang: 'Also available in English',
        aboutMeNote: '👋 Sobre Mí', educationNote: '🎓 Educación', certsNote: '☁️ Certificaciones',
        languagesNote: '🌐 Idiomas', careerNote: '💼 Resumen Profesional', profile: 'Perfil',
        certs: 'certs', roles: 'roles',
        terminalWelcome: 'Bienvenido a la Hoja de Vida Interactiva de Jhulian Ramírez',
        terminalHint: 'Escribe "help" para ver los comandos disponibles, o "neofetch" para una vista general.',
    }
};

// Resume data per language
const resumeData = {
    en: {
        title: 'Software Architect Developer',
        summary: 'Software architect with 10+ years of experience designing scalable architectures in .NET, Angular, and Azure. Specialist in generative AI and LangChain, I have led teams in digital transformation projects for companies like EPM, XM, and Ruta N, optimizing performance by up to 50% and establishing robust CI/CD pipelines. Certified in Azure, AWS, and Scrum with high English proficiency.',
        langs: [{ name: 'Spanish', level: 'Native' }, { name: 'English', level: 'C2 Proficient' }],
        skills: {
            'Languages': ['C#', 'TypeScript', 'JavaScript', 'Python'],
            'Backend': ['.NET', '.NET Core', 'Node.JS', 'NestJS'],
            'Frontend': ['Angular', 'React', 'HTML', 'CSS', 'Bootstrap'],
            'Databases': ['MongoDB', 'SQL Server', 'MySQL', 'Azure Cosmos DB'],
            'Cloud': ['Azure', 'AWS'],
            'Architecture': ['Microservices', 'Hexagonal Architecture', 'DDD', 'Clean Architecture'],
            'DevOps': ['Azure DevOps', 'Docker', 'Kubernetes', 'Rancher', 'Git'],
            'Testing': ['Unit Testing', 'Integration Testing', 'Functional Testing'],
            'Emerging Tech': ['AI/ML', 'LangChain', 'OpenAI', 'IoT', 'Blockchain'],
        },
        education: [{ degree: 'Software Engineer', institution: 'Politécnico Gran Colombiano', period: '2010 - 2014', icon: '🎓' }],
        certifications: [
            { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', date: 'May 2022', icon: '☁️' },
            { name: 'AWS Knowledge: Cloud Essentials', issuer: 'AWS', date: 'Oct 2025', icon: '☁️' },
            { name: 'AWS Partner: Foundations (Technical)', issuer: 'AWS', date: 'Jun 2021', icon: '☁️' },
            { name: 'Scrum Foundation Professional Certificate', issuer: 'CertiProf', date: 'Mar 2024', icon: '📋' },
            { name: 'EF SET English Certificate (C2 Proficient)', issuer: 'EF SET', date: 'Oct 2022', icon: '🌐' },
            { name: 'LangChain Course', issuer: 'Platzi', date: 'Mar 2025', icon: '🤖' },
            { name: 'Chatbot Development with OpenAI', issuer: 'Platzi', date: 'Mar 2025', icon: '🤖' },
            { name: 'Gen AI Project Strategy & Leadership', issuer: 'Platzi', date: 'Mar 2025', icon: '🤖' },
            { name: 'AI for Product Discovery & Design', issuer: 'Platzi', date: 'Mar 2025', icon: '🤖' },
            { name: 'Ethics & Data Management for AI', issuer: 'Platzi', date: 'Mar 2025', icon: '🤖' },
            { name: 'React.js Course', issuer: 'Platzi', date: 'Jul 2024', icon: '⚛️' },
            { name: 'Docker Course', issuer: 'Platzi', date: 'Sep 2022', icon: '🐳' },
            { name: 'Angular Fundamentals Course', issuer: 'Platzi', date: 'Sep 2022', icon: '🅰️' },
        ],
        experience: [
            { company: 'Asimetrix', role: 'Senior Software Architect', period: '06/2025 - Present', location: 'Colombia', project: 'SmartFarm', description: 'As a Senior Software Architect, I design and implement robust, scalable, and clean architectures applying modern paradigms such as DDD, Clean Architecture, and SOLID design patterns to foster maintainability and agility.', achievements: ['Integrate AI tools in the development lifecycle, reducing code review time by 30% through automated reviews and refactoring assistance', 'Lead technical mentorship for multidisciplinary teams in BI, ML, AI, and Data Engineering, improving code quality by 40%'], tech: ['.NET', 'Angular', 'Azure', 'AI/ML', 'DDD', 'Clean Architecture'] },
            { company: 'Ceiba Software', role: 'Architect Developer', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Ciudadano 360° - Ruta N', projectPeriod: '11/2024 - 05/2025', description: 'LLM-based conversational agent for citizen interaction with Medellín\'s city hall.', achievements: ['Designed and implemented LLM-based agent with LangChain, handling +10,000 monthly citizen queries', 'Integrated NestJS (backend) and React (frontend), reducing response time by 60%', 'Deployed on Azure with scalability and security, achieving 99.9% uptime'], tech: ['NestJS', 'React', 'LangChain', 'Azure'] },
            { company: 'Ceiba Software', role: 'Architect Developer', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'XM RPM', projectPeriod: '06/2023 - 11/2023', description: 'XML file management system for the energy sector.', achievements: ['Developed interfaces for XML file upload with real-time validation, processing +5,000 daily files', 'Implemented robust error handling, reducing corrupted data incidents by 80%', 'Optimized application performance achieving 50% improvement in load times'], tech: ['.NET', 'Angular', 'SQL Server'] },
            { company: 'Ceiba Software', role: 'Architect Developer', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Digital Credit Comfamiliar Risaralda', projectPeriod: '08/2022 - 05/2023', description: 'Digital credit platform for compensation fund with +500,000 affiliates.', achievements: ['Developed .NET/Angular digital credit platform, processing +2,000 monthly applications', 'Implemented hexagonal architecture reducing coupling and improving testability by 60%', 'Established CI/CD pipelines with Azure DevOps, reducing deployment time from 4h to 20min'], tech: ['.NET', 'Angular', 'Azure DevOps'] },
            { company: 'Ceiba Software', role: 'Architect Developer', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Two Speed Architecture - EPM', projectPeriod: '04/2021 - 08/2022', description: 'Modernization of critical applications for Colombia\'s leading public utilities company.', achievements: ['Implemented 4IR technologies (AI/IoT/Blockchain) for infrastructure asset management', 'Developed document management system handling +1M documents', 'Led modernization of 5 critical legacy applications to microservices architecture'], tech: ['.NET', 'Angular', 'AI', 'IoT', 'Blockchain'] },
            { company: 'Salud Mental Integral SAMEIN', role: 'IT Coordinator', period: '03/2015 - 02/2021', location: 'La Ceja, Colombia', project: 'Medisoft Medical System', projectPeriod: '03/2015 - 02/2021', description: 'Development and maintenance of hospital information system.', achievements: ['Developed clinical management modules (EHR, pharmacy, accounting) for +200 daily users', 'Managed network infrastructure and cybersecurity for 3 locations, achieving 0 critical security incidents', 'Implemented IP telephony system reducing communication costs by 40%'], tech: ['C#', '.NET', 'SQL Server'] },
            { company: 'Seguros Suramericana', role: 'Scrum Intern and Product Owner', period: '09/2014 - 02/2015', location: 'Medellín, Colombia', project: 'Life Annuity Management System', projectPeriod: '09/2014 - 02/2015', description: 'Product management for life annuity system.', achievements: ['Led development lifecycle as Product Owner, managing backlog of +50 user stories', 'Coordinated stakeholder requirements and deliverables for team of 8 developers'], tech: ['.NET', 'SQL Server', 'Scrum'] },
        ],
    },
    es: {
        title: 'Arquitecto Desarrollador',
        summary: 'Arquitecto de software con 10+ años de experiencia diseñando arquitecturas escalables en .NET, Angular y Azure. Especialista en IA generativa y LangChain, he liderado equipos en proyectos de transformación digital para empresas como EPM, XM y Ruta N, optimizando rendimiento hasta 50% y estableciendo pipelines CI/CD robustos. Certificado en Azure, AWS y Scrum con nivel de inglés alto.',
        langs: [{ name: 'Español', level: 'Nativo' }, { name: 'Inglés', level: 'C2 Proficient' }],
        skills: {
            'Lenguajes': ['C#', 'TypeScript', 'JavaScript', 'Python'],
            'Backend': ['.NET', '.NET Core', 'Node.JS', 'NestJS'],
            'Frontend': ['Angular', 'React', 'HTML', 'CSS', 'Bootstrap'],
            'Bases de Datos': ['MongoDB', 'SQL Server', 'MySQL', 'Azure Cosmos DB'],
            'Cloud': ['Azure', 'AWS'],
            'Arquitectura': ['Microservicios', 'Arquitectura Hexagonal', 'DDD', 'Clean Architecture'],
            'DevOps': ['Azure DevOps', 'Docker', 'Kubernetes', 'Rancher', 'Git'],
            'Testing': ['Pruebas Unitarias', 'Pruebas de Integración', 'Pruebas Funcionales'],
            'Tecnologías Emergentes': ['IA/ML', 'LangChain', 'OpenAI', 'IoT', 'Blockchain'],
        },
        education: [{ degree: 'Ingeniero de Software', institution: 'Politécnico Gran Colombiano', period: '2010 - 2014', icon: '🎓' }],
        certifications: [
            { name: 'Microsoft Certified: Azure Fundamentals', issuer: 'Microsoft', date: 'may. 2022', icon: '☁️' },
            { name: 'AWS Knowledge: Cloud Essentials', issuer: 'AWS', date: 'oct. 2025', icon: '☁️' },
            { name: 'AWS Partner: Foundations (Technical)', issuer: 'AWS', date: 'jun. 2021', icon: '☁️' },
            { name: 'Scrum Foundation Professional Certificate', issuer: 'CertiProf', date: 'mar. 2024', icon: '📋' },
            { name: 'EF SET English Certificate (C2 Proficient)', issuer: 'EF SET', date: 'oct. 2022', icon: '🌐' },
            { name: 'Curso de LangChain', issuer: 'Platzi', date: 'mar. 2025', icon: '🤖' },
            { name: 'Curso de Desarrollo de Chatbots con OpenAI', issuer: 'Platzi', date: 'mar. 2025', icon: '🤖' },
            { name: 'Curso de Estrategia y Liderazgo de Proyectos de Gen AI', issuer: 'Platzi', date: 'mar. 2025', icon: '🤖' },
            { name: 'Curso de IA para Product Discovery y Design', issuer: 'Platzi', date: 'mar. 2025', icon: '🤖' },
            { name: 'Curso de Ética y Manejo de Datos para IA', issuer: 'Platzi', date: 'mar. 2025', icon: '🤖' },
            { name: 'Curso de React.js', issuer: 'Platzi', date: 'jul. 2024', icon: '⚛️' },
            { name: 'Curso de Docker', issuer: 'Platzi', date: 'sept. 2022', icon: '🐳' },
            { name: 'Curso de Fundamentos de Angular', issuer: 'Platzi', date: 'sept. 2022', icon: '🅰️' },
        ],
        experience: [
            { company: 'Asimetrix', role: 'Arquitecto Senior de Software', period: '06/2025 - Presente', location: 'Colombia', project: 'SmartFarm', description: 'Como Arquitecto Senior de Software, diseño e implemento arquitecturas robustas, escalables y limpias aplicando paradigmas modernos como DDD, Clean Architecture y patrones de diseño SOLID.', achievements: ['Integro herramientas de IA en el ciclo de desarrollo, reduciendo tiempo de revisión de código en 30%', 'Lidero mentoría técnica a equipos multidisciplinarios en BI, ML, AI e Ingeniería de Datos, mejorando la calidad del código en 40%'], tech: ['.NET', 'Angular', 'Azure', 'AI/ML', 'DDD', 'Clean Architecture'] },
            { company: 'Ceiba Software', role: 'Arquitecto Desarrollador', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Ciudadano 360° - Ruta N', projectPeriod: '11/2024 - 05/2025', description: 'Agente conversacional basado en LLM para interacción ciudadana con la alcaldía de Medellín.', achievements: ['Diseñé e implementé agente basado en LLM con LangChain, atendiendo +10,000 consultas ciudadanas mensuales', 'Integré NestJS (backend) y React (frontend), reduciendo tiempo de respuesta en 60%', 'Desplegué en Azure con escalabilidad y seguridad, logrando 99.9% de uptime'], tech: ['NestJS', 'React', 'LangChain', 'Azure'] },
            { company: 'Ceiba Software', role: 'Arquitecto Desarrollador', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'XM RPM', projectPeriod: '06/2023 - 11/2023', description: 'Sistema de gestión de archivos XML para el sector energético.', achievements: ['Desarrollé interfaces para carga de archivos XML con validación en tiempo real, procesando +5,000 archivos diarios', 'Implementé manejo de errores robusto, reduciendo incidentes de datos corruptos en 80%', 'Optimicé rendimiento de aplicación logrando mejora del 50% en tiempos de carga'], tech: ['.NET', 'Angular', 'SQL Server'] },
            { company: 'Ceiba Software', role: 'Arquitecto Desarrollador', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Digital Credit Comfamiliar Risaralda', projectPeriod: '08/2022 - 05/2023', description: 'Plataforma de crédito digital para caja de compensación con +500,000 afiliados.', achievements: ['Desarrollé plataforma de crédito digital .NET/Angular, procesando +2,000 solicitudes mensuales', 'Implementé arquitectura hexagonal reduciendo acoplamiento y mejorando testabilidad en 60%', 'Establecí pipelines CI/CD con Azure DevOps, reduciendo tiempo de deployment de 4h a 20min'], tech: ['.NET', 'Angular', 'Azure DevOps'] },
            { company: 'Ceiba Software', role: 'Arquitecto Desarrollador', period: '03/2021 - 05/2025', location: 'Medellín, Colombia', project: 'Two Speed Architecture - EPM', projectPeriod: '04/2021 - 08/2022', description: 'Modernización de aplicaciones críticas para empresa de servicios públicos líder en Colombia.', achievements: ['Implementé tecnologías 4RI (IA/IoT/Blockchain) para gestión de activos de infraestructura', 'Desarrollé sistema de gestión documental manejando +1M de documentos', 'Lideré modernización de 5 aplicaciones críticas legacy a arquitectura de microservicios'], tech: ['.NET', 'Angular', 'AI', 'IoT', 'Blockchain'] },
            { company: 'Salud Mental Integral SAMEIN', role: 'Coordinador de TI', period: '03/2015 - 02/2021', location: 'La Ceja, Colombia', project: 'Sistema Médico Medisoft', projectPeriod: '03/2015 - 02/2021', description: 'Desarrollo y mantenimiento del sistema de información hospitalario.', achievements: ['Desarrollé módulos de gestión clínica (HCE, farmacia, contabilidad) para +200 usuarios diarios', 'Gestioné infraestructura de red y ciberseguridad para 3 sedes, logrando 0 incidentes de seguridad críticos', 'Implementé sistema de telefonía IP reduciendo costos de comunicación en 40%'], tech: ['C#', '.NET', 'SQL Server'] },
            { company: 'Seguros Suramericana', role: 'Practicante Scrum y Product Owner', period: '09/2014 - 02/2015', location: 'Medellín, Colombia', project: 'Sistema de Gestión de Rentas Vitalicias', projectPeriod: '09/2014 - 02/2015', description: 'Gestión de producto para sistema de rentas vitalicias.', achievements: ['Lideré ciclo de vida del desarrollo como Product Owner, gestionando backlog de +50 historias de usuario', 'Coordiné requisitos de stakeholders y entregables del equipo de 8 desarrolladores'], tech: ['.NET', 'SQL Server', 'Scrum'] },
        ],
    }
};

const profileBase = {
    name: 'Jhulian Ramírez',
    location: 'La Ceja, Antioquia, Colombia',
    email: 'ramirezjhulian7@gmail.com',
    phone: '+57 321 884 5427',
    linkedin: 'https://www.linkedin.com/in/jhulianramirez/',
    website: 'https://jhulian-resume.web.app/',
};

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');
    const t = (key) => ui[lang]?.[key] ?? ui.en[key] ?? key;
    const data = resumeData[lang];
    const profile = { ...profileBase, title: data.title, summary: data.summary, languages: data.langs };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, data, profile }}>
            {children}
        </LanguageContext.Provider>
    );
};
