import { useAppStore } from '../hooks/useAppStore';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Shield, ShieldAlert, BadgeCheck, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { STYLE_LIBRARIES } from '../lib/data/styles';

export function Settings() {
  const { settings, updateSettings } = useAppStore();

  const handleResetApp = () => {
    if (confirm('Are you sure you want to clear all saved data? This cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-xl mx-auto space-y-10">
      <header>
        <h1 className="vintage-text text-3xl text-primary">Settings</h1>
        <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">App Preferences & Defaults</p>
      </header>

      <div className="space-y-8">
        <section className="space-y-6">
          <h2 className="text-[12px] uppercase tracking-[0.2em] font-black flex items-center gap-2">
            <Shield size={16} className="text-primary" /> Safety & Truthfulness
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="space-y-1">
                <Label className="font-bold">Strict Printify Safe Mode</Label>
                <p className="text-[10px] text-muted-foreground leading-tight">Enforce thick lines and blocky text only.</p>
              </div>
              <Switch 
                checked={settings.strictMode} 
                onCheckedChange={v => updateSettings({ strictMode: v })} 
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-lg border border-border">
              <div className="space-y-1">
                <Label className="font-bold">Clean Slogans Only</Label>
                <p className="text-[10px] text-muted-foreground leading-tight">Filter out any potentially non-inclusive or controversial themes.</p>
              </div>
              <Switch 
                checked={settings.cleanSlogans} 
                onCheckedChange={v => updateSettings({ cleanSlogans: v })} 
              />
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-[12px] uppercase tracking-[0.2em] font-black flex items-center gap-2">
            <BadgeCheck size={16} className="text-primary" /> Generation Defaults
          </h2>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Default Style</Label>
              <Select value={settings.defaultStyle} onValueChange={v => updateSettings({ defaultStyle: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(STYLE_LIBRARIES).map(style => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Default Print Style</Label>
              <Select value={settings.defaultPrintStyle} onValueChange={v => updateSettings({ defaultPrintStyle: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-color">1-color</SelectItem>
                  <SelectItem value="2-color">2-color</SelectItem>
                  <SelectItem value="3-color">3-color</SelectItem>
                  <SelectItem value="Full Color">Full Color</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        <section className="space-y-6 pt-6 border-t border-border">
          <h2 className="text-[12px] uppercase tracking-[0.2em] font-black flex items-center gap-2 text-destructive">
            <ShieldAlert size={16} /> Danger Zone
          </h2>
          <Button 
            variant="outline" 
            className="w-full border-destructive text-destructive hover:bg-destructive hover:text-white font-bold uppercase tracking-widest"
            onClick={handleResetApp}
          >
            <Trash2 size={16} className="mr-2" />
            Clear All Data
          </Button>
        </section>
      </div>

      <footer className="text-center space-y-2 opacity-40 pt-10">
        <p className="vintage-text text-lg">Heritage Tee Co.</p>
        <p className="text-[8px] uppercase tracking-[0.5em] font-black">v1.0.0 Stable Offline</p>
      </footer>
    </div>
  );
}
