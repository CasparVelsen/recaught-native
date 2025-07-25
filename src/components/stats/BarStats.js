import React, { useState, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import SkiaBarChart from "../charts/SkiaBarChart";

import { translateValue } from "../../../assets/language/translatedValue";

const OPTIONS = [
  { key: "weather", label: "Wetter" },
  { key: "moon", label: "Mondphase" },
  { key: "wind", label: "Windrichtung" },
  { key: "watercolor", label: "Wasserfarbe" },
  { key: "waterlevel", label: "Wasserstand" },
];

const normalizationMap = {
  moon: {
    "increasing moon": "zunehmend",
    zunehmend: "zunehmend",
    "full moon": "vollmond",
    "new moon": "neumond",
    "waning moon": "abnehmend",
    abnehmend: "abnehmend",
    "": "", // leer bleiben, wird später gefiltert
  },
  // weitere Normalisierungen hier falls nötig
};

function normalizeValue(type, value) {
  if (!value || !type) return value;
  const dict = normalizationMap[type];
  if (!dict) return value;

  const key = value.toString().toLowerCase().trim();
  return dict[key] || value;
}

function aggregateData(stats, optionKey) {
  if (!stats || !Array.isArray(stats[optionKey])) return [];

  const countMap = {};

  stats[optionKey].forEach(([rawName, fishes]) => {
    if (
      rawName === 0 ||
      rawName === "" ||
      rawName === null ||
      rawName === undefined ||
      fishes <= 0
    )
      return;

    const normalizedName = translateValue(optionKey, rawName);
    countMap[normalizedName] = (countMap[normalizedName] || 0) + fishes;
  });

  return Object.entries(countMap).map(([name, fishes]) => ({
    name,
    fishes,
  }));
}

const BarStats = ({ stats = {} }) => {
  const [selectedKey, setSelectedKey] = useState(OPTIONS[0].key);

  // Filter Optionen nur auf solche mit Daten > 0
  const availableOptions = useMemo(() => {
    return OPTIONS.filter(({ key }) => {
      const dataForKey = stats[key];
      if (!Array.isArray(dataForKey)) return false;
      return dataForKey.some(([_, fishes]) => fishes > 0);
    });
  }, [stats]);

  // Falls der aktuelle selectedKey nicht mehr gültig ist, setze ihn auf ersten verfügbaren
  useEffect(() => {
    if (
      selectedKey === "" ||
      !availableOptions.find((opt) => opt.key === selectedKey)
    ) {
      setSelectedKey(availableOptions[0]?.key || "");
    }
  }, [availableOptions, selectedKey]);

  const selectedLabel =
    availableOptions.find((opt) => opt.key === selectedKey)?.label || "";

  const aggregatedData = useMemo(() => {
    return aggregateData(stats, selectedKey);
  }, [stats, selectedKey]);

  if (availableOptions.length === 0) {
    return (
      <View style={[styles.container, { padding: 16 }]}>
        <Text style={{ color: Colors.primary }}>
          Keine Statistik-Daten verfügbar.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {availableOptions.map(({ key, label }) => {
          const selected = key === selectedKey;
          return (
            <TouchableOpacity
              key={key}
              style={[
                styles.optionButton,
                selected && styles.optionButtonSelected,
              ]}
              onPress={() => setSelectedKey(key)}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.headerWrapper}>
        <Text style={styles.title}>{selectedLabel}</Text>
      </View>

      <SkiaBarChart
        data={aggregatedData}
        label={selectedLabel}
        field={selectedKey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 52 },
  optionsContainer: {
    paddingHorizontal: 16,
    gap: 6,
  },
  optionButton: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gray,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  optionText: {
    fontSize: 10,
    color: Colors.gray,
  },
  optionTextSelected: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: "600",
  },
  headerWrapper: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
});

export default BarStats;
