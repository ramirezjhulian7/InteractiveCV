import React, { useState, useEffect } from 'react';
import { Wifi, Battery, Search } from 'lucide-react';
import AboutMac from '../apps/AboutMac';

const MenuBar = () => {
    const [time, setTime] = useState(new Date());
    const [showAbout, setShowAbout] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], {
            hour: '2-digit', minute: '2-digit',
            weekday: 'short', month: 'short', day: 'numeric'
        });
    };

    return (
        <>
            <div className="menu-bar">
                <div className="menu-bar-left">
                    <div className="menu-bar-item menu-bar-logo" onClick={() => setShowAbout(true)}></div>
                    <div className="menu-bar-item" style={{ fontWeight: 700 }}>Finder</div>
                    <div className="menu-bar-item">File</div>
                    <div className="menu-bar-item">Edit</div>
                    <div className="menu-bar-item">View</div>
                    <div className="menu-bar-item">Go</div>
                    <div className="menu-bar-item">Window</div>
                    <div className="menu-bar-item">Help</div>
                </div>
                <div className="menu-bar-right">
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
