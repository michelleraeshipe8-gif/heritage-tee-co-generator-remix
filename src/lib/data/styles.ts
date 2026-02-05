export interface StyleSet {
  icons: string[];
  textures: string[];
  borders: string[];
  typography: {
    headline: string;
    secondary: string;
    effects: string;
  };
}

export const STYLE_LIBRARIES: Record<string, StyleSet> = {
  "Vintage Americana": {
    icons: ["Eagle", "Shield", "Star", "Arrow", "Grain Bundle"],
    textures: ["Heavy Distress", "Halftone", "Worn Ink"],
    borders: ["Double Line Circle", "Ornate Badge", "Dotted Rectangle"],
    typography: {
      headline: "Blocky Serif",
      secondary: "Script/Cursive",
      effects: "Arched, Drop Shadow"
    }
  },
  "Outdoors & Wildlife": {
    icons: ["Mountain Peak", "Evergreen", "Compass Rose", "River Wave", "Animal Tracks"],
    textures: ["Fine Grain", "Woodcut", "Linen"],
    borders: ["Rough Edge", "Twine Rope", "Circular Compass"],
    typography: {
      headline: "Tall Sans-Serif",
      secondary: "Modern Slab",
      effects: "Clean, Stacked"
    }
  },
  "Western / Ranch": {
    icons: ["Skull", "Horseshoe", "Lasso", "Wagon Wheel", "Cactus"],
    textures: ["Leathery", "Dusty", "Cracked Mud"],
    borders: ["Barbed Wire", "Buckle Shape", "Stitched Edge"],
    typography: {
      headline: "Spurred Western",
      secondary: "Wide Block",
      effects: "Tapered, Inline"
    }
  },
  "River & Lake Life": {
    icons: ["Anchor", "Paddle", "Fish Hook", "Sun Burst", "Sailboat"],
    textures: ["Water Ripple", "Soft Fade", "Salt Air"],
    borders: ["Nautical Rope", "Life Ring", "Fluid Oval"],
    typography: {
      headline: "Rounded Bold",
      secondary: "Italic Sans",
      effects: "Wavy, Outlined"
    }
  },
  "Farm & Field": {
    icons: ["Tractor", "Barn", "Windmill", "Wheat Stalk", "Rooster"],
    textures: ["Burlap", "Canvas", "Rough Wood"],
    borders: ["Fence Post", "Oval Plaque", "Stitched Circle"],
    typography: {
      headline: "Industrial Serif",
      secondary: "Typewriter",
      effects: "Stamped, Distressed"
    }
  },
  "Industrial Heritage": {
    icons: ["Gear", "Anvil", "Hammer", "Factory Silhouette", "Wrench"],
    textures: ["Metallic Grime", "Oil Stain", "Rust"],
    borders: ["Riveted Plate", "Hexagon Bolt", "Thick Iron Band"],
    typography: {
      headline: "Extra Bold Condensed",
      secondary: "Stencil",
      effects: "Beveled, Hard Shadow"
    }
  },
  "Retro Tourist Postcard": {
    icons: ["Camera", "Suitcase", "Palm Tree", "Road Sign", "State Map"],
    textures: ["Screen Print", "Paper Grain", "Vibrant CMYK"],
    borders: ["Scalloped Edge", "Inner Glow", "Photo Frame"],
    typography: {
      headline: "Big Bubble Letter",
      secondary: "Brush Script",
      effects: "Gradient, 3D Extrude"
    }
  }
};
