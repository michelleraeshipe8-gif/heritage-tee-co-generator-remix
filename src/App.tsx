import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Generator } from './pages/Generator';
import { Saved } from './pages/Saved';
import { Settings } from './pages/Settings';
import { BottomNav } from './components/layout/BottomNav';
import { AppProvider } from './hooks/useAppStore';
import { Toaster } from 'sonner';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground pb-16">
          <Routes>
            <Route path="/" element={<Generator />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <BottomNav />
        </div>
        <Toaster position="top-center" expand={false} richColors theme="dark" />
      </Router>
    </AppProvider>
  );
}

export default App;
