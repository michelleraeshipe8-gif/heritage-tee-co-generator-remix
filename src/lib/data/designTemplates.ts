export interface DesignTemplate {
  name: string;
  composition: string;
  elements: string[];
}

export const DESIGN_TEMPLATES: Record<string, DesignTemplate> = {
  "Badge": {
    name: "Badge",
    composition: "Centered circular lockup with inner and outer rings.",
    elements: ["Circular Border", "Main Icon Center", "Arched Top Text", "Arched Bottom Text"]
  },
  "Circular Seal": {
    name: "Circular Seal",
    composition: "Official government-style seal with high detail.",
    elements: ["Double Border", "Complex Symbol", "Established Date Side-caps", "Wrapped Ribbon"]
  },
  "Postcard": {
    name: "Postcard",
    composition: "Rectangular landscape layout with oversized main text.",
    elements: ["Decorative Frame", "Big Block Letters", "Secondary Script Overlay", "State Outline Small"]
  },
  "Mascot Icon": {
    name: "Mascot Icon",
    composition: "Illustration-focused layout with text framing the image.",
    elements: ["Large Central Icon", "Bold Top Heading", "Sub-slogan Bottom", "Accent Sparkles"]
  },
  "Map Outline": {
    name: "Map Outline",
    composition: "Minimalist geographic focus with clean typography.",
    elements: ["State/Town Map Silhouette", "Vertical Side Text", "Minimal Badge Inset", "Coordination Digits"]
  },
  "Typography Only": {
    name: "Typography Only",
    composition: "High-contrast font pairing without primary icons.",
    elements: ["Oversized Main Type", "Sub-header Horizontal", "Divider Lines", "Small Location Text"]
  }
};
