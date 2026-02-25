import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { education, certifications, profile, experience } from '../../data/resumeData';

const buildDefaultNotes = () => [
    {
        id: 1,
        title: '👋 About Me',
        content: `${profile.name}\n${profile.title}\n\n${profile.summary}\n\n📍 ${profile.location}\n📧 ${profile.email}\n📱 ${profile.phone}\n🔗 ${profile.linkedin}`,
        date: 'Profile',
    },
    {
        id: 2,
        title: '🎓 Education',
        content: education.map(e => `${e.icon} ${e.degree}\n   ${e.institution}\n   ${e.period}`).join('\n\n'),
        date: 'Resume',
    },
    {
        id: 3,
        title: '☁️ Certifications',
        content: certifications.map(c => `${c.icon} ${c.name}\n   ${c.issuer} · ${c.date}`).join('\n\n'),
        date: `${certifications.length} certs`,
    },
    {
        id: 4,
        title: '🌐 Languages',
        content: profile.languages.map(l => `• ${l.name} — ${l.level}`).join('\n'),
        date: 'Resume',
    },
    {
        id: 5,
        title: '💼 Career Summary',
        content: experience.map(job =>
            `${job.company} — ${job.role}\n${job.project} (${job.projectPeriod || job.period})\n${job.achievements[0]}`
        ).join('\n\n─────────────────────\n\n'),
        date: `${experience.length} roles`,
    },
];

const STORAGE_KEY = 'mac_resume_notes_v2';

const Notes = () => {
    const [notes, setNotes] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) return JSON.parse(saved);
        } catch { }
        return buildDefaultNotes();
    });
    const [activeNote, setActiveNote] = useState(notes[0]?.id || null);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    }, [notes]);

    const currentNote = notes.find(n => n.id === activeNote);

    const handleAddNote = () => {
        const newNote = { id: Date.now(), title: 'New Note', content: '', date: new Date().toLocaleDateString() };
        setNotes([newNote, ...notes]);
        setActiveNote(newNote.id);
    };

    const handleUpdateNote = (field, value) => {
        setNotes(notes.map(n => n.id === activeNote ? { ...n, [field]: value } : n));
    };

    const handleDelete = () => {
        const newNotes = notes.filter(n => n.id !== activeNote);
        setNotes(newNotes);
        setActiveNote(newNotes[0]?.id || null);
    };

    return (
        <div className="notes-app">
            <div className="notes-sidebar">
                <div className="notes-sidebar-header">
                    <button className="notes-sidebar-btn" onClick={handleAddNote} title="New Note"><Plus size={18} /></button>
                    {activeNote && <button className="notes-sidebar-btn delete" onClick={handleDelete} title="Delete"><Trash2 size={16} /></button>}
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
                    <input className="notes-editor-title" value={currentNote.title} onChange={(e) => handleUpdateNote('title', e.target.value)} placeholder="Title" />
                    <textarea className="notes-editor-content" value={currentNote.content} onChange={(e) => handleUpdateNote('content', e.target.value)} placeholder="Start typing..." autoFocus />
                </div>
            ) : (
                <div className="notes-empty">Select or create a note</div>
            )}
        </div>
    );
};

export default Notes;
