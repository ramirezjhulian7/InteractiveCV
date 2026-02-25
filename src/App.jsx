import React from 'react';
import Desktop from './components/layout/Desktop';
import MobileShell from './components/mobile/MobileShell';
import { LanguageProvider } from './context/LanguageContext';
import useIsMobile from './hooks/useIsMobile';

function AppInner() {
  const isMobile = useIsMobile();
  return isMobile ? <MobileShell /> : <Desktop />;
}

function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  );
}

export default App;
