import React, { createContext, useContext, useState } from 'react';

const AppsContext = createContext();

export const useApps = () => useContext(AppsContext);

export const AppsProvider = ({ children }) => {
    const [apps, setApps] = useState([]);
    const [activeApp, setActiveApp] = useState(null);
    const [zIndexCounter, setZIndexCounter] = useState(10);

    const openApp = (appId, appConfig) => {
        setApps((prev) => {
            const existing = prev.find((app) => app.id === appId);
            if (existing) {
                if (existing.minimized) {
                    // Restore if minimized
                    return prev.map((app) => app.id === appId ? { ...app, minimized: false, zIndex: zIndexCounter + 1 } : app);
                }
                return prev;
            }
            return [...prev, { id: appId, minimized: false, maximized: false, zIndex: zIndexCounter + 1, ...appConfig }];
        });
        setActiveApp(appId);
        setZIndexCounter((prev) => prev + 1);
    };

    const closeApp = (appId) => {
        setApps((prev) => prev.filter((app) => app.id !== appId));
        if (activeApp === appId) setActiveApp(null);
    };

    const minimizeApp = (appId) => {
        setApps((prev) => prev.map((app) => app.id === appId ? { ...app, minimized: true } : app));
        if (activeApp === appId) setActiveApp(null);
    };

    const toggleMaximize = (appId) => {
        setApps((prev) => prev.map((app) => app.id === appId ? { ...app, maximized: !app.maximized } : app));
    };

    const focusApp = (appId) => {
        setApps((prev) => prev.map((app) => app.id === appId ? { ...app, zIndex: zIndexCounter + 1 } : app));
        setActiveApp(appId);
        setZIndexCounter((prev) => prev + 1);
    };

    return (
        <AppsContext.Provider value={{ apps, activeApp, openApp, closeApp, minimizeApp, toggleMaximize, focusApp }}>
            {children}
        </AppsContext.Provider>
    );
};
