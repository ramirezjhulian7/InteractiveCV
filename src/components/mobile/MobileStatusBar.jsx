import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const MobileStatusBar = () => {
    const { lang, setLang } = useLanguage();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (d) => d.toLocaleTimeString(lang === 'es' ? 'es-CO' : 'en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return (
        <div className="mobile-status-bar">
            <div className="mobile-status-left">
                <span className="mobile-status-time">{formatTime(time)}</span>
            </div>
            <div className="mobile-status-notch" />
            <div className="mobile-status-right">
                <span className="mobile-lang-toggle" onClick={() => setLang(lang === 'en' ? 'es' : 'en')}>
                    {lang.toUpperCase()}
                </span>
                <Signal size={14} />
                <Wifi size={14} />
                <Battery size={14} />
            </div>
        </div>
    );
};

export default MobileStatusBar;
