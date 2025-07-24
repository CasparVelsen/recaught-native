import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";

const ChartTooltip = ({ point, type }) => {
  if (!point) return null;

  const [x, y] = point;

  // Einheit auswählen je nach type
  let unitX = ""; // Beispiel Einheit für x (Zeit, Stunde?)
  let unitY = "Fische";

  switch (type) {
    case "temperature":
    case "watertemp":
      unitX = "°C";
      break;
    case "windspeed":
      unitX = "km/h";
      break;
    case "airpressure":
      unitX = "hPa";
      break;
    default:
      unitX = "";
  }

  return (
    <View style={styles.container}>
      <Text style={[Typography.body, styles.text]}>
        {Math.round(x)} {unitX}
      </Text>
      <Text style={[Typography.body, styles.text]}>
        {Math.round(y)} {unitY}
      </Text>
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
