import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

const CardItem = ({ data }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CardDetails", { card: data });
  };

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
            <MaterialIcons name="water" size={20} color={Colors.primary} />
            <Text style={styles.iconText}>{data.water}</Text>
          </View>
          <View style={styles.iconRow}>
            <MaterialCommunityIcons
              name="target"
              size={20}
              color={Colors.primary}
            />
            <Text style={styles.iconText}>{data.target}</Text>
          </View>
          <View style={styles.iconRow}>
            <Ionicons name="fish-outline" size={20} color={Colors.primary} />
            <Text style={styles.iconText}>
              {data.catches?.length ? data.catches.length : 0}
            </Text>
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

// ➕ (styles bleiben wie oben, einfach so lassen)

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginTop: 16,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },

  header: {
    flexDirection: "row",
    alignItems: "stretch", // Wichtig: alle Spalten gleich hoch!
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  // Linke Spalte: Datum
  date: {
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: Colors.primary,
    paddingHorizontal: 10,
    paddingRight: 20,
    alignSelf: "stretch",
    width: "25%",
  },
  day: {
    ...Typography.h1,
    color: Colors.primary,
  },
  month: {
    ...Typography.subtitle,
    color: Colors.primary,
  },

  // Mitte: Infos
  info: {
    flex: 1,
    justifyContent: "space-between",
    gap: 5,
    marginLeft: 20,
  },
  iconRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconText: {
    marginLeft: 6,
    color: Colors.secondary,
    ...Typography.body,
  },

  // Rechte Spalte: Jahr oben, Pfeil unten
  rightSection: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  yearText: {
    color: Colors.primary,
    ...Typography.body,
  },

  // Details-Bereich
  details: {
    marginTop: 10,
  },
  detailTitle: {
    ...Typography.subtitle,
    marginBottom: 6,
    color: Colors.primary,
  },
  catchBox: {
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.secondary,
    marginRight: 8,
    width: 250,
  },
  catchText: {
    color: Colors.accent,
    fontWeight: "bold",
    marginBottom: 2,
  },
  catchSub: {
    fontSize: 12,
    color: "#888",
    marginBottom: 4,
  },
  catchDetail: {
    fontSize: 13,
    color: "#444",
  },
  noCatches: {
    fontStyle: "italic",
    color: "#999",
  },
});
