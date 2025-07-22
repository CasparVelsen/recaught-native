const dictionaries = {
  weather: {
    clear: "klar",
    cloudy: "bewölkt",
    rainy: "regnerisch",
    stormy: "stürmisch",
    foggy: "neblig",
    snowy: "Schnee",
  },
  watercolor: {
    clear: "klar",
    cloudy: "trüb",
    "slightly cloudy": "leicht trüb",
  },
  waterlevel: {
    low: "niedrig",
    normal: "normal",
    high: "hoch",
  },
  wind: {
    north: "Nord",
    "north east": "Nordost",
    northeast: "Nordost",
    east: "Ost",
    "south east": "Südost",
    southeast: "Südost",
    south: "Süd",
    "south west": "Südwest",
    southwest: "Südwest",
    west: "West",
    "north west": "Nordwest",
    northwest: "Nordwest",
  },
  moon: {
    "new moon": "Neumond",
    "increasing moon": "zunehmend",
    "full moon": "Vollmond",
    "waning moon": "abnehmend",
  },
};

export function translateValue(type, value) {
  if (!value || !type) return value;

  const dict = dictionaries[type];

  // normalize: lowercase, trim
  const key = value.toString().toLowerCase().trim();

  return dict?.[key] || value;
}
