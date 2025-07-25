import React, { useState, useCallback, useMemo, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";
import SkiaLineChart from "../charts/LineChartSkia";
import ChartTooltip from "../charts/ChartToolTip";

const OPTIONS = [
  { key: "temperature", label: "Temperatur" },
  { key: "airpressure", label: "Luftdruck" },
  { key: "watertemp", label: "Wassertemperatur" },
  { key: "windspeed", label: "Windgeschwindigkeit" },
];

const LineStats = ({ stats }) => {
  const [hoverPoint, setHoverPoint] = useState(null);
  const [selectedKey, setSelectedKey] = useState("temperature");

  // Filter nur Optionen mit vorhandenen Daten
  const availableOptions = useMemo(() => {
    return OPTIONS.filter(({ key }) => {
      const data = stats?.[key];
      return Array.isArray(data) && data.length > 0;
    });
  }, [stats]);

  // Falls selectedKey nicht mehr vorhanden, setze auf ersten verfügbaren
  useEffect(() => {
    if (!availableOptions.find((opt) => opt.key === selectedKey)) {
      setSelectedKey(availableOptions[0]?.key || "");
      setHoverPoint(null);
    }
  }, [availableOptions, selectedKey]);

  const data = stats?.[selectedKey] ?? [];
  const selectedLabel =
    availableOptions.find((opt) => opt.key === selectedKey)?.label || "";

  const handlePointChange = useCallback((point) => {
    setHoverPoint(point);
  }, []);

  if (availableOptions.length === 0) {
    return (
      <View style={[styles.container, { padding: 16 }]}>
        <Text style={{ color: Colors.primary }}>
          Keine Linien-Daten verfügbar.
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
              onPress={() => {
                setSelectedKey(key);
                setHoverPoint(null);
              }}
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
        <ChartTooltip point={hoverPoint} type={selectedKey} />
      </View>

      <SkiaLineChart data={data} onPointChange={handlePointChange} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 24 },
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
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    alignItems: "flex-start",
  },
  title: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
});

export default LineStats;
