// components/charts/ChartTooltip.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";

const ChartTooltip = ({ point }) => {
  if (!point) return null;

  const [x, y] = point;

  return (
    <View style={styles.container}>
      <Text style={[Typography.body, styles.text]}>{Math.round(x)} hPa</Text>
      <Text style={[Typography.body, styles.text]}>{Math.round(y)} Fänge</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    gap: 4,
  },
  text: {
    color: Colors.accent,
    ...Typography.subtitle,
  },
});

export default ChartTooltip;
