// components/Filters.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedDropdown } from "../../animations/AnimatedDropdown";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";

export function TimeFilter({ profileCards, selectedYear, onChangeYear }) {
  const [modalVisible, setModalVisible] = useState(false);

  const allYears = [
    ...new Set(
      profileCards
        ?.map((entry) => new Date(entry.date).getFullYear().toString())
        .filter(Boolean)
    ),
  ].sort((a, b) => b - a);

  return (
    <View style={styles.filterWrapper}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.filterText, { color: "#ff9c27" }]}>
          {selectedYear || "Zeitraum"}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#ff9c27" />
      </TouchableOpacity>

      <AnimatedDropdown
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={["", ...allYears]}
        onSelect={onChangeYear}
        selectedValue={selectedYear}
        labelFallback="Gesamtzeit"
      />
    </View>
  );
}

export function WaterFilter({
  filteredCardsByTime,
  selectedWater,
  onChangeWater,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const waterOptions = [
    ...new Set(
      filteredCardsByTime?.map((entry) => entry.water).filter(Boolean)
    ),
  ];

  return (
    <View style={styles.filterWrapper}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[styles.filterText, { color: "#687a48" }]}>
          {selectedWater || "Gewässer"}
        </Text>
        <Ionicons name="chevron-down" size={24} color="#687a48" />
      </TouchableOpacity>

      <AnimatedDropdown
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={["", ...waterOptions]}
        onSelect={onChangeWater}
        selectedValue={selectedWater}
        labelFallback="Alle Gewässer"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  filterWrapper: {
    width: "100%",
    alignItems: "flex-end",
    paddingVertical: 5,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  filterText: {
    ...Typography.h3,
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    maxHeight: "60%",
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});
