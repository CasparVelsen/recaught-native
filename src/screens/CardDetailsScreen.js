import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { translateValue } from "../../assets/language/translatedValue";

const CardDetailsScreen = ({ route, navigation }) => {
  const { card } = route.params;
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("de-DE", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(date);
  };

  const renderTile = (label, value, key) => {
    if (!value && value !== 0) return null;
    const translatedValue = key ? translateValue(key, value) : value;

    return (
      <View style={styles.tile}>
        <Text style={styles.tileValue}>{translatedValue}</Text>
        <Text style={styles.tileLabel}>{label}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.accent} />
        </TouchableOpacity>
        <Text style={styles.info}>Erfahrungsbericht vom:</Text>
        <View style={styles.dayWrapper}>
          <Text style={styles.header}>{formatDate(card.date)}</Text>
          <View style={styles.waterWrapper}>
            <Text style={styles.waterInfo}>{card.stretch}</Text>
            <Text style={styles.waterInfo}>{card.water}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <ScrollView
        style={styles.scrollArea}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Wetter & Wasser-Tiles */}
        <View style={styles.tilesContainer}>
          <View style={styles.tileGroup}>
            <Text style={styles.tileGroupTitle}>Gewässerdaten</Text>
            <View style={styles.tilesRow}>
              {renderTile(
                "Wassertemp.",
                card.watertemp && `${card.watertemp} °C`
              )}
              {renderTile("Wasserfarbe", card.watercolor, "watercolor")}
              {renderTile("Wasserstand", card.waterlevel, "waterlevel")}
            </View>
          </View>
          <View style={styles.tileGroup}>
            <Text style={styles.tileGroupTitle}>Wetterdaten</Text>
            <View style={styles.tilesRow}>
              {renderTile("Wetter", card.weather, "weather")}
              {renderTile(
                "Luftdruck",
                card.airpressure && `${card.airpressure} hPa`
              )}
              {renderTile(
                "Temperatur",
                card.temperature && `${card.temperature} °C`
              )}
              {renderTile("Mondphase", card.moon, "moon")}
              {renderTile("Windrichtung", card.wind, "wind")}
              {renderTile(
                "Windgeschw.",
                card.windspeed && `${card.windspeed} km/h`
              )}
            </View>
          </View>
        </View>

        {/* Fänge */}
        <View style={styles.section}>
          <Text style={styles.tileGroupTitle}>Fangstatistik</Text>
          {card.catches?.length > 0 ? (
            card.catches.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => toggleExpand(index)}
                style={styles.catchBox}
              >
                <View style={styles.catchWrapper}>
                  <Text style={styles.catchTitle}>
                    {index + 1}. {item.species}
                  </Text>
                  <Text style={styles.catchLength}>{item.length} cm</Text>
                  <Text style={styles.catchStatus}>
                    {item.taken ? "entnommen" : "released"}
                  </Text>
                </View>
                {expandedIndex === index && (
                  <View style={styles.catchExpanded}>
                    <Field label="Uhrzeit" value={item.time} small />
                    <Field
                      label="Gewicht"
                      value={
                        item.weight !== undefined
                          ? `${item.weight} kg`
                          : undefined
                      }
                      small
                    />
                    <Field label="Köder" value={item.bait} small />
                    <Field label="Fangplatz" value={item.location} small />
                    <Field label="Notizen" value={item.notes} small />
                  </View>
                )}
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noCatches}>Keine Fänge</Text>
          )}
          <Field label="gefangen" value={card.catches.length} />
          <Field label="verloren" value={card.lost} />
          <Field label="Bisse" value={card.bites} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CardDetailsScreen;

// ---------- Sub-Komponenten ----------

const Field = ({ label, value, small }) => {
  if (!value && value !== 0) return null;
  return (
    <View style={styles.dataRow}>
      <Text style={[styles.label, small && styles.smallText]}>{label}:</Text>
      <Text style={[styles.value, small && styles.smallText]}>{value}</Text>
    </View>
  );
};

// ---------- Styles ----------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 16,
    backgroundColor: Colors.white,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  backButton: {
    marginBottom: 8,
  },
  info: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
  header: {
    ...Typography.h1,
    color: Colors.primary,
  },
  dayWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    gap: 5,
  },
  waterWrapper: {
    alignItems: "flex-end",
    gap: 5,
  },
  waterInfo: {
    ...Typography.body,
    color: Colors.secondary,
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  // Tile-Gruppen
  tilesContainer: {
    marginBottom: 24,
    gap: 24,
  },
  tileGroup: {},
  tileGroupTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 8,
  },
  tilesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "30%",
    borderColor: Colors.gray,
    borderWidth: 1,
    padding: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 6, // ⬅️ das ist neu
    marginBottom: 12, // optional für Abstand nach unten
  },

  tileValue: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 4,
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.secondary,
  },

  // Abschnitte
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    ...Typography.subtitle,
    color: Colors.secondary,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    paddingBottom: 4,
  },

  // Felder & Texte
  dataRow: {
    flexDirection: "row",
    marginBottom: 4,
  },
  label: {
    width: "30%",
    ...Typography.caption,
    color: Colors.primary,
  },
  value: {
    color: Colors.secondary,
    ...Typography.caption,
  },
  smallText: {
    fontSize: 13,
  },

  // Catch-Boxen
  catchBox: {
    padding: 10,
    marginBottom: 10,
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
    color: Colors.accent,
    ...Typography.body,
  },
  catchStatus: {
    ...Typography.caption,
    color: Colors.gray,
    width: "30%",
    textAlign: "right",
  },
  noCatches: {
    fontStyle: "italic",
    color: "#999",
  },
  catchExpanded: {
    marginTop: 10,
  },
});
