import React from 'react';
import { Compass, Terminal as TerminalIcon, FileText, Grid3X3, Gamepad2, Settings, FolderOpen, User } from 'lucide-react';
import { useApps } from '../../context/AppsContext';
import Finder from '../apps/Finder';
import TerminalApp from '../apps/TerminalApp';
import Safari from '../apps/Safari';
import Notes from '../apps/Notes';
import TicTacToe from '../apps/TicTacToe';
import Snake from '../apps/Snake';
import SettingsApp from '../apps/SettingsApp';

const DockIconSvg = ({ children, bg }) => (
    <div style={{
        width: 44, height: 44, borderRadius: 10,
        background: bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    }}>
        {children}
    </div>
);

const Dock = () => {
    const { openApp, apps } = useApps();

    const mainApps = [
        {
            id: 'finder', name: 'Resume Explorer',
            icon: <DockIconSvg bg="linear-gradient(135deg, #1c92d2 0%, #4bb8f0 100%)"><FolderOpen size={26} color="#fff" /></DockIconSvg>,
            config: { width: 750, height: 470, component: <Finder /> }
        },
        {
            id: 'safari', name: 'Portfolio',
            icon: <DockIconSvg bg="linear-gradient(135deg, #006aff 0%, #00c6ff 100%)"><Compass size={28} color="#fff" /></DockIconSvg>,
            config: { width: 850, height: 580, lightHeader: true, component: <Safari /> }
        },
        {
            id: 'terminal', name: 'Terminal',
            icon: <DockIconSvg bg="linear-gradient(135deg, #1e1e1e 0%, #3a3a3a 100%)"><TerminalIcon size={24} color="#4af626" /></DockIconSvg>,
            config: { width: 660, height: 440, component: <TerminalApp /> }
        },
        {
            id: 'notes', name: 'Notes',
            icon: <DockIconSvg bg="linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"><FileText size={24} color="#fff" /></DockIconSvg>,
            config: { width: 540, height: 480, component: <Notes /> }
        },
    ];

    const gameApps = [
        {
            id: 'tic-tac-toe', name: 'Tic-Tac-Toe',
            icon: <DockIconSvg bg="linear-gradient(135deg, #10b981 0%, #059669 100%)"><Grid3X3 size={26} color="#fff" /></DockIconSvg>,
            config: { width: 420, height: 520, component: <TicTacToe /> }
        },
        {
            id: 'snake', name: 'Snake',
            icon: <DockIconSvg bg="linear-gradient(135deg, #ef4444 0%, #dc2626 100%)"><Gamepad2 size={26} color="#fff" /></DockIconSvg>,
            config: { width: 500, height: 580, component: <Snake /> }
        },
    ];

    const systemApps = [
        {
            id: 'settings', name: 'About Me',
            icon: <DockIconSvg bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"><User size={24} color="#fff" /></DockIconSvg>,
            config: { width: 700, height: 520, component: <SettingsApp /> }
        },
    ];

    const renderIcon = (app) => {
        const isOpen = apps.some(a => a.id === app.id);
        return (
            <div
                key={app.id}
                className={`dock-icon${isOpen ? ' active' : ''}`}
                onClick={() => openApp(app.id, { name: app.name, ...app.config })}
            >
                {app.icon}
                <div className="dock-icon-tooltip">{app.name}</div>
            </div>
        );
    };

    return (
        <div className="dock-container">
            {mainApps.map(renderIcon)}
            <div className="dock-separator" />
            {gameApps.map(renderIcon)}
            <div className="dock-separator" />
            {systemApps.map(renderIcon)}
        </div>
    );
};

export default Dock;
