import React, { useState } from 'react';
import { Folder, Briefcase, Code, GraduationCap, ChevronRight, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const Finder = () => {
    const { t, data } = useLanguage();
    const [activeSection, setActiveSection] = useState('experience');
    const [nav, setNav] = useState({ level: 'companies' });

    // Group experiences by company
    const grouped = data.experience.reduce((acc, job) => {
        const existing = acc.find(g => g.company === job.company);
        if (existing) { existing.projects.push(job); }
        else { acc.push({ company: job.company, role: job.role, period: job.period, location: job.location, projects: [job] }); }
        return acc;
    }, []);

    const sidebar = [
        { key: 'experience', label: t('experience'), icon: <Briefcase size={16} /> },
        { key: 'skills', label: t('skills'), icon: <Code size={16} /> },
        { key: 'education', label: t('education'), icon: <GraduationCap size={16} /> },
    ];

    const BackBtn = ({ onClick, label }) => (
        <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', color: '#3b82f6', fontSize: 13, marginBottom: 16 }}>
            <ArrowLeft size={14} /> {label}
        </div>
    );

    const renderExperience = () => {
        if (nav.level === 'detail') {
            const company = grouped[nav.companyIdx];
            const job = company.projects[nav.projectIdx];
            return (
                <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
                    <BackBtn onClick={() => setNav({ level: 'projects', companyIdx: nav.companyIdx })} label={company.company} />
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{job.project}</div>
                    <div style={{ fontSize: 13, color: '#3b82f6', marginBottom: 2 }}>{job.role} — {job.company}</div>
                    {job.projectPeriod && <div style={{ fontSize: 12, color: '#888', marginBottom: 4 }}>{job.projectPeriod}</div>}
                    <div style={{ fontSize: 13, color: '#aaa', marginBottom: 16, lineHeight: 1.5 }}>{job.description}</div>
                    <div style={{ fontSize: 12, color: '#666', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('keyAchievements')}</div>
                    {job.achievements.map((a, i) => (
                        <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, fontSize: 13, color: '#ccc', lineHeight: 1.5 }}>
                            <span style={{ color: '#4ade80', flexShrink: 0 }}>▸</span><span>{a}</span>
                        </div>
                    ))}
                    <div style={{ fontSize: 12, color: '#666', fontWeight: 700, marginTop: 18, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{t('techStack')}</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {job.tech.map((te, i) => (
                            <span key={i} style={{ background: 'rgba(59,130,246,0.15)', color: '#60a5fa', padding: '3px 10px', borderRadius: 12, fontSize: 12, fontWeight: 500 }}>{te}</span>
                        ))}
                    </div>
                </div>
            );
        }
        if (nav.level === 'projects') {
            const company = grouped[nav.companyIdx];
            return (
                <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
                    <BackBtn onClick={() => setNav({ level: 'companies' })} label={t('companies')} />
                    <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{company.company}</div>
                    <div style={{ fontSize: 13, color: '#3b82f6', marginBottom: 2 }}>{company.role}</div>
                    <div style={{ fontSize: 12, color: '#888', marginBottom: 20 }}>{company.period} · {company.location}</div>
                    <div className="finder-main">
                        {company.projects.map((proj, i) => (
                            <div key={i} className="finder-item" onClick={() => setNav({ level: 'detail', companyIdx: nav.companyIdx, projectIdx: i })}>
                                <div className="finder-item-icon"><Folder size={48} color="#fbbf24" fill="rgba(251,191,36,0.15)" /></div>
                                <div className="finder-item-name">{proj.project}</div>
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        return (
            <div className="finder-main">
                {grouped.map((group, i) => (
                    <div key={i} className="finder-item" onClick={() => setNav({ level: 'projects', companyIdx: i })}>
                        <div className="finder-item-icon"><Folder size={48} color="#3b82f6" fill="rgba(59,130,246,0.15)" /></div>
                        <div className="finder-item-name">{group.company}</div>
                    </div>
                ))}
            </div>
        );
    };

    const renderSkills = () => (
        <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
            {Object.entries(data.skills).map(([category, items]) => (
                <div key={category} style={{ marginBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <ChevronRight size={14} color="#3b82f6" />{category}
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, paddingLeft: 20 }}>
                        {items.map((skill, i) => (
                            <span key={i} style={{ background: 'rgba(255,255,255,0.08)', color: '#ccc', padding: '4px 12px', borderRadius: 14, fontSize: 12, fontWeight: 500, border: '1px solid rgba(255,255,255,0.1)' }}>{skill}</span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderEducation = () => (
        <div style={{ padding: 20, overflowY: 'auto', height: '100%' }}>
            <div style={{ fontSize: 12, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 12 }}>{t('education')}</div>
            {data.education.map((edu, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 10, padding: 16, marginBottom: 12, border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>{edu.icon} {edu.degree}</div>
                    <div style={{ fontSize: 13, color: '#3b82f6', marginTop: 2 }}>{edu.institution}</div>
                    <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{edu.period}</div>
                </div>
            ))}
            <div style={{ fontSize: 12, color: '#666', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 24, marginBottom: 12 }}>{t('certifications')} ({data.certifications.length})</div>
            {data.certifications.map((cert, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.06)', fontSize: 13, color: '#ccc' }}>
                    <span style={{ fontSize: 16 }}>{cert.icon}</span>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500 }}>{cert.name}</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{cert.issuer} · {cert.date}</div>
                    </div>
                </div>
            ))}
        </div>
    );

    return (
        <div className="finder-app">
            <div className="finder-sidebar">
                <div className="finder-sidebar-heading">{t('resume')}</div>
                {sidebar.map(s => (
                    <div key={s.key} className={`finder-sidebar-item${activeSection === s.key ? ' active' : ''}`}
                        onClick={() => { setActiveSection(s.key); setNav({ level: 'companies' }); }}>
                        <span style={{ color: '#3b82f6', display: 'flex' }}>{s.icon}</span>{s.label}
                    </div>
                ))}
            </div>
            <div style={{ flex: 1, background: '#1e1e1e', overflowY: 'auto' }}>{({ experience: renderExperience, skills: renderSkills, education: renderEducation })[activeSection]()}</div>
        </div>
    );
};

export default Finder;
