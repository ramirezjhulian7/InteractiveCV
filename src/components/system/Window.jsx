import React from 'react';
import { Rnd } from 'react-rnd';
import { useApps } from '../../context/AppsContext';

const Window = ({ app }) => {
    const { closeApp, minimizeApp, toggleMaximize, focusApp, activeApp } = useApps();

    if (app.minimized) return null;

    const isActive = activeApp === app.id;
    const isLight = app.lightHeader;

    const positionProps = app.maximized ? {
        position: { x: 0, y: 28 },
        size: { width: '100%', height: 'calc(100vh - 28px)' },
        disableDragging: true,
        enableResizing: false,
    } : {
        default: {
            x: app.startX || 120 + Math.random() * 80,
            y: app.startY || 60 + Math.random() * 40,
            width: app.width || 600,
            height: app.height || 400,
        }
    };

    return (
        <Rnd
            {...positionProps}
            minWidth={320}
            minHeight={220}
            bounds="parent"
            dragHandleClassName="window-header"
            onMouseDown={() => focusApp(app.id)}
            style={{ zIndex: app.zIndex, position: 'absolute' }}
        >
            <div className={`window-frame${isActive ? '' : ' inactive'}`} style={{ width: '100%', height: '100%' }}>
                <div className={`window-header${isLight ? ' light' : ''}`} onDoubleClick={() => toggleMaximize(app.id)}>
                    <div className="window-traffic-lights">
                        <div className="traffic-light close" onClick={(e) => { e.stopPropagation(); closeApp(app.id); }}>✕</div>
                        <div className="traffic-light minimize" onClick={(e) => { e.stopPropagation(); minimizeApp(app.id); }}>−</div>
                        <div className="traffic-light maximize" onClick={(e) => { e.stopPropagation(); toggleMaximize(app.id); }}>＋</div>
                    </div>
                    <div className={`window-title${isLight ? ' light' : ''}`}>{app.name}</div>
                </div>
                <div className="window-content">
                    {app.component}
                </div>
            </div>
        </Rnd>
    );
};

export default Window;
