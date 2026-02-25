import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const STORAGE_KEY = 'mac_resume_notes_v3';

const Notes = () => {
    const { t, data, profile } = useLanguage();

    const buildDefaultNotes = () => [
        { id: 1, title: t('aboutMeNote'), content: `${profile.name}\n${profile.title}\n\n${profile.summary}\n\n📍 ${profile.location}\n📧 ${profile.email}\n📱 ${profile.phone}\n🔗 ${profile.linkedin}`, date: t('profile') },
        { id: 2, title: t('educationNote'), content: data.education.map(e => `${e.icon} ${e.degree}\n   ${e.institution}\n   ${e.period}`).join('\n\n'), date: t('resume') },
        { id: 3, title: t('certsNote'), content: data.certifications.map(c => `${c.icon} ${c.name}\n   ${c.issuer} · ${c.date}`).join('\n\n'), date: `${data.certifications.length} ${t('certs')}` },
        { id: 4, title: t('languagesNote'), content: profile.languages.map(l => `• ${l.name} — ${l.level}`).join('\n'), date: t('resume') },
        { id: 5, title: t('careerNote'), content: data.experience.map(job => `${job.company} — ${job.role}\n${job.project} (${job.projectPeriod || job.period})\n${job.achievements[0]}`).join('\n\n─────────────────────\n\n'), date: `${data.experience.length} ${t('roles')}` },
    ];

    const [notes, setNotes] = useState(() => {
        try { const saved = localStorage.getItem(STORAGE_KEY); if (saved) return JSON.parse(saved); } catch { }
        return buildDefaultNotes();
    });
    const [activeNote, setActiveNote] = useState(notes[0]?.id || null);

    useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(notes)); }, [notes]);

    const currentNote = notes.find(n => n.id === activeNote);

    return (
        <div className="notes-app">
            <div className="notes-sidebar">
                <div className="notes-sidebar-header">
                    <button className="notes-sidebar-btn" onClick={() => { const n = { id: Date.now(), title: 'New Note', content: '', date: new Date().toLocaleDateString() }; setNotes([n, ...notes]); setActiveNote(n.id); }} title="New Note"><Plus size={18} /></button>
                    {activeNote && <button className="notes-sidebar-btn delete" onClick={() => { const nw = notes.filter(n => n.id !== activeNote); setNotes(nw); setActiveNote(nw[0]?.id || null); }} title="Delete"><Trash2 size={16} /></button>}
                </div>
                <div className="notes-list">
                    {notes.map(note => (
                        <div key={note.id} className={`notes-list-item${activeNote === note.id ? ' active' : ''}`} onClick={() => setActiveNote(note.id)}>
                            <div className="notes-list-item-title">{note.title || 'New Note'}</div>
                            <div className="notes-list-item-date">{note.date}</div>
                        </div>
                    ))}
                </div>
            </div>
            {currentNote ? (
                <div className="notes-editor">
                    <div className="notes-editor-date">{currentNote.date}</div>
                    <input className="notes-editor-title" value={currentNote.title} onChange={(e) => setNotes(notes.map(n => n.id === activeNote ? { ...n, title: e.target.value } : n))} placeholder="Title" />
                    <textarea className="notes-editor-content" value={currentNote.content} onChange={(e) => setNotes(notes.map(n => n.id === activeNote ? { ...n, content: e.target.value } : n))} placeholder="Start typing..." autoFocus />
                </div>
            ) : (
                <div className="notes-empty">Select or create a note</div>
            )}
        </div>
    );
};

export default Notes;
