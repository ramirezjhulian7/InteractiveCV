import React from 'react';
import Desktop from './components/layout/Desktop';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Desktop />
    </LanguageProvider>
  );
}

export default App;
