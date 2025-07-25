import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

const CardItem = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CardDetails", { card: data });
  };

  // Sortiere die Catches nach Länge absteigend
  const sortedCatches = (data.catches || [])
    .slice()
    .sort((a, b) => b.length - a.length);

  const largestCatch = sortedCatches[0];
  const hasMultiple = sortedCatches.length > 1;
  const catchCount = sortedCatches.length;

  return (
    <TouchableOpacity onPress={handlePress} style={styles.card}>
      <View style={styles.header}>
        {/* Left: Date */}
        <View style={styles.date}>
          <Text style={styles.day}>{data.date.slice(8, 10)}</Text>
          <Text style={styles.month}>{data.date.slice(5, 7)}</Text>
        </View>

        {/* Middle: Infos */}
        <View style={styles.info}>
          <View style={styles.iconRow}>
            <Text style={styles.iconText}>{data.water}</Text>
          </View>

          {/* Catches: Anzahl + größter Fisch + Fish-Icon + ...-Tile falls mehrere */}
          <View style={styles.catchContainer}>
            {largestCatch ? (
              <>
                {/* Anzahl der Fische */}
                <Ionicons
                  name="fish-outline"
                  size={18}
                  color={Colors.accent}
                  style={styles.fishIcon}
                />
                <Text style={styles.countText}>{catchCount}</Text>
                {/* Größter Fisch */}
                <View style={styles.catchTile}>
                  <Text style={styles.catchText}>
                    {largestCatch.species}
                    {largestCatch.length && ", " + largestCatch.length + "cm"} 
                  </Text>
                </View>
                {/* Overflow-Indikator */}
                {hasMultiple && (
                  <View style={styles.catchTile}>
                    <Text style={styles.catchText}>…</Text>
                  </View>
                )}
              </>
            ) : (
              <View style={styles.catchTile}>
                <Text style={styles.catchText}>Keine Fänge</Text>
              </View>
            )}
          </View>
        </View>

        {/* Right: Year + Arrow */}
        <View style={styles.rightSection}>
          <Text style={styles.yearText}>{data.date.slice(0, 4)}</Text>
          <Ionicons name="chevron-forward" size={20} color={Colors.accent} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: "#fff",
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow (Android)
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "stretch",
  },
  // Linke Spalte: Datum
  date: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary,
    width: "25%",
    alignSelf: "stretch",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  day: {
    ...Typography.h1,
    color: "#fff",
  },
  month: {
    ...Typography.subtitle,
    color: "#fff",
  },

  // Mitte: Infos
  info: {
    paddingVertical: 14,
    flex: 1,
    justifyContent: "flex-start",
    marginLeft: 14,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  iconText: {
    color: Colors.primary,
    ...Typography.subtitle,
  },

  // Container für die Anzahl & den größten Fisch + ...-Tile
  catchContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    overflow: "hidden",
  },
  countText: {
    ...Typography.body,
    color: Colors.accent,
    marginRight: 8,
  },
  catchTile: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  fishIcon: {},
  catchText: {
    ...Typography.caption,
    color: Colors.secondary,
  },

  // Rechte Spalte: Jahr + Pfeil
  rightSection: {
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 14,
    paddingVertical: 14,
    width: "15%",
  },
  yearText: {
    color: Colors.primary,
    ...Typography.body,
  },
});
