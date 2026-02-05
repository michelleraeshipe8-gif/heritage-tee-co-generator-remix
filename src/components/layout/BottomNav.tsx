import { NavLink } from 'react-router-dom';
import { PencilLine, Bookmark, Settings } from 'lucide-react';

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t border-border flex justify-around items-center h-16 pb-safe z-50">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`
        }
      >
        <PencilLine size={20} />
        <span className="text-[10px] mt-1 uppercase tracking-widest font-medium">Generator</span>
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`
        }
      >
        <Bookmark size={20} />
        <span className="text-[10px] mt-1 uppercase tracking-widest font-medium">Saved</span>
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) =>
          `flex flex-col items-center justify-center w-full h-full transition-colors ${
            isActive ? 'text-primary' : 'text-muted-foreground'
          }`
        }
      >
        <Settings size={20} />
        <span className="text-[10px] mt-1 uppercase tracking-widest font-medium">Settings</span>
      </NavLink>
    </nav>
  );
}
