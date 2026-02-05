import { TownResearch } from './researchGenerator';
import { STYLE_LIBRARIES } from './data/styles';
import { DESIGN_TEMPLATES } from './data/designTemplates';

export interface DesignSheet {
  id: string;
  researchId: string;
  timestamp: number;
  title: string;
  townName: string;
  state: string;
  styleVibe: string;
  designType: string;
  printStyle: string;
  shirtColor: string;
  slogans: string[];
  layout: {
    topText: string;
    centerText: string;
    bottomText: string;
    composition: string;
    border: string;
    primarySymbol: string;
    secondarySymbols: string[];
    accentDetails: string[];
  };
  typography: {
    headline: string;
    secondary: string;
    effects: string;
  };
  palette: {
    name: string;
    primary: string;
    secondary: string;
    accent: string;
  };
  printifyChecklist: string[];
  seoTags: string[];
}

export const generateDesign = (research: TownResearch, inputs: any): DesignSheet => {
  const style = STYLE_LIBRARIES[inputs.styleVibe] || STYLE_LIBRARIES["Vintage Americana"];
  const template = DESIGN_TEMPLATES[inputs.designType] || DESIGN_TEMPLATES["Badge"];

  const design: DesignSheet = {
    id: crypto.randomUUID(),
    researchId: research.id,
    timestamp: Date.now(),
    title: `${research.townName} ${inputs.designType} Design`,
    townName: research.townName,
    state: research.state,
    styleVibe: inputs.styleVibe,
    designType: inputs.designType,
    printStyle: inputs.printStyle,
    shirtColor: inputs.shirtColor,
    slogans: [
      `Original ${research.townName} Heritage`,
      `Roots in ${research.state}`,
      `${research.townName}: A ${research.terrain.value} Classic`
    ],
    layout: {
      topText: research.townName.toUpperCase(),
      centerText: research.state,
      bottomText: "EST. " + (inputs.foundingYear || "1923"),
      composition: template.composition,
      border: style.borders[Math.floor(Math.random() * style.borders.length)],
      primarySymbol: research.symbolSet.primary[0],
      secondarySymbols: [research.symbolSet.primary[1], research.symbolSet.secondary[0]],
      accentDetails: [research.symbolSet.accent[0], "100% AUTHENTIC"]
    },
    typography: {
      headline: style.typography.headline,
      secondary: style.typography.secondary,
      effects: style.typography.effects
    },
    palette: {
      name: "Vintage Earth",
      primary: "#2C3E50",
      secondary: "#E67E22",
      accent: "#BDC3C7"
    },
    printifyChecklist: [
      `Max ink colors: ${inputs.printStyle}`,
      "Minimum line thickness: 1pt",
      "Text size: 12pt minimum",
      "Avoid heavy gradients",
      "Center chest placement recommended"
    ],
    seoTags: [research.townName, research.state, "vintage", "tshirt", "heritage", "local pride", "americana", "custom design", "local roots", "classic"]
  };

  return design;
};
