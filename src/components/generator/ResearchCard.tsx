import { TownResearch, ConfidenceLevel } from '../../lib/researchGenerator';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Copy, Save, Trash2, FileJson, CheckCircle2, AlertCircle, HelpCircle } from 'lucide-react';
import { useAppStore } from '../../hooks/useAppStore';
import { toast } from 'sonner';

interface ResearchCardProps {
  research: TownResearch;
  onDelete?: () => void;
  showSave?: boolean;
}

export function ResearchCard({ research, onDelete, showSave = true }: ResearchCardProps) {
  const { saveResearch, deleteResearch } = useAppStore();

  const getConfidenceIcon = (level: ConfidenceLevel) => {
    switch (level) {
      case 'VERIFIED': return <CheckCircle2 size={12} className="text-green-500 mr-1" />;
      case 'INFERRED': return <AlertCircle size={12} className="text-amber-500 mr-1" />;
      case 'PLACEHOLDER': return <HelpCircle size={12} className="text-muted-foreground mr-1" />;
    }
  };

  const getConfidenceBadge = (level: ConfidenceLevel) => {
    const styles = {
      VERIFIED: "bg-green-500/10 text-green-500 border-green-500/20",
      INFERRED: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      PLACEHOLDER: "bg-muted text-muted-foreground border-border"
    };
    return (
      <Badge variant="outline" className={`text-[8px] uppercase font-bold px-1 py-0 h-4 ${styles[level]}`}>
        {getConfidenceIcon(level)}
        {level}
      </Badge>
    );
  };

  const handleCopyNotion = () => {
    const text = `
# Town Research: ${research.townName}, ${research.state}
Confidence Score: ${research.confidenceScore}/100
Notes: ${research.confidenceNotes}

## Geography & Terrain
- Terrain: ${research.terrain.value} (${research.terrain.confidence})
- Vegetation: ${research.vegetation.value.join(', ')} (${research.vegetation.confidence})
- Seasonal Feel: ${research.seasonalFeel.value} (${research.seasonalFeel.confidence})

## Waterways & Outdoors
- Features: ${research.waterways.value.join(', ')} (${research.waterways.confidence})
- Activities: ${research.outdoorActivities.value.join(', ')} (${research.outdoorActivities.confidence})

## Wildlife & Nature Symbols
${research.wildlife.value.map((w, i) => `${i+1}. ${w}`).join('\n')}

## Local Economy
${research.economy.value.map((e, i) => `- ${e}`).join('\n')}

## Architecture & Visuals
- Vibe: ${research.architecture.value} (${research.architecture.confidence})
- Textures: ${research.visualTextures.value.join(', ')} (${research.visualTextures.confidence})

## Symbol Set
- Primary: ${research.symbolSet.primary.join(', ')}
- Secondary: ${research.symbolSet.secondary.join(', ')}
- Accent: ${research.symbolSet.accent.join(', ')}
    `;
    navigator.clipboard.writeText(text.trim());
    toast.success('Copied for Notion');
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(research, null, 2));
    toast.success('Copied JSON');
  };

  const handleSave = () => {
    saveResearch(research);
    toast.success('Research saved locally');
  };

  return (
    <Card className="border-border bg-card/50 backdrop-blur-sm overflow-hidden animate-fade-in">
      <CardHeader className="border-b border-border bg-secondary/30 py-3 px-4 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="vintage-text text-xl">{research.townName}, {research.state}</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground">Confidence: {research.confidenceScore}/100</span>
            <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div 
                className={`h-full ${research.confidenceScore > 70 ? 'bg-green-500' : research.confidenceScore > 40 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${research.confidenceScore}%` }}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
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
      <CardContent className="p-4 space-y-6 max-h-[400px] overflow-y-auto">
        <p className="text-[10px] text-muted-foreground italic font-medium leading-relaxed">
          {research.confidenceNotes}
        </p>

        <section className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">Geography & Terrain</h4>
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center justify-between group">
              <span className="text-xs font-bold text-muted-foreground">Terrain Type:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium">{research.terrain.value}</span>
                {getConfidenceBadge(research.terrain.confidence)}
              </div>
            </div>
            <div className="flex items-center justify-between group">
              <span className="text-xs font-bold text-muted-foreground">Likely Vegetation:</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium truncate max-w-[150px]">{research.vegetation.value.slice(0, 2).join(', ')}...</span>
                {getConfidenceBadge(research.vegetation.confidence)}
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">Wildlife & Nature</h4>
          <div className="grid grid-cols-1 gap-2">
            {research.wildlife.value.map((animal, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-xs font-medium">{i + 1}. {animal}</span>
                {i === 0 && getConfidenceBadge(research.wildlife.confidence)}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">Visual Architecture</h4>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-muted-foreground">Building Vibe:</span>
              {getConfidenceBadge(research.architecture.confidence)}
            </div>
            <p className="text-xs font-medium">{research.architecture.value}</p>
            <div className="flex flex-wrap gap-1 mt-1">
              {research.visualTextures.value.map((t, i) => (
                <Badge key={i} variant="outline" className="text-[9px] lowercase bg-secondary/50 font-mono">#{t.replace(/\s+/g, '')}</Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-3">
          <h4 className="text-[10px] uppercase tracking-[0.2em] font-black text-primary border-b border-primary/20 pb-1">Symbol Set (Tee Focus)</h4>
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {research.symbolSet.primary.map((s, i) => (
                <Badge key={i} className="text-[9px] bg-primary text-primary-foreground font-bold">{s}</Badge>
              ))}
              {research.symbolSet.secondary.map((s, i) => (
                <Badge key={i} variant="outline" className="text-[9px] border-primary/30 text-primary font-bold">{s}</Badge>
              ))}
              {research.symbolSet.accent.map((s, i) => (
                <Badge key={i} variant="outline" className="text-[9px] border-muted-foreground/30 text-muted-foreground font-medium">{s}</Badge>
              ))}
            </div>
          </div>
        </section>

        <section className="space-y-2 p-3 bg-primary/5 rounded border border-primary/10">
          <h4 className="text-[10px] uppercase tracking-widest font-black text-primary">Confirmation Checklist</h4>
          <ul className="space-y-1">
            <li className="text-[10px] flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
              <span>Confirm or edit: <span className="font-bold underline cursor-pointer">landmarks</span></span>
            </li>
            <li className="text-[10px] flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
              <span>Confirm or edit: <span className="font-bold underline cursor-pointer">water features</span></span>
            </li>
            <li className="text-[10px] flex items-start gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary mt-1 flex-shrink-0" />
              <span>Confirm or edit: <span className="font-bold underline cursor-pointer">local industry</span></span>
            </li>
          </ul>
        </section>
      </CardContent>
    </Card>
  );
}
