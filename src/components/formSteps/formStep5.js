import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { translateValue } from "../../../assets/language/translatedValue";

export default function Step5({ data }) {
  const renderTile = (label, value, key) => {
    if (value === null || value === "" || value === undefined) return null;

    const translatedValue = key ? translateValue(key, value) : value;

    return (
      <View style={styles.tile}>
        <Text style={styles.tileValue}>{translatedValue?.toString()}</Text>
        <Text style={styles.tileLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.wrapper}>
      <Text style={styles.title}>Zusammenfassung</Text>

      {/* Gewässerdaten */}
      {(data.watertemp || data.watercolor || data.waterlevel) && (
        <View style={styles.tileGroup}>
          <Text style={styles.tileGroupTitle}>Gewässerdaten</Text>
          <View style={styles.tilesRow}>
            {renderTile("Wassertemp.", data.watertemp, "watertemp")}
            {renderTile("Wasserfarbe", data.watercolor, "watercolor")}
            {renderTile("Wasserstand", data.waterlevel, "waterlevel")}
          </View>
        </View>
      )}

      {/* Wetterdaten */}
      {(data.weather ||
        data.airpressure ||
        data.temperature ||
        data.moon ||
        data.wind ||
        data.windspeed) && (
        <View style={styles.tileGroup}>
          <Text style={styles.tileGroupTitle}>Wetterdaten</Text>
          <View style={styles.tilesRow}>
            {renderTile("Wetter", data.weather, "weather")}
            {renderTile("Luftdruck", data.airpressure, "airpressure")}
            {renderTile("Temperatur", data.temperature, "temperature")}
            {renderTile("Mondphase", data.moon, "moon")}
            {renderTile("Windrichtung", data.wind, "wind")}
            {renderTile("Windgeschw.", data.windspeed, "windspeed")}
          </View>
        </View>
      )}

      {/* Fangstatistik */}
      <View style={styles.tileGroup}>
        <Text style={styles.tileGroupTitle}>Fangstatistik</Text>
        {data.catches?.map((item, index) => (
          <View key={index} style={styles.catchBox}>
            <View style={styles.catchWrapper}>
              <Text style={styles.catchTitle}>
                {index + 1}. {item.species}
              </Text>
              <Text style={styles.catchLength}>{item.length} cm</Text>
              <Text style={styles.catchStatus}>
                {item.taken ? "entnommen" : "released"}
              </Text>
            </View>
          </View>
        ))}

        <Field label="gefangen" value={data.catches?.length} />
        <Field label="verloren" value={data.lost} />
        <Field label="Bisse" value={data.bites} />
      </View>
    </ScrollView>
  );
}

const Field = ({ label, value }) => {
  if (!value && value !== 0) return null;

  return (
    <View style={styles.dataRow}>
      <Text style={styles.label}>{label}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 26,
  },
  tileGroup: {
    marginBottom: 6,
  },
  tileGroupTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 8,
  },
  tilesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tile: {
    width: "30%",
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6,
    marginBottom: 12,
  },
  tileValue: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 4,
    textAlign: "center",
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.secondary,
    textAlign: "center",
  },
  catchBox: {
    padding: 10,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  catchWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  catchTitle: {
    color: Colors.primary,
    ...Typography.body,
    width: "30%",
  },
  catchLength: {
    color: Colors.secondary,
    ...Typography.body,
  },
  catchStatus: {
    ...Typography.caption,
    color: Colors.gray,
    width: "30%",
    textAlign: "right",
  },
  dataRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "30%",
    ...Typography.body,
    color: Colors.primary,
  },
  value: {
    color: Colors.secondary,
    ...Typography.body,
  },
});
