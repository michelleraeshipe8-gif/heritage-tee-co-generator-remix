import { useState } from 'react';
import { useAppStore } from '../hooks/useAppStore';
import { ResearchCard } from '../components/generator/ResearchCard';
import { DesignCard } from '../components/generator/DesignCard';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Search, Archive } from 'lucide-react';

export function Saved() {
  const { savedResearch, savedDesigns, deleteResearch, deleteDesign } = useAppStore();
  const [search, setSearch] = useState('');

  const filteredResearch = savedResearch.filter(r => 
    r.townName.toLowerCase().includes(search.toLowerCase()) || 
    r.state.toLowerCase().includes(search.toLowerCase())
  );

  const filteredDesigns = savedDesigns.filter(d => 
    d.townName.toLowerCase().includes(search.toLowerCase()) || 
    d.state.toLowerCase().includes(search.toLowerCase()) ||
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="pb-24 pt-6 px-4 max-w-4xl mx-auto space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="vintage-text text-3xl text-primary">Archives</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground">Saved Research & Design Concepts</p>
        </div>
        <div className="flex items-center gap-2 px-2 py-1 bg-secondary rounded border border-border">
          <Archive size={14} className="text-primary" />
          <span className="text-[10px] font-bold">{savedResearch.length + savedDesigns.length} Items</span>
        </div>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
        <Input 
          className="pl-10 h-12 bg-secondary/30 border-border" 
          placeholder="Search by town, state, or design..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <Tabs defaultValue="designs" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 bg-secondary/50">
          <TabsTrigger value="designs" className="text-[10px] uppercase tracking-widest font-black">Designs ({filteredDesigns.length})</TabsTrigger>
          <TabsTrigger value="research" className="text-[10px] uppercase tracking-widest font-black">Research ({filteredResearch.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="designs" className="space-y-6 animate-fade-in">
          {filteredDesigns.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredDesigns.sort((a, b) => b.timestamp - a.timestamp).map(design => (
                <DesignCard 
                  key={design.id} 
                  design={design} 
                  showSave={false} 
                  onDelete={() => deleteDesign(design.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-lg space-y-2">
              <p className="vintage-text text-xl text-muted-foreground">No designs found</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Generate and save designs to see them here</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="research" className="space-y-6 animate-fade-in">
          {filteredResearch.length > 0 ? (
            <div className="grid grid-cols-1 gap-6">
              {filteredResearch.sort((a, b) => b.timestamp - a.timestamp).map(research => (
                <ResearchCard 
                  key={research.id} 
                  research={research} 
                  showSave={false} 
                  onDelete={() => deleteResearch(research.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 border-2 border-dashed border-border rounded-lg space-y-2">
              <p className="vintage-text text-xl text-muted-foreground">No research found</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/60">Generate and save research to see it here</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
