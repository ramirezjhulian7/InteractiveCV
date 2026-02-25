import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const AboutMac = ({ onClose }) => {
    const { t, profile } = useLanguage();
    return (
        <div style={{
            position: 'fixed', inset: 0, zIndex: 99999,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
        }} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} style={{
                width: 340, background: '#2d2d2f', borderRadius: 14,
                boxShadow: '0 24px 80px rgba(0,0,0,0.6)', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.1)',
                textAlign: 'center', padding: '28px 28px 24px', color: '#fff',
            }}>
                <img src="/profile.jpeg" alt={profile.name} style={{
                    width: 90, height: 90, borderRadius: '50%', margin: '0 auto 16px',
                    objectFit: 'cover', boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
                    border: '3px solid rgba(255,255,255,0.15)',
                }} />
                <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 2 }}>{profile.name}</div>
                <div style={{ fontSize: 13, color: '#3b82f6', fontWeight: 600, marginBottom: 16 }}>{profile.title}</div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '0 0 14px' }} />
                <div style={{ textAlign: 'left', fontSize: 12, lineHeight: 2 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#999' }}>macOS</span><span style={{ color: '#ccc' }}>JhulianOS 1.0</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#999' }}>{t('location')}</span><span style={{ color: '#ccc' }}>{profile.location}</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#999' }}>{t('specialties')}</span><span style={{ color: '#ccc' }}>Angular · .NET · AI</span></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ color: '#999' }}>{t('languages')}</span><span style={{ color: '#ccc' }}>{profile.languages.map(l => l.name).join(', ')}</span></div>
                </div>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '14px 0' }} />
                <div style={{ fontSize: 11, color: '#888', lineHeight: 1.6, marginBottom: 16 }}>{profile.summary}</div>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'center' }}>
                    <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(59,130,246,0.15)', color: '#60a5fa', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(59,130,246,0.3)' }}>LinkedIn</a>
                    <a href={`mailto:${profile.email}`} style={{ padding: '6px 16px', borderRadius: 6, background: 'rgba(255,255,255,0.06)', color: '#ccc', fontSize: 12, fontWeight: 600, textDecoration: 'none', border: '1px solid rgba(255,255,255,0.1)' }}>Email</a>
                </div>
            </div>
        </div>
    );
};

export default AboutMac;
