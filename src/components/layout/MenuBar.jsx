import React, { useState, useEffect, useRef } from 'react';
import { Wifi, Battery, Search, Globe } from 'lucide-react';
import AboutMac from '../apps/AboutMac';
import { useLanguage } from '../../context/LanguageContext';

const MenuBar = () => {
    const { t, lang, setLang } = useLanguage();
    const [time, setTime] = useState(new Date());
    const [showAbout, setShowAbout] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const onClick = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenu(null);
        };
        document.addEventListener('mousedown', onClick);
        return () => document.removeEventListener('mousedown', onClick);
    }, []);

    const formatTime = (date) => date.toLocaleTimeString(lang === 'es' ? 'es-CO' : 'en-US', {
        hour: '2-digit', minute: '2-digit', weekday: 'short', month: 'short', day: 'numeric'
    });

    const menus = {
        [t('file')]: [
            { label: lang === 'es' ? 'Nueva ventana' : 'New Window', shortcut: '⌘N' },
            { label: lang === 'es' ? 'Cerrar ventana' : 'Close Window', shortcut: '⌘W' },
        ],
        [t('edit')]: [
            { label: lang === 'es' ? 'Deshacer' : 'Undo', shortcut: '⌘Z' },
            { label: lang === 'es' ? 'Rehacer' : 'Redo', shortcut: '⇧⌘Z' },
            { divider: true },
            { label: lang === 'es' ? 'Cortar' : 'Cut', shortcut: '⌘X' },
            { label: lang === 'es' ? 'Copiar' : 'Copy', shortcut: '⌘C' },
            { label: lang === 'es' ? 'Pegar' : 'Paste', shortcut: '⌘V' },
        ],
        [t('view')]: [
            { label: lang === 'es' ? 'Pantalla completa' : 'Full Screen', shortcut: '⌃⌘F' },
            { label: lang === 'es' ? 'Ocultar barra lateral' : 'Hide Sidebar', shortcut: '⌘S' },
        ],
        [t('go')]: [
            { label: lang === 'es' ? 'Escritorio' : 'Desktop' },
            { label: lang === 'es' ? 'Documentos' : 'Documents' },
            { label: lang === 'es' ? 'Descargas' : 'Downloads' },
        ],
        [t('help')]: [
            { label: lang === 'es' ? 'Guía interactiva' : 'Interactive Guide', action: () => { localStorage.removeItem('mac_tutorial_seen'); window.location.reload(); } },
            { label: 'LinkedIn', action: () => window.open('https://www.linkedin.com/in/jhulianramirez/', '_blank') },
        ],
    };

    return (
        <>
            <div className="menu-bar" ref={menuRef}>
                <div className="menu-bar-left">
                    <div className="menu-bar-item menu-bar-logo" onClick={() => setShowAbout(true)}></div>
                    <div className="menu-bar-item" style={{ fontWeight: 700 }}>{t('finder')}</div>
                    {Object.keys(menus).map(label => (
                        <div key={label} style={{ position: 'relative' }}>
                            <div
                                className={`menu-bar-item${openMenu === label ? ' menu-active' : ''}`}
                                onClick={() => setOpenMenu(openMenu === label ? null : label)}
                            >{label}</div>
                            {openMenu === label && (
                                <div className="menu-dropdown">
                                    {menus[label].map((item, i) => (
                                        item.divider
                                            ? <div key={i} className="menu-dropdown-divider" />
                                            : <div key={i} className="menu-dropdown-item" onClick={() => { setOpenMenu(null); item.action?.(); }}>
                                                <span>{item.label}</span>
                                                {item.shortcut && <span className="menu-dropdown-shortcut">{item.shortcut}</span>}
                                            </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="menu-bar-right">
                    <div className="menu-bar-item" onClick={() => setLang(lang === 'en' ? 'es' : 'en')} title={lang === 'en' ? 'Cambiar a Español' : 'Switch to English'}>
                        <Globe size={14} />
                        <span style={{ fontSize: 11, marginLeft: 3, fontWeight: 600 }}>{lang.toUpperCase()}</span>
                    </div>
                    <div className="menu-bar-item"><Search size={14} /></div>
                    <div className="menu-bar-item"><Wifi size={14} /></div>
                    <div className="menu-bar-item"><Battery size={14} /></div>
                    <div className="menu-bar-item">{formatTime(time)}</div>
                </div>
            </div>
            {showAbout && <AboutMac onClose={() => setShowAbout(false)} />}
        </>
    );
};

export default MenuBar;
