import React, { useState, useCallback } from "react";
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

  const handlePointChange = useCallback((point) => {
    setHoverPoint(point);
  }, []);

  const data = stats?.[selectedKey] ?? [];
  const selectedLabel =
    OPTIONS.find((opt) => opt.key === selectedKey)?.label || "";

  return (
    <View style={styles.container}>
      {/* Options als ScrollView mit runden Buttons */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.optionsContainer}
      >
        {OPTIONS.map((option) => {
          const selected = option.key === selectedKey;
          return (
            <TouchableOpacity
              key={option.key}
              style={[
                styles.optionButton,
                selected && styles.optionButtonSelected,
              ]}
              onPress={() => {
                setSelectedKey(option.key);
                setHoverPoint(null);
              }}
            >
              <Text
                style={[
                  styles.optionText,
                  selected && styles.optionTextSelected,
                ]}
              >
                {option.label}
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
