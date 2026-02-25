import React, { useState, useRef, useEffect } from 'react';
import { profile, skills, experience, education, certifications } from '../../data/resumeData';

const NEOFETCH = `
                    'c.          ${profile.name}
                 ,xNMM.         ─────────────────────────
               .OMMMMo          Title: ${profile.title}
               OMMM0,           Location: ${profile.location}
     .;loddo:' loolloddol;.     Email: ${profile.email}
   cKMMMMMMMMMMNWMMMMMMMMMM0:   Phone: ${profile.phone}
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.   LinkedIn: linkedin.com/in/jhulianramirez
 XMMMMMMMMMMMMMMMMMMMMMMMX.    ─────────────────────────
;MMMMMMMMMMMMMMMMMMMMMMMM:     Languages: ${profile.languages.map(l => `${l.name} (${l.level})`).join(', ')}
:MMMMMMMMMMMMMMMMMMMMMMMM:     Frontend: Angular, React, HTML, CSS
.MMMMMMMMMMMMMMMMMMMMMMMMX.    Backend: .NET, Node.js, NestJS
 kMMMMMMMMMMMMMMMMMMMMMMMMWd.  Cloud: Azure, AWS, Kubernetes
 .XMMMMMMMMMMMMMMMMMMMMMMMMk   Architecture: Microservices, DDD, Clean
  .XMMMMMMMMMMMMMMMMMMMMK.     Emerging: AI/ML, LangChain, IoT
    kMMMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMMMMMk.
       .cooc,.    .,coo:.
`;

const formatSkills = () => {
    return Object.entries(skills).map(([cat, items]) =>
        `  ${cat}: ${items.join(', ')}`
    ).join('\n');
};

const formatExperience = () => {
    return experience.map(job =>
        `\n  ┌─ ${job.role} @ ${job.company}\n  │  ${job.period} · ${job.location}\n  │  ${job.achievements[0]}\n  └─ Tech: ${job.tech.join(', ')}`
    ).join('\n');
};

const formatEducation = () => {
    const edu = education.map(e => `  ${e.degree} — ${e.institution} (${e.period})`).join('\n');
    const certs = certifications.map(c => `  ✓ ${c}`).join('\n');
    return `Education:\n${edu}\n\nCertifications:\n${certs}`;
};

const formatContact = () => {
    return `  Name:     ${profile.name}
  Title:    ${profile.title}
  Email:    ${profile.email}
  Phone:    ${profile.phone}
  LinkedIn: ${profile.linkedin}
  Website:  ${profile.website}
  Location: ${profile.location}`;
};

const COMMANDS = {
    help: `Available commands:
  neofetch    — Show profile card
  skills      — List technical skills
  experience  — Show work experience
  education   — Show education & certifications
  contact     — Show contact info
  whoami      — Current user
  ls          — List resume sections
  pwd         — Current directory
  clear       — Clear terminal
  date        — Current date
  echo        — Echo text`,
    neofetch: NEOFETCH,
    skills: () => formatSkills(),
    experience: () => formatExperience(),
    education: () => formatEducation(),
    contact: () => formatContact(),
    whoami: profile.name,
    ls: 'Experience/\nSkills/\nEducation/\nCertifications/\nProjects/\ncontact.txt\nresume.pdf',
    pwd: `/Users/${profile.name.split(' ')[0].toLowerCase()}/Resume`,
    date: () => new Date().toString(),
    echo: (args) => args.join(' '),
    hostname: 'MacBook-Pro.local',
    uname: 'Darwin',
};

const TerminalApp = () => {
    const [history, setHistory] = useState([
        { type: 'output', text: `Welcome to ${profile.name}'s Interactive Resume` },
        { type: 'output', text: 'Type "help" to see available commands, or "neofetch" for a profile overview.\n' },
    ]);
    const [input, setInput] = useState('');
    const [cmdHistory, setCmdHistory] = useState([]);
    const [historyIdx, setHistoryIdx] = useState(-1);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e) => {
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (cmdHistory.length > 0) {
                const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
                setHistoryIdx(newIdx);
                setInput(cmdHistory[cmdHistory.length - 1 - newIdx]);
            }
            return;
        }
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIdx > 0) {
                setHistoryIdx(historyIdx - 1);
                setInput(cmdHistory[cmdHistory.length - historyIdx]);
            } else {
                setHistoryIdx(-1);
                setInput('');
            }
            return;
        }
        if (e.key !== 'Enter') return;

        const cmd = input.trim();
        const parts = cmd.split(/\s+/);
        const command = parts[0]?.toLowerCase();
        const args = parts.slice(1);
        const promptLine = { type: 'input', text: `jhramirez@MacBook-Pro ~/Resume % ${cmd}` };
        const newHistory = [...history, promptLine];

        if (cmd) {
            setCmdHistory(prev => [...prev, cmd]);
            setHistoryIdx(-1);
        }

        if (command === 'clear') {
            setHistory([]);
        } else if (COMMANDS[command] !== undefined) {
            const val = typeof COMMANDS[command] === 'function' ? COMMANDS[command](args) : COMMANDS[command];
            setHistory([...newHistory, { type: 'output', text: val }]);
        } else if (cmd) {
            setHistory([...newHistory, { type: 'output', text: `zsh: command not found: ${command}. Type "help" for available commands.` }]);
        } else {
            setHistory(newHistory);
        }
        setInput('');
    };

    return (
        <div className="terminal-app" onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => (
                <div key={i} className="terminal-line">{line.text}</div>
            ))}
            <div className="terminal-input-line">
                <span className="terminal-prompt">jhramirez@MacBook-Pro ~/Resume %</span>
                <input
                    ref={inputRef}
                    autoFocus
                    className="terminal-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    spellCheck={false}
                />
            </div>
            <div ref={bottomRef} />
        </div>
    );
};

export default TerminalApp;
