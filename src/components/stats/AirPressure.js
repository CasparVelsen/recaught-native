// Beispiel: Verwendung in deiner AirPressure-Komponente
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";
import CustomLineChart from "../charts/CustomLineChart";

const AirPressure = ({ airpressureStats }) => {
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
      <CustomLineChart
        title="Luftdruck"
        data={airpressureStats}
        step={1}
        unit="hPa"
        color={Colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
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
