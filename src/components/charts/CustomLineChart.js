import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";

// Interpolation & Lücken füllen
const interpolateMissing = (stats, step = 1) => {
  if (!stats || stats.length < 2) return stats;

  const parsed = stats.map(([x, y]) => [Number(x), y]);
  const sorted = [...parsed].sort((a, b) => a[0] - b[0]);
  const result = [];

  for (let i = 0; i < sorted.length - 1; i++) {
    const [x1, y1] = sorted[i];
    const [x2, y2] = sorted[i + 1];
    result.push([x1, y1]);

    for (let x = x1 + step; x < x2; x += step) {
      const t = (x - x1) / (x2 - x1);
      const y = y1 + t * (y2 - y1);
      result.push([x, y]);
    }
  }

  result.push(sorted[sorted.length - 1]);
  return result;
};

const CustomLineChart = ({
  title = "Diagramm",
  data = [],
  step = 1,
  unit = "",
  color = Colors.primary,
}) => {
  if (!data || data.length === 0) return null;

  const interpolated = interpolateMissing(data, step);
  const xValues = interpolated.map(([x]) => x);
  const yValues = interpolated.map(([, y]) => y);

  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const valueMap = new Map(interpolated.map(([x, y]) => [x, y]));

  const labels = [];
  const values = [];

  for (let x = minX; x <= maxX; x += step) {
    labels.push(x % 5 === 0 ? x.toString() : "");
    values.push(valueMap.has(x) ? valueMap.get(x) : null);
  }

  const estimateYAxisWidth = Math.max(...yValues).toString().length * 30 + 10;

  return (
    <View style={styles.wrapper}>
      <LineChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={Dimensions.get("window").width - 40}
        height={220}
        fromZero
        withVerticalLines
        withHorizontalLines={false}
        segments={3}
        yLabelsOffset={10}
        bezier
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: () => color,
          labelColor: () => color,
          propsForBackgroundLines: {
            stroke: "rgba(0,0,0,0.05)",
          },
          propsForLabels: {
            fontSize: Typography.small.fontSize,
            fontWeight: Typography.small.fontWeight,
          },
        }}
        style={{
          borderRadius: 8,
          marginLeft: -estimateYAxisWidth,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
});

export default CustomLineChart;
