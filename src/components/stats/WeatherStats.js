import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";
import SkiaLineChart from "../charts/LineChartSkia";
import ChartTooltip from "../charts/ChartToolTip";

const WeatherStats = ({ stats }) => {
  const [hoverPoint, setHoverPoint] = useState(null);

  // Memoisierte Callback-Funktion
  const handlePointChange = useCallback((point) => {
    setHoverPoint(point);
  }, []);

  const airpressureStats = stats.airpressure;

  return (
    <View style={styles.container}>
      <View style={styles.headerWrapper}>
        <Text style={styles.title}>Luftdruck</Text>
        <ChartTooltip point={hoverPoint} />
      </View>

      <SkiaLineChart
        data={airpressureStats}
        onPointChange={handlePointChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  title: {
    ...Typography.h3,
    color: Colors.primary,
  },
  empty: {
    ...Typography.small,
    color: Colors.secondary,
  },
});

export default WeatherStats;
