export interface StateData {
  terrain: string[];
  wildlife: string[];
  industry: string[];
  vegetation: string[];
  vibe: string;
}

export const STATE_LIBRARIES: Record<string, StateData> = {
  "Texas": {
    terrain: ["Plains", "Hills", "Desert"],
    wildlife: ["Armadillo", "Longhorn", "Coyote", "Rattlesnake", "Whitetail Deer"],
    industry: ["Oil & Gas", "Ranching", "Agriculture", "Technology"],
    vegetation: ["Bluebonnets", "Mesquite", "Live Oak", "Prickly Pear"],
    vibe: "Bold, wide-open, independent"
  },
  "Montana": {
    terrain: ["Mountains", "Forest", "Plains"],
    wildlife: ["Grizzly Bear", "Elk", "Mountain Lion", "Bison", "Bald Eagle"],
    industry: ["Mining", "Agriculture", "Tourism", "Logging"],
    vegetation: ["Ponderosa Pine", "Wildflowers", "Douglas Fir", "Sagebrush"],
    vibe: "Wild, rugged, majestic"
  },
  "Maine": {
    terrain: ["Forest", "River Delta", "Coastline"],
    wildlife: ["Moose", "Black Bear", "Lobster", "Puffin", "Whale"],
    industry: ["Fishing", "Logging", "Shipbuilding", "Tourism"],
    vegetation: ["White Pine", "Blueberries", "Maple", "Birch"],
    vibe: "Coastal, resilient, maritime"
  },
  "Colorado": {
    terrain: ["Mountains", "Plains", "Forest"],
    wildlife: ["Elk", "Bighorn Sheep", "Black Bear", "Mountain Goat", "Marmot"],
    industry: ["Outdoor Recreation", "Technology", "Agriculture", "Aerospace"],
    vegetation: ["Aspen", "Blue Spruce", "Wildflowers", "Yucca"],
    vibe: "Elevated, active, alpine"
  },
  "Tennessee": {
    terrain: ["Hills", "Mountains", "River Delta"],
    wildlife: ["Black Bear", "Whitetail Deer", "Wild Turkey", "Bobcat", "Red Fox"],
    industry: ["Music", "Agriculture", "Manufacturing", "Tourism"],
    vegetation: ["Tulip Poplar", "Iris", "Dogwood", "Oak"],
    vibe: "Melodic, rolling, heritage"
  }
};

export const DEFAULT_STATE_DATA: StateData = {
  terrain: ["Flatland", "Hills"],
  wildlife: ["Whitetail Deer", "Red Fox", "Raccoon", "Opossum", "Hawk"],
  industry: ["Small Business", "Agriculture", "Local Services"],
  vegetation: ["Oak", "Pine", "Wild Grass", "Native Flowers"],
  vibe: "Classic Americana, community-driven"
};
