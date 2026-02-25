import React, { useState } from 'react';
import { Search, ChevronLeft, ChevronRight, RotateCw, Lock, ExternalLink } from 'lucide-react';
import { profile } from '../../data/resumeData';

const BOOKMARKS = [
    { label: 'My Resume', url: profile.website },
    { label: 'LinkedIn ↗', url: profile.linkedin, external: true },
];

const Safari = () => {
    const [url, setUrl] = useState(profile.website);
    const [input, setInput] = useState(profile.website);

    const handleSearch = (e) => {
        e.preventDefault();
        let finalUrl = input;
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = 'https://' + finalUrl;
        }
        setUrl(finalUrl);
        setInput(finalUrl);
    };

    return (
        <div className="safari-app">
            {/* Bookmarks Bar */}
            <div style={{
                display: 'flex', alignItems: 'center', gap: 8, padding: '4px 12px',
                background: '#f0f0f0', borderBottom: '1px solid #d0d0d0', fontSize: 12, flexShrink: 0,
            }}>
                {BOOKMARKS.map((bm, i) => (
                    <button key={i} onClick={() => {
                        if (bm.external) {
                            window.open(bm.url, '_blank');
                        } else {
                            setUrl(bm.url);
                            setInput(bm.url);
                        }
                    }} style={{
                        padding: '3px 10px', borderRadius: 4, border: '1px solid #ccc',
                        background: '#fff', cursor: 'pointer', fontSize: 11, fontWeight: 500,
                        color: '#333', display: 'flex', alignItems: 'center', gap: 4,
                    }}>
                        {bm.label} {bm.external && <ExternalLink size={10} />}
                    </button>
                ))}
            </div>
            {/* Toolbar */}
            <div className="safari-toolbar">
                <div className="safari-nav-btns">
                    <button className="safari-nav-btn"><ChevronLeft size={16} /></button>
                    <button className="safari-nav-btn"><ChevronRight size={16} /></button>
                </div>
                <form onSubmit={handleSearch} className="safari-url-bar">
                    <Lock size={12} color="#999" />
                    <input type="text" className="safari-url-input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search or enter website name" />
                </form>
                <button className="safari-nav-btn" onClick={() => { setUrl(url + ''); }}><RotateCw size={14} /></button>
            </div>
            {/* Content */}
            <div className="safari-content">
                <iframe src={url} title="Safari Browser" sandbox="allow-scripts allow-same-origin allow-forms" />
            </div>
        </div>
    );
};

export default Safari;
