import React, { useEffect, useState, useMemo } from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import {
  Canvas,
  Path,
  Skia,
  LinearGradient,
  vec,
  Circle,
} from "@shopify/react-native-skia";
import Colors from "../../../assets/colors/Colors";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";

const CHART_HEIGHT = 180;

const interpolateMissing = (data, step = 1) => {
  if (!data || data.length < 2) return data;
  const sorted = [...data].sort((a, b) => a[0] - b[0]);
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

const buildSmoothPath = (points) => {
  const path = Skia.Path.Make();
  if (points.length < 2) return path;

  path.moveTo(points[0].x, points[0].y);

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;

    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    path.cubicTo(cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
  }

  return path;
};

const buildSmoothAreaPath = (points) => {
  const path = buildSmoothPath(points);
  path.lineTo(points[points.length - 1].x, CHART_HEIGHT);
  path.lineTo(points[0].x, CHART_HEIGHT);
  path.close();
  return path;
};

const normalizeData = (data, width, height, minY, maxY) => {
  const count = data.length;
  const rangeY = maxY - minY || 1;

  const horizontalPadding = 0;
  const topPadding = 20;
  const bottomPadding = 20;

  const usableWidth = width - horizontalPadding * 2;
  const usableHeight = height - topPadding - bottomPadding;

  return data.map(([_, y], i) => ({
    x: horizontalPadding + (i / (count - 1)) * usableWidth,
    y: topPadding + usableHeight * (1 - (y - minY) / rangeY),
  }));
};

const SkiaLineChart = ({
  data = [],
  color = Colors.primary,
  step = 1,
  onPointChange,
}) => {
  if (!Array.isArray(data) || data.length === 0) return null;

  const { width: containerWidth } = useWindowDimensions();

  const interpolated = useMemo(
    () => interpolateMissing(data, step),
    [data, step]
  );
  const ys = useMemo(() => interpolated.map(([, y]) => y), [interpolated]);

  const minY = ys.length > 0 ? Math.min(...ys) : 0;
  const maxY = ys.length > 0 ? Math.max(...ys) : 0;
  const maxIndex = ys.length > 0 ? ys.indexOf(maxY) : 0;

  const points = useMemo(
    () => normalizeData(interpolated, containerWidth, CHART_HEIGHT, minY, maxY),
    [interpolated, containerWidth, minY, maxY]
  );

  const linePath = useMemo(() => buildSmoothPath(points), [points]);
  const areaPath = useMemo(() => buildSmoothAreaPath(points), [points]);

  const safeMarkerPoint = points[maxIndex] ?? { x: 0, y: 0 };

  const gestureX = useSharedValue(safeMarkerPoint.x);
  const [markerPoint, setMarkerPoint] = useState(safeMarkerPoint);

  useEffect(() => {
    if (onPointChange && interpolated.length > 0) {
      onPointChange(interpolated[maxIndex]);
    }
  }, [interpolated, maxIndex, onPointChange]);

  const updateMarker = (x) => {
    const index = Math.round((x / containerWidth) * (points.length - 1));
    if (index >= 0 && index < points.length) {
      setMarkerPoint(points[index]);
      if (onPointChange) onPointChange(interpolated[index]);
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      gestureX.value = event.x;
      runOnJS(updateMarker)(event.x);
    },
    onActive: (event) => {
      gestureX.value = event.x;
      runOnJS(updateMarker)(event.x);
    },
  });

  return (
    <View style={styles.wrapper}>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View>
          <Canvas style={styles.canvas}>
            <Path path={areaPath}>
              <LinearGradient
                start={vec(0, 0)}
                end={vec(0, CHART_HEIGHT)}
                colors={[color + "88", color + "00"]}
              />
            </Path>
            <Path
              path={linePath}
              color={color}
              style="stroke"
              strokeWidth={3}
            />
            <Circle cx={markerPoint.x} cy={markerPoint.y} r={4} color={color} />
          </Canvas>
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { width: "100%" },
  canvas: { height: CHART_HEIGHT, backgroundColor: "#fff" },
});

export default SkiaLineChart;
