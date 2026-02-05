import { createContext, useContext, ReactNode, useState } from 'react';
import { TownResearch } from '../lib/researchGenerator';
import { DesignSheet } from '../lib/designGenerator';
import { useLocalStorage } from './useLocalStorage';

interface AppState {
  savedResearch: TownResearch[];
  savedDesigns: DesignSheet[];
  settings: {
    strictMode: boolean;
    cleanSlogans: boolean;
    defaultPrintStyle: string;
    defaultShirtColor: string;
    defaultStyle: string;
  };
}

interface AppContextType extends AppState {
  saveResearch: (research: TownResearch) => void;
  deleteResearch: (id: string) => void;
  saveDesign: (design: DesignSheet) => void;
  deleteDesign: (id: string) => void;
  updateSettings: (settings: Partial<AppState['settings']>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [savedResearch, setSavedResearch] = useLocalStorage<TownResearch[]>('heritage_research', []);
  const [savedDesigns, setSavedDesigns] = useLocalStorage<DesignSheet[]>('heritage_designs', []);
  const [settings, setSettings] = useLocalStorage<AppState['settings']>('heritage_settings', {
    strictMode: true,
    cleanSlogans: true,
    defaultPrintStyle: '2-color',
    defaultShirtColor: 'Black',
    defaultStyle: 'Vintage Americana'
  });

  const saveResearch = (research: TownResearch) => {
    setSavedResearch(prev => [...prev.filter(r => r.id !== research.id), research]);
  };

  const deleteResearch = (id: string) => {
    setSavedResearch(prev => prev.filter(r => r.id !== id));
    setSavedDesigns(prev => prev.filter(d => d.researchId !== id));
  };

  const saveDesign = (design: DesignSheet) => {
    setSavedDesigns(prev => [...prev.filter(d => d.id !== design.id), design]);
  };

  const deleteDesign = (id: string) => {
    setSavedDesigns(prev => prev.filter(d => d.id !== id));
  };

  const updateSettings = (newSettings: Partial<AppState['settings']>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <AppContext.Provider value={{
      savedResearch,
      savedDesigns,
      settings,
      saveResearch,
      deleteResearch,
      saveDesign,
      deleteDesign,
      updateSettings
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppStore() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
}
