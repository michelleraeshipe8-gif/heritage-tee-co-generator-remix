import { STATE_LIBRARIES, DEFAULT_STATE_DATA } from './data/states';
import { STYLE_LIBRARIES } from './data/styles';

export type ConfidenceLevel = 'VERIFIED' | 'INFERRED' | 'PLACEHOLDER';

export interface ResearchItem<T> {
  value: T;
  confidence: ConfidenceLevel;
}

export interface TownResearch {
  id: string;
  timestamp: number;
  townName: string;
  state: string;
  confidenceScore: number;
  confidenceNotes: string;
  terrain: ResearchItem<string>;
  vegetation: ResearchItem<string[]>;
  seasonalFeel: ResearchItem<string>;
  waterways: ResearchItem<string[]>;
  outdoorActivities: ResearchItem<string[]>;
  wildlife: ResearchItem<string[]>;
  economy: ResearchItem<string[]>;
  architecture: ResearchItem<string>;
  visualTextures: ResearchItem<string[]>;
  culturalMotifs: ResearchItem<string[]>;
  symbolSet: {
    primary: string[];
    secondary: string[];
    accent: string[];
  };
  sloganThemes: string[];
}

export const generateResearch = (inputs: any): TownResearch => {
  const stateData = STATE_LIBRARIES[inputs.state] || DEFAULT_STATE_DATA;
  const styleData = STYLE_LIBRARIES[inputs.style] || STYLE_LIBRARIES["Vintage Americana"];
  
  const isVerified = (field: string) => inputs[field] && inputs[field].length > 0;

  const research: TownResearch = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    townName: inputs.townName,
    state: inputs.state,
    confidenceScore: 0,
    confidenceNotes: "",
    terrain: {
      value: inputs.terrain || stateData.terrain[0],
      confidence: isVerified('terrain') ? 'VERIFIED' : 'INFERRED'
    },
    vegetation: {
      value: stateData.vegetation,
      confidence: 'INFERRED'
    },
    seasonalFeel: {
      value: "Distinct seasonal shifts with prominent autumn colors",
      confidence: 'INFERRED'
    },
    waterways: {
      value: inputs.waterFeatures ? [inputs.waterFeatures] : ["Local Creeks", "Regional River"],
      confidence: isVerified('waterFeatures') ? 'VERIFIED' : 'PLACEHOLDER'
    },
    outdoorActivities: {
      value: ["Hiking", "Fishing", "Local Exploration"],
      confidence: 'INFERRED'
    },
    wildlife: {
      value: inputs.wildlife ? [inputs.wildlife] : stateData.wildlife,
      confidence: isVerified('wildlife') ? 'VERIFIED' : 'INFERRED'
    },
    economy: {
      value: inputs.localIndustry ? [inputs.localIndustry] : stateData.industry,
      confidence: isVerified('localIndustry') ? 'VERIFIED' : 'INFERRED'
    },
    architecture: {
      value: "Historic Main Street with brick and limestone textures",
      confidence: 'INFERRED'
    },
    visualTextures: {
      value: ["Exposed Brick", "Weathered Wood", "Corrugated Metal"],
      confidence: 'INFERRED'
    },
    culturalMotifs: {
      value: ["Independence", "Legacy", "Community Roots"],
      confidence: 'INFERRED'
    },
    symbolSet: {
      primary: [inputs.landmark || styleData.icons[0], styleData.icons[1], styleData.icons[2]],
      secondary: [stateData.wildlife[0], stateData.wildlife[1], "Star Badge"],
      accent: ["Founded " + (inputs.foundingYear || "XXXX"), "Heritage Seal", "Est. 1923"]
    },
    sloganThemes: [
      "Legacy of the " + (inputs.state || "Heartland"),
      "Roots in the " + (inputs.terrain || "Countryside"),
      "Established Strength",
      "Authentic " + (inputs.townName || "Local") + " Heritage"
    ]
  };

  // Calculate confidence score
  let score = 30; // Base score for being offline
  if (isVerified('townName')) score += 10;
  if (isVerified('foundingYear')) score += 10;
  if (isVerified('landmark')) score += 10;
  if (isVerified('waterFeatures')) score += 10;
  if (isVerified('localIndustry')) score += 10;
  if (STATE_LIBRARIES[inputs.state]) score += 10;
  
  research.confidenceScore = Math.min(score, 100);
  research.confidenceNotes = score < 60 ? "Heavy reliance on regional inference and style templates." : "Good mix of user-provided facts and regional data.";

  return research;
};
