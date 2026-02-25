import React from 'react';
import { useApps } from '../../context/AppsContext';
import Window from './Window';

const WindowManager = () => {
    const { apps } = useApps();

    return (
        <>
            {apps.map(app => (
                <Window key={app.id} app={app} />
            ))}
        </>
    );
};

export default WindowManager;
