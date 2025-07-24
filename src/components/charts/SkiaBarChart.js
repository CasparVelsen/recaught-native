import React from "react";
import { View, Text } from "react-native";
import {
  Canvas,
  Rect,
  Text as SkiaText,
  useFont,
  Skia,
  vec,
  TileMode,
} from "@shopify/react-native-skia";

import fontFile from "../../../assets/fonts/Inter-Variable.ttf";
import Colors from "../../../assets/colors/Colors";

const WIDTH = 350;
const HEIGHT = 250;
const BAR_HEIGHT = 30;
const GAP = 15;
const LABEL_WIDTH = 120;
const MAX_BAR_WIDTH = WIDTH - LABEL_WIDTH - 20;

const SkiaBarChart = ({ data, label }) => {
  const font = useFont(fontFile, 14);

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
  }, []);

  if (!font) return <Text>Loading font...</Text>;

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          {label}
        </Text>
        <Text>Keine Daten zum Anzeigen</Text>
      </View>
    );
  }

  const maxFishes = Math.max(...data.map((d) => d.fishes), 1);
  const textColor = Colors.primary;

  return (
    <View style={{ marginVertical: 20, paddingHorizontal: 20 }}>
      <Canvas style={{ width: WIDTH, height: HEIGHT }}>
        {data.map(({ name, fishes }, i) => {
          const barWidth = (fishes / maxFishes) * MAX_BAR_WIDTH;
          const y = i * (BAR_HEIGHT + GAP);

          return (
            <React.Fragment key={name}>
              {/* Schatten */}
              <Rect
                x={LABEL_WIDTH}
                y={y + 2}
                width={barWidth}
                height={BAR_HEIGHT}
                r={8}
                color="rgba(0,0,0,0.1)"
              />
              {/* Balken mit Farbverlauf */}
              <Rect
                x={LABEL_WIDTH}
                y={y}
                width={barWidth}
                height={BAR_HEIGHT}
                r={8}
                paint={gradientPaint}
              />
              {/* Beschriftung links */}
              <SkiaText
                x={0}
                y={y + BAR_HEIGHT * 0.75}
                text={name}
                font={font}
                color={textColor}
              />
              {/* Anzahl rechts */}
              <SkiaText
                x={LABEL_WIDTH + barWidth + 5}
                y={y + BAR_HEIGHT * 0.75}
                text={`${fishes}`}
                font={font}
                color={textColor}
              />
            </React.Fragment>
          );
        })}
      </Canvas>
    </View>
  );
};

export default SkiaBarChart;
