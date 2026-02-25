import React from 'react';
import MenuBar from './MenuBar';
import Dock from './Dock';
import WindowManager from '../system/WindowManager';
import Tutorial from '../system/Tutorial';
import { AppsProvider } from '../../context/AppsContext';

const Desktop = () => {
    return (
        <AppsProvider>
            <div className="desktop">
                <MenuBar />
                <div className="desktop-content">
                    <WindowManager />
                </div>
                <Dock />
                <Tutorial />
            </div>
        </AppsProvider>
    );
};

export default Desktop;
