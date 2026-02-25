import React, { useState } from 'react';
import MobileStatusBar from './MobileStatusBar';
import MobileHomeScreen from './MobileHomeScreen';
import MobileAppView from './MobileAppView';
import Tutorial from '../system/Tutorial';
import { useLanguage } from '../../context/LanguageContext';
import Finder from '../apps/Finder';
import TerminalApp from '../apps/TerminalApp';
import Safari from '../apps/Safari';
import Notes from '../apps/Notes';
import TicTacToe from '../apps/TicTacToe';
import Snake from '../apps/Snake';
import SettingsApp from '../apps/SettingsApp';

const appComponents = {
    finder: { component: <Finder /> },
    safari: { component: <Safari /> },
    terminal: { component: <TerminalApp /> },
    notes: { component: <Notes /> },
    settings: { component: <SettingsApp /> },
    'tic-tac-toe': { component: <TicTacToe /> },
    snake: { component: <Snake /> },
};

const MobileShell = () => {
    const { t } = useLanguage();
    const [activeApp, setActiveApp] = useState(null);

    const appNames = {
        finder: t('resumeExplorer'),
        safari: t('portfolio'),
        terminal: t('terminal'),
        notes: t('notes'),
        settings: t('aboutMe'),
        'tic-tac-toe': t('ticTacToe'),
        snake: t('snake'),
    };

    return (
        <div className="mobile-shell">
            <MobileStatusBar />
            {activeApp ? (
                <MobileAppView appName={appNames[activeApp] || ''} onBack={() => setActiveApp(null)}>
                    {appComponents[activeApp]?.component}
                </MobileAppView>
            ) : (
                <MobileHomeScreen onOpenApp={(id) => setActiveApp(id)} />
            )}
            <Tutorial />
        </div>
    );
};

export default MobileShell;
