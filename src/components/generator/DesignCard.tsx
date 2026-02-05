import { DesignSheet } from '../../lib/designGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Copy, Save, Trash2, FileJson, Shirt, ShieldCheck, Layout, Type, Palette } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { toast } from 'sonner';

interface DesignCardProps {
  design: DesignSheet;
  onDelete?: () => void;
  showSave?: boolean;
}

export function DesignCard({ design, onDelete, showSave = true }: DesignCardProps) {
  const { saveDesign } = useAppStore();

  const handleCopyNotion = () => {
    const text = `
# Design Sheet: ${design.title}
Town: ${design.townName}, ${design.state}
Style: ${design.styleVibe} | Type: ${design.designType}
Shirt Color: ${design.shirtColor} | Print Style: ${design.printStyle}

## Slogan Options
${design.slogans.map((s, i) => `${i+1}. ${s}`).join('\n')}

## Layout Blueprint
- Composition: ${design.layout.composition}
- Border/Frame: ${design.layout.border}
- Primary Symbol: ${design.layout.primarySymbol}
- Secondary Symbols: ${design.layout.secondarySymbols.join(', ')}
- Accent Details: ${design.layout.accentDetails.join(', ')}

## Typography & Colors
- Headline: ${design.typography.headline}
- Secondary: ${design.typography.secondary}
- Effects: ${design.typography.effects}
- Palette: ${design.palette.name} (${design.palette.primary}, ${design.palette.secondary}, ${design.palette.accent})

## Printify Safety Checklist
${design.printifyChecklist.map(c => `- ${c}`).join('\n')}

## Mockup Notes (Canva)
- Canvas size: 4500 x 5400 px
- Export: PNG transparent background
- Keep important design inside safe margins

## SEO Tags
${design.seoTags.join(', ')}
    `;
    navigator.clipboard.writeText(text.trim());
    toast.success('Copied for Notion');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(design, null, 2));
    toast.success('Copied JSON');
  };

  const handleSave = () => {
    saveDesign(design);
    toast.success('Design saved locally');
  };

  return (
    <Card className="border-primary/20 bg-card/50 backdrop-blur-sm overflow-hidden border-2 animate-fade-in">
      <CardHeader className="border-b border-primary/10 bg-primary/5 py-3 px-4 flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-primary/10 rounded text-primary">
            <Shirt size={18} />
          </div>
          <div>
            <CardTitle className="vintage-text text-xl">{design.title}</CardTitle>
            <div className="flex gap-2 mt-0.5">
              <Badge variant="outline" className="text-[8px] uppercase font-bold border-primary/20 text-primary">{design.printStyle}</Badge>
              <Badge variant="outline" className="text-[8px] uppercase font-bold border-muted-foreground/20 text-muted-foreground">{design.shirtColor} Shirt</Badge>
            </div>
          </div>
        </div>
        <div className="flex gap-1 sm:gap-2">
          {showSave && (
            <Button variant="ghost" size="icon" onClick={handleSave} className="h-8 w-8 text-primary">
              <Save size={16} />
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={handleCopyNotion} className="h-8 w-8">
            <Copy size={16} />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleCopyJson} className="h-8 w-8">
            <FileJson size={16} />
          </Button>
          {onDelete && (
            <Button variant="ghost" size="icon" onClick={onDelete} className="h-8 w-8 text-destructive">
              <Trash2 size={16} />
            </Button>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 space-y-6 max-h-[500px] overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <section className="space-y-3">
            <h4 className="flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">
              <Type size={14} className="mr-2" /> Slogan Options
            </h4>
            <div className="space-y-2">
              {design.slogans.map((s, i) => (
                <div key={i} className="p-2 bg-secondary/30 rounded border border-border text-xs font-medium italic">
                  "{s}"
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-3">
            <h4 className="flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">
              <Layout size={14} className="mr-2" /> Layout Blueprint
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground font-bold uppercase text-[9px]">Composition</span>
                <span className="font-medium text-right ml-4">{design.layout.composition}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground font-bold uppercase text-[9px]">Border</span>
                <span className="font-medium">{design.layout.border}</span>
              </div>
              <div className="flex justify-between border-b border-border/50 pb-1">
                <span className="text-muted-foreground font-bold uppercase text-[9px]">Main Icon</span>
                <span className="font-bold text-primary">{design.layout.primarySymbol}</span>
              </div>
            </div>
          </section>
        </div>

        <section className="space-y-3">
          <h4 className="flex items-center text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">
            <Palette size={14} className="mr-2" /> Typography & Colors
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <span className="text-muted-foreground font-bold uppercase text-[9px]">Headline</span>
              <p className="text-xs font-bold vintage-text">{design.typography.headline}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground font-bold uppercase text-[9px]">Secondary</span>
              <p className="text-xs font-medium italic">{design.typography.secondary}</p>
            </div>
            <div className="space-y-1">
              <span className="text-muted-foreground font-bold uppercase text-[9px]">Palette</span>
              <div className="flex gap-1 mt-1">
                <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: design.palette.primary }} />
                <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: design.palette.secondary }} />
                <div className="w-4 h-4 rounded-full border border-border" style={{ backgroundColor: design.palette.accent }} />
              </div>
            </div>
          </div>
        </section>

        <section className="p-3 bg-green-500/5 rounded border border-green-500/20">
          <h4 className="flex items-center text-[10px] uppercase tracking-widest font-black text-green-500 mb-2">
            <ShieldCheck size={14} className="mr-2" /> Printify Safety Checklist
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1">
            {design.printifyChecklist.map((c, i) => (
              <div key={i} className="text-[10px] flex items-center gap-2 text-muted-foreground">
                <div className="h-1 w-1 rounded-full bg-green-500 flex-shrink-0" />
                <span>{c}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="flex flex-wrap gap-1 mt-4">
          {design.seoTags.map((tag, i) => (
            <span key={i} className="text-[9px] px-1.5 py-0.5 bg-secondary rounded text-muted-foreground font-mono">#{tag}</span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
