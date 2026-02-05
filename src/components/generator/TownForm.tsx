import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ChevronDown, ChevronUp, RefreshCw } from 'lucide-react';
import { STYLE_LIBRARIES } from '../../lib/data/styles';
import { DESIGN_TEMPLATES } from '../../lib/data/designTemplates';

export interface TownFormValues {
  townName: string;
  state: string;
  styleVibe: string;
  designType: string;
  printStyle: string;
  shirtColor: string;
  foundingYear: string;
  townNickname: string;
  county: string;
  landmark: string;
  waterFeatures: string;
  wildlife: string;
  localIndustry: string;
  terrain: string;
  keywords: string;
}

const INITIAL_VALUES: TownFormValues = {
  townName: '',
  state: '',
  styleVibe: 'Vintage Americana',
  designType: 'Badge',
  printStyle: '2-color',
  shirtColor: 'Black',
  foundingYear: '',
  townNickname: '',
  county: '',
  landmark: '',
  waterFeatures: '',
  wildlife: '',
  localIndustry: '',
  terrain: 'Flatland',
  keywords: ''
};

interface TownFormProps {
  onSubmit: (values: TownFormValues, action: 'research' | 'design' | 'both') => void;
  onReset: () => void;
}

export function TownForm({ onSubmit, onReset }: TownFormProps) {
  const [values, setValues] = useState<TownFormValues>(INITIAL_VALUES);
  const [showOptional, setShowOptional] = useState(false);

  const handleChange = (field: keyof TownFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
  };

  const handleRandomTown = () => {
    const towns = [
      { name: 'Dripping Springs', state: 'Texas', vibe: 'Western / Ranch', terrain: 'Hills' },
      { name: 'Whitefish', state: 'Montana', vibe: 'Outdoors & Wildlife', terrain: 'Mountains' },
      { name: 'Bar Harbor', state: 'Maine', vibe: 'River & Lake Life', terrain: 'Forest' },
      { name: 'Silverton', state: 'Colorado', vibe: 'Industrial Heritage', terrain: 'Mountains' },
      { name: 'Franklin', state: 'Tennessee', vibe: 'Small Town Classic', terrain: 'Hills' }
    ];
    const random = towns[Math.floor(Math.random() * towns.length)];
    setValues(prev => ({
      ...prev,
      townName: random.name,
      state: random.state,
      styleVibe: random.vibe,
      terrain: random.terrain
    }));
  };

  const isFormValid = values.townName && values.state;

  return (
    <div className="space-y-6 bg-secondary/50 p-6 rounded-lg border border-border">
      <div className="flex flex-wrap gap-2 mb-4">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleRandomTown}
          className="text-[10px] uppercase tracking-widest font-bold"
        >
          <RefreshCw size={14} className="mr-2" />
          Random Town
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => {
            setValues(INITIAL_VALUES);
            onReset();
          }}
          className="text-[10px] uppercase tracking-widest font-bold"
        >
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Town Name *</Label>
          <Input 
            value={values.townName} 
            onChange={e => handleChange('townName', e.target.value)}
            placeholder="e.g. Dripping Springs"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">State *</Label>
          <Input 
            value={values.state} 
            onChange={e => handleChange('state', e.target.value)}
            placeholder="e.g. Texas"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Style / Vibe</Label>
          <Select value={values.styleVibe} onValueChange={v => handleChange('styleVibe', v)}>
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
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Design Type</Label>
          <Select value={values.designType} onValueChange={v => handleChange('designType', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(DESIGN_TEMPLATES).map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Print Style</Label>
          <Select value={values.printStyle} onValueChange={v => handleChange('printStyle', v)}>
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
        <div className="space-y-2">
          <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Shirt Color</Label>
          <Select value={values.shirtColor} onValueChange={v => handleChange('shirtColor', v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Black">Black</SelectItem>
              <SelectItem value="White">White</SelectItem>
              <SelectItem value="Heather Gray">Heather Gray</SelectItem>
              <SelectItem value="Navy">Navy</SelectItem>
              <SelectItem value="Sand">Sand</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <button 
        onClick={() => setShowOptional(!showOptional)}
        className="flex items-center text-[10px] uppercase tracking-widest font-bold text-primary hover:text-primary/80 transition-colors"
      >
        {showOptional ? <ChevronUp size={14} className="mr-1" /> : <ChevronDown size={14} className="mr-1" />}
        Optional: User-Known Facts (Verified Data)
      </button>

      {showOptional && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 animate-fade-in">
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Founding Year</Label>
            <Input 
              type="number"
              value={values.foundingYear} 
              onChange={e => handleChange('foundingYear', e.target.value)}
              placeholder="e.g. 1850"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Terrain</Label>
            <Select value={values.terrain} onValueChange={v => handleChange('terrain', v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Flatland">Flatland</SelectItem>
                <SelectItem value="Hills">Hills</SelectItem>
                <SelectItem value="Mountains">Mountains</SelectItem>
                <SelectItem value="River Delta">River Delta</SelectItem>
                <SelectItem value="Forest">Forest</SelectItem>
                <SelectItem value="Plains">Plains</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Town Nickname</Label>
            <Input 
              value={values.townNickname} 
              onChange={e => handleChange('townNickname', e.target.value)}
              placeholder="e.g. Gateway to the Hill Country"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Landmarks</Label>
            <Input 
              value={values.landmark} 
              onChange={e => handleChange('landmark', e.target.value)}
              placeholder="e.g. Hamilton Pool"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Water Feature(s)</Label>
            <Input 
              value={values.waterFeatures} 
              onChange={e => handleChange('waterFeatures', e.target.value)}
              placeholder="e.g. Pedernales River"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Wildlife</Label>
            <Input 
              value={values.wildlife} 
              onChange={e => handleChange('wildlife', e.target.value)}
              placeholder="e.g. Golden-cheeked Warbler"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Local Industry</Label>
            <Input 
              value={values.localIndustry} 
              onChange={e => handleChange('localIndustry', e.target.value)}
              placeholder="e.g. Distilling & Agriculture"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">Keywords</Label>
            <Input 
              value={values.keywords} 
              onChange={e => handleChange('keywords', e.target.value)}
              placeholder="e.g. rustic, craft, legacy"
            />
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button 
            onClick={() => onSubmit(values, 'research')} 
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-widest"
          >
            Generate Research
          </Button>
          <Button 
            onClick={() => onSubmit(values, 'design')} 
            disabled={!isFormValid}
            variant="outline"
            className="w-full font-bold uppercase tracking-widest"
          >
            Generate Design
          </Button>
        </div>
        <Button 
          onClick={() => onSubmit(values, 'both')} 
          disabled={!isFormValid}
          variant="accent"
          className="w-full font-bold uppercase tracking-widest bg-accent hover:bg-accent/90"
        >
          Research + 3 Design Variations
        </Button>
      </div>
    </div>
  );
}
