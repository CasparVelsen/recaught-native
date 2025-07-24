import React, { useState, useMemo } from "react";
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

const OPTIONS = [
  { key: "weather", label: "Wetter" },
  { key: "moon", label: "Mondphase" },
  { key: "wind", label: "Windrichtung" },
  { key: "watercolor", label: "Wasserfarbe" },
  { key: "waterlevel", label: "Wasserstand" },
];

function aggregateData(stats, optionKey) {
  if (!stats || !Array.isArray(stats[optionKey])) return [];
  return stats[optionKey].map(([name, fishes]) => ({ name, fishes }));
}

const BarStats = ({ stats = {} }) => {
  const [selectedKey, setSelectedKey] = useState(OPTIONS[0].key);

  const selectedLabel =
    OPTIONS.find((opt) => opt.key === selectedKey)?.label || "";

  const aggregatedData = useMemo(() => {
    return aggregateData(stats, selectedKey);
  }, [stats, selectedKey]);

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {OPTIONS.map(({ key, label }) => {
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

      <SkiaBarChart data={aggregatedData} label={selectedLabel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 10 },
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
