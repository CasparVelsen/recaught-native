import React, { useMemo, useState } from "react";
import { View, Text } from "react-native";
import {
  Canvas,
  Path,
  Text as SkiaText,
  useFont,
  Skia,
  vec,
  TileMode,
} from "@shopify/react-native-skia";

import fontFile from "../../../assets/fonts/Inter-Variable.ttf";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";

const BAR_HEIGHT = 30;
const GAP = 15;
const LABEL_WIDTH = 120;
const PADDING_HORIZONTAL = 16;
const BASE_HEIGHT = 20; // optionaler Puffer oben/unten

const SkiaBarChart = ({ data, label }) => {
  const [containerWidth, setContainerWidth] = useState(0);

  // Sortiere die Daten nach fishes absteigend
  const sortedData = useMemo(() => {
    if (!Array.isArray(data)) return [];
    return [...data].sort((a, b) => Number(b.fishes) - Number(a.fishes));
  }, [data]);

  // Dynamische Höhe basierend auf Anzahl Balken
  const chartHeight =
    sortedData && Array.isArray(sortedData)
      ? sortedData.length * (BAR_HEIGHT + GAP) - GAP + BASE_HEIGHT
      : 250;

  const MAX_BAR_WIDTH = containerWidth ? containerWidth - LABEL_WIDTH - 20 : 0;

  const createRoundedRectPath = (x, y, width, height, r) => {
    const path = Skia.Path.Make();
    const rect = Skia.XYWHRect(
      Number(x),
      Number(y),
      Number(width),
      Number(height)
    );
    const rrect = Skia.RRectXY(rect, Number(r), Number(r));
    path.addRRect(rrect);
    return path;
  };

  const fontNormal = useFont(fontFile, Typography.small.fontSize);

  const gradientPaint = React.useMemo(() => {
    const paint = Skia.Paint();
    paint.setShader(
      Skia.Shader.MakeLinearGradient(
        vec(LABEL_WIDTH, 0),
        vec(LABEL_WIDTH + MAX_BAR_WIDTH, 0),
        [Skia.Color(Colors.white), Skia.Color(Colors.primary)],
        [0, 1],
        TileMode.Clamp
      )
    );
    return paint;
  }, [MAX_BAR_WIDTH]);

  const paths = useMemo(() => {
    if (!Array.isArray(sortedData) || MAX_BAR_WIDTH <= 0) return [];
    const maxFishes = Math.max(...sortedData.map((d) => Number(d.fishes)), 1);
    return sortedData.map(({ fishes }, i) => {
      const fishesNum = Number(fishes);
      const barWidthRaw = (fishesNum / maxFishes) * MAX_BAR_WIDTH;
      const barWidth = barWidthRaw > 0 ? barWidthRaw : 0;
      const y = i * (BAR_HEIGHT + GAP);

      if (barWidth === 0) return null;

      return {
        shadowPath: createRoundedRectPath(
          LABEL_WIDTH,
          y + 2,
          barWidth,
          BAR_HEIGHT,
          8
        ),
        barPath: createRoundedRectPath(LABEL_WIDTH, y, barWidth, BAR_HEIGHT, 8),
      };
    });
  }, [sortedData, MAX_BAR_WIDTH]);

  if (!fontNormal) return <Text>Loading font...</Text>;

  if (!Array.isArray(sortedData) || sortedData.length === 0) {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {label}
        </Text>
        <Text>Keine Daten zum Anzeigen</Text>
      </View>
    );
  }

  const textColor = Colors.primary;
  const fishCountColor = Colors.accent;

  return (
    <View
      style={{
        marginVertical: 20,
        marginLeft: 16,
        width: "100%",
      }}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setContainerWidth(width - PADDING_HORIZONTAL * 2);
      }}
    >
      {containerWidth > 0 && (
        <Canvas
          style={{
            width: containerWidth + PADDING_HORIZONTAL * 2,
            height: chartHeight,
          }}
        >
          {sortedData.map(({ name, fishes }, i) => {
            if (!paths[i]) return null;
            const { shadowPath, barPath } = paths[i];
            const maxFishes = Math.max(
              ...sortedData.map((d) => Number(d.fishes)),
              1
            );
            const fishesNum = Number(fishes);
            const barWidthRaw = (fishesNum / maxFishes) * MAX_BAR_WIDTH;
            const barWidth = barWidthRaw > 0 ? barWidthRaw : 0;
            const y = i * (BAR_HEIGHT + GAP);

            return (
              <React.Fragment key={`${name}-${i}`}>
                <Path path={shadowPath} color="rgba(0,0,0,0.1)" />
                <Path path={barPath} paint={gradientPaint} />
                <SkiaText
                  x={0}
                  y={y + BAR_HEIGHT * 0.75}
                  text={name}
                  font={fontNormal}
                  color={textColor}
                />
                <SkiaText
                  x={LABEL_WIDTH + barWidth + 5}
                  y={y + BAR_HEIGHT * 0.75}
                  text={`${fishes}`}
                  font={fontNormal}
                  color={fishCountColor}
                />
              </React.Fragment>
            );
          })}
        </Canvas>
      )}
    </View>
  );
};

export default SkiaBarChart;
