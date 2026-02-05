import { useState } from 'react';
import { TownForm, TownFormValues } from '../components/generator/TownForm';
import { ResearchCard } from '../components/generator/ResearchCard';
import { DesignCard } from '../components/generator/DesignCard';
import { generateResearch, TownResearch } from '../lib/researchGenerator';
import { generateDesign, DesignSheet } from '../lib/designGenerator';
import { toast } from 'sonner';

export function Generator() {
  const [research, setResearch] = useState<TownResearch | null>(null);
  const [designs, setDesigns] = useState<DesignSheet[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormSubmit = async (values: TownFormValues, action: 'research' | 'design' | 'both') => {
    setIsGenerating(true);
    
    try {
      if (action === 'research') {
        const newResearch = generateResearch(values);
        setResearch(newResearch);
        setDesigns([]);
        toast.success('Research generated');
      } else if (action === 'design') {
        if (!research) {
          toast.error('Generate research first');
          return;
        }
        const newDesign = generateDesign(research, values);
        setDesigns([newDesign]);
        toast.success('Design generated');
      } else if (action === 'both') {
        const newResearch = generateResearch(values);
        setResearch(newResearch);
        
        const variation1 = generateDesign(newResearch, { ...values, designType: 'Badge' });
        const variation2 = generateDesign(newResearch, { ...values, designType: 'Postcard' });
        const variation3 = generateDesign(newResearch, { ...values, designType: 'Mascot Icon' });
        
        setDesigns([variation1, variation2, variation3]);
        toast.success('Research + 3 Variations generated');
      }
    } finally {
      setIsGenerating(false);
      // Scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 400, behavior: 'smooth' });
      }, 100);
    }
  };

  const handleReset = () => {
    setResearch(null);
    setDesigns([]);
  };

  return (
    <div className="pb-24 pt-6 px-4 max-w-4xl mx-auto space-y-10">
      <header className="text-center space-y-2">
        <h1 className="vintage-text text-4xl md:text-5xl text-primary tracking-tight">Heritage Tee Co.</h1>
        <p className="text-[10px] uppercase tracking-[0.3em] font-black text-muted-foreground">Town Research & Design Generator</p>
      </header>

      <section>
        <h2 className="text-[12px] uppercase tracking-[0.2em] font-black mb-4 flex items-center gap-2">
          <span className="w-8 h-px bg-primary/30" /> Input Parameters
        </h2>
        <TownForm onSubmit={handleFormSubmit} onReset={handleReset} />
      </section>

      {(research || designs.length > 0) && (
        <div className="space-y-10 animate-fade-in">
          {research && (
            <section id="research-results">
              <h2 className="text-[12px] uppercase tracking-[0.2em] font-black mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-primary/30" /> Research Results
              </h2>
              <ResearchCard research={research} />
            </section>
          )}

          {designs.length > 0 && (
            <section id="design-results" className="space-y-6">
              <h2 className="text-[12px] uppercase tracking-[0.2em] font-black mb-4 flex items-center gap-2">
                <span className="w-8 h-px bg-primary/30" /> Design Sheets
              </h2>
              <div className="grid grid-cols-1 gap-6">
                {designs.map(design => (
                  <DesignCard key={design.id} design={design} />
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {isGenerating && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="vintage-text text-2xl animate-pulse">Consulting Archives...</p>
          </div>
        </div>
      )}
    </div>
  );
}
