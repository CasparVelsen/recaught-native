import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AnimatedDropdown } from "../../animations/AnimatedDropdown";
import Typography from "../../../assets/fonts/Typography";
import Colors from "../../../assets/colors/Colors";

export function SpeciesFilter({
  allCatches,
  selectedSpecies,
  onChangeSpecies,
}) {
  const [modalVisible, setModalVisible] = useState(false);

  const allSpecies = useMemo(() => {
    return [
      ...new Set(
        allCatches
          .map((c) => c.species)
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b))
      ),
    ];
  }, [allCatches]);

  return (
    <TouchableOpacity
      style={[styles.sortSelector, selectedSpecies && styles.activeSort]}
      onPress={() => setModalVisible(true)}
    >
      <Text style={styles.sortText}>{selectedSpecies || "Art"}</Text>

      <AnimatedDropdown
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        options={["", ...allSpecies]}
        onSelect={onChangeSpecies}
        selectedValue={selectedSpecies}
        labelFallback="Alle Arten"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sortSelector: {
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  activeSort: {
    borderColor: Colors.primary,
  },
  sortText: {
    ...Typography.small,
    color: Colors.primary,
    flexShrink: 1,
  },
});
