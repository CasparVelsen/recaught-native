
/**
 * Erstellt ein Mapping: Wert => Anzahl der Fänge (für Kartenfelder)
 */
const createStatMap = (cards, field) => {
  const map = {};
  const allValues = new Set();

  cards.forEach((card) => {
    const value = card[field];
    const count = (card.catches || []).length;

    if (value == null) return;

    allValues.add(value); // alle beobachteten Werte merken

    if (!map.hasOwnProperty(value)) {
      map[value] = 0;
    }

    map[value] += count;
  });

  // Jetzt sicherstellen, dass alle bekannten Werte im Ergebnis sind
  const filled = Array.from(allValues).map((key) => [
    typeof key === "string" ? key : Number(key),
    map[key] || 0,
  ]);

  return filled.sort((a, b) =>
    typeof a[0] === "number" ? a[0] - b[0] : a[0].localeCompare(b[0])
  );
};

/**
 * Erstellt Statistik: Anzahl Fänge pro exaktem Datum (YYYY-MM-DD)
 */
const createExactDateStatMap = (cards) => {
  const map = {};

  cards.forEach((card) => {
    const date = card.date?.split("T")[0]; // "2025-05-12"
    const count = (card.catches || []).length;

    if (!date || count === 0) return;

    map[date] = (map[date] || 0) + count;
  });

  return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
};

/**
 * Erstellt Statistik: Anzahl Fänge pro Uhrzeit (z. B. "06:30")
 */
const createExactTimeStatMap = (cards) => {
  const map = {};

  cards.forEach((card) => {
    (card.catches || []).forEach((c) => {
      const time = c.time;
      if (!time) return;

      map[time] = (map[time] || 0) + 1;
    });
  });

  return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
};

/**
 * Kombinierte Umwelt-, Wasser- und Zeit-Statistiken
 */
export const getEnvironmentStats = (cards) => {
  return {
    // 🌦 Umweltbedingungen
    airpressure: createStatMap(cards, "airpressure"),
    temperature: createStatMap(cards, "temperature"),
    weather: createStatMap(cards, "weather"),
    moon: createStatMap(cards, "moon"),
    wind: createStatMap(cards, "wind"),
    windspeed: createStatMap(cards, "windspeed"),

    // 💧 Wasserbedingungen
    watertemp: createStatMap(cards, "watertemp"),
    watercolor: createStatMap(cards, "watercolor"),
    waterlevel: createStatMap(cards, "waterlevel"),
    water: createStatMap(cards, "water"),

    // ⏰ Zeitbezogene Daten (fein)
    date: createExactDateStatMap(cards),
    time: createExactTimeStatMap(cards),
  };
};

