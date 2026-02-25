import React, { useState } from 'react';
import { Wifi, Monitor, Moon, Bell, Globe, User, Mail, Phone, MapPin, ExternalLink, Linkedin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const SettingsApp = () => {
    const { t, profile, data } = useLanguage();
    const [active, setActive] = useState('about');

    const sections = [
        { id: 'about', label: t('about'), icon: <User size={16} />, bg: '#636366' },
        { id: 'contact', label: t('contact'), icon: <Mail size={16} />, bg: '#007aff' },
        { id: 'network', label: t('network'), icon: <Wifi size={16} />, bg: '#34c759' },
        { id: 'language', label: t('languageRegion'), icon: <Globe size={16} />, bg: '#af52de' },
        { id: 'display', label: t('display'), icon: <Monitor size={16} />, bg: '#8e8e93' },
        { id: 'focus', label: t('focus'), icon: <Moon size={16} />, bg: '#5856d6' },
        { id: 'notifications', label: t('notifications'), icon: <Bell size={16} />, bg: '#ff3b30' },
    ];

    const renderContent = () => {
        switch (active) {
            case 'about':
                return (<>
                    <div className="settings-section-title">{t('about')}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24, background: 'rgba(255,255,255,0.04)', borderRadius: 12, padding: 20, border: '1px solid rgba(255,255,255,0.06)' }}>
                        <img src="/profile.jpeg" alt={profile.name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, boxShadow: '0 2px 12px rgba(0,0,0,0.3)', border: '2px solid rgba(255,255,255,0.1)' }} />
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 700, color: '#fff' }}>{profile.name}</div>
                            <div style={{ fontSize: 14, color: '#3b82f6', marginTop: 2 }}>{profile.title}</div>
                            <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{profile.location}</div>
                        </div>
                    </div>
                    <div className="settings-row"><span className="settings-row-label">{t('machineName')}</span><span className="settings-row-value">MacBook Pro de Jhulian</span></div>
                    <div className="settings-row"><span className="settings-row-label">macOS</span><span className="settings-row-value">JhulianOS 1.0</span></div>
                    <div className="settings-row"><span className="settings-row-label">{t('summary')}</span><span className="settings-row-value" style={{ maxWidth: 350, textAlign: 'right', lineHeight: 1.5 }}>{profile.summary}</span></div>
                </>);
            case 'contact':
                return (<>
                    <div className="settings-section-title">{t('contact')}</div>
                    <div className="settings-row"><span className="settings-row-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Mail size={16} color="#3b82f6" /> {t('email')}</span><span className="settings-row-value">{profile.email}</span></div>
                    <div className="settings-row"><span className="settings-row-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Phone size={16} color="#34c759" /> {t('phone')}</span><span className="settings-row-value">{profile.phone}</span></div>
                    <div className="settings-row"><span className="settings-row-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><MapPin size={16} color="#ff9500" /> {t('location')}</span><span className="settings-row-value">{profile.location}</span></div>
                    <div className="settings-row"><span className="settings-row-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Linkedin size={16} color="#0077b5" /> LinkedIn</span><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontSize: 13, display: 'flex', alignItems: 'center', gap: 4 }}>{t('viewProfile')} <ExternalLink size={12} /></a></div>
                    <div className="settings-row"><span className="settings-row-label" style={{ display: 'flex', alignItems: 'center', gap: 8 }}><ExternalLink size={16} color="#8e8e93" /> {t('website')}</span><a href={profile.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', fontSize: 13 }}>{profile.website}</a></div>
                </>);
            case 'language':
                return (<>
                    <div className="settings-section-title">{t('languageRegion')}</div>
                    {profile.languages.map((lang, i) => (
                        <div key={i} className="settings-row"><span className="settings-row-label">{lang.name}</span><span className="settings-row-value">{lang.level}</span></div>
                    ))}
                    <div className="settings-row"><span className="settings-row-label">{t('region')}</span><span className="settings-row-value">Colombia</span></div>
                    <div className="settings-row"><span className="settings-row-label">{t('calendar')}</span><span className="settings-row-value">Gregorian</span></div>
                </>);
            default:
                return (<><div className="settings-section-title">{sections.find(s => s.id === active)?.label}</div>
                    <div className="settings-row"><span className="settings-row-label">{t('status')}</span><span className="settings-row-value">{t('available')}</span></div></>);
        }
    };

    return (
        <div className="settings-app">
            <div className="settings-sidebar">
                {sections.map(s => (
                    <div key={s.id} className={`settings-sidebar-item${active === s.id ? ' active' : ''}`} onClick={() => setActive(s.id)}>
                        <div className="settings-sidebar-icon" style={{ background: s.bg, color: '#fff' }}>{s.icon}</div>{s.label}
                    </div>
                ))}
            </div>
            <div className="settings-main">{renderContent()}</div>
        </div>
    );
};

export default SettingsApp;
