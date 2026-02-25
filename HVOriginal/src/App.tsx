import './styles/index.css';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Experience } from './components/Experience';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { ExportPDF } from './components/ExportPDF';
import { ParticlesBackground } from './components/ParticlesBackground';
import { ScrollToTop } from './components/ScrollToTop';

function App() {
  return (
    <div className="app">
      <ParticlesBackground />
      <LanguageSwitcher />
      <ExportPDF />
      <ScrollToTop />
      <Hero />
      <Skills />
      <Education />
      <Experience />
    </div>
  );
}

export default App;


