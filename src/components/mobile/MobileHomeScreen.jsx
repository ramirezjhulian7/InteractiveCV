import React from 'react';
import { Compass, Terminal as TerminalIcon, FileText, Grid3X3, Gamepad2, User, FolderOpen, Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const AppIcon = ({ bg, icon, label, onClick }) => (
    <div className="mobile-app-icon" onClick={onClick}>
        <div className="mobile-app-icon-img" style={{ background: bg }}>
            {icon}
        </div>
        <div className="mobile-app-icon-label">{label}</div>
    </div>
);

const MobileHomeScreen = ({ onOpenApp }) => {
    const { t, profile } = useLanguage();
    const BASE = import.meta.env.BASE_URL;

    const apps = [
        { id: 'finder', name: t('resumeExplorer'), bg: 'linear-gradient(135deg, #1c92d2, #4bb8f0)', icon: <FolderOpen size={28} color="#fff" /> },
        { id: 'safari', name: t('portfolio'), bg: 'linear-gradient(135deg, #006aff, #00c6ff)', icon: <Compass size={30} color="#fff" /> },
        { id: 'terminal', name: t('terminal'), bg: 'linear-gradient(135deg, #1e1e1e, #3a3a3a)', icon: <TerminalIcon size={26} color="#4af626" /> },
        { id: 'notes', name: t('notes'), bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', icon: <FileText size={26} color="#fff" /> },
        { id: 'settings', name: t('aboutMe'), bg: 'linear-gradient(135deg, #667eea, #764ba2)', icon: <User size={26} color="#fff" /> },
        { id: 'tic-tac-toe', name: t('ticTacToe'), bg: 'linear-gradient(135deg, #10b981, #059669)', icon: <Grid3X3 size={28} color="#fff" /> },
        { id: 'snake', name: t('snake'), bg: 'linear-gradient(135deg, #ef4444, #dc2626)', icon: <Gamepad2 size={28} color="#fff" /> },
    ];

    const dockApps = apps.slice(0, 4);

    return (
        <div className="mobile-home">
            {/* Profile widget */}
            <div className="mobile-profile-widget">
                <img src={`${BASE}profile.jpeg`} alt={profile.name} className="mobile-profile-img" />
                <div className="mobile-profile-info">
                    <div className="mobile-profile-name">{profile.name}</div>
                    <div className="mobile-profile-title">{profile.title}</div>
                    <div className="mobile-profile-location">📍 {profile.location}</div>
                </div>
            </div>

            {/* App grid */}
            <div className="mobile-app-grid">
                {apps.map(app => (
                    <AppIcon key={app.id} bg={app.bg} icon={app.icon} label={app.name} onClick={() => onOpenApp(app.id)} />
                ))}
            </div>

            {/* Bottom dock */}
            <div className="mobile-dock">
                {dockApps.map(app => (
                    <div key={app.id} className="mobile-dock-icon" onClick={() => onOpenApp(app.id)}>
                        <div className="mobile-app-icon-img" style={{ background: app.bg }}>
                            {app.icon}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MobileHomeScreen;
