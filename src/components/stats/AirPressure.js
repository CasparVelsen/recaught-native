import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";
import SkiaLineChart from "../charts/LineChartSkia";
import ChartTooltip from "../charts/ChartToolTip";

const AirPressure = ({ airpressureStats }) => {
  const [hoverPoint, setHoverPoint] = useState(null);

  if (!airpressureStats || airpressureStats.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fänge pro Luftdruckwert</Text>
        <Text style={styles.empty}>Keine Luftdruckdaten verfügbar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Luftdruck</Text>

      <ChartTooltip point={hoverPoint} />

      <SkiaLineChart data={airpressureStats} onPointChange={setHoverPoint} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 10,
  },
  empty: {
    fontStyle: "italic",
    color: "#888",
  },
});

export default AirPressure;
