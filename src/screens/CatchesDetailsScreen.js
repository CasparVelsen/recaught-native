import React, { useState, useMemo } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { SpeciesFilter } from "../components/filter/SpeciesFilter";

const CatchesDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { cards } = route.params || {};

  const allCatches = useMemo(() => {
    if (!cards) return [];
    return cards.flatMap((card) =>
      (card.catches || []).map((catchItem) => ({
        ...catchItem,
        water: card.water,
        date: card.date,
      }))
    );
  }, [cards]);

  const [selectedSpecies, setSelectedSpecies] = useState("");
  const [sortBy, setSortBy] = useState(null); // 'length' | 'weight'
  const [sortOrder, setSortOrder] = useState("desc"); // 'asc' | 'desc'

  const filteredCatches = useMemo(() => {
    let result = allCatches.filter((c) => {
      return (
        selectedSpecies === "" ||
        c.species?.toLowerCase() === selectedSpecies.toLowerCase()
      );
    });

    if (sortBy) {
      result = result.sort((a, b) => {
        const valueA = a[sortBy] ?? 0;
        const valueB = b[sortBy] ?? 0;
        return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
      });
    }

    return result;
  }, [allCatches, selectedSpecies, sortBy, sortOrder]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2); // Monate sind 0-basiert
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.accent} />
        </TouchableOpacity>
        <View>
          <Text style={styles.info}>Trophyboard</Text>
          <Text style={styles.header}>Fangübersicht:</Text>
        </View>
        {/* SORTIERUNG */}
        <View style={styles.sortButtonRow}>
          <SpeciesFilter
            allCatches={allCatches}
            selectedSpecies={selectedSpecies}
            onChangeSpecies={setSelectedSpecies}
          />
          <TouchableOpacity
            style={[
              styles.sortSelector,
              sortBy === "length" && styles.activeSort,
            ]}
            onPress={() => setSortBy("length")}
          >
            <Text style={styles.sortText}>Länge</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.sortSelector,
              sortBy === "weight" && styles.activeSort,
            ]}
            onPress={() => setSortBy("weight")}
          >
            <Text style={styles.sortText}>Gewicht</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.sortDirection}
            onPress={() =>
              setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            <Ionicons
              name={sortOrder === "asc" ? "arrow-up" : "arrow-down"}
              size={20}
              color={Colors.primary}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTE DER FÄNGE */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filteredCatches.length === 0 ? (
          <Text style={styles.emptyText}>Keine Fänge gefunden.</Text>
        ) : (
          filteredCatches.map((c, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.column1}>
                {c.species && <Text style={styles.species}>{c.species}</Text>}
                {c.length && <Text style={styles.length}>{c.length} cm</Text>}
                {c.weight ? (
                  <Text style={styles.weight}>{c.weight} kg</Text>
                ) : (
                  <Text style={styles.weight}>...</Text>
                )}
              </View>
              <View style={styles.column2}>
                {c.date && (
                  <Text style={styles.date}>{formatDate(c.date)}</Text>
                )}
                {c.water && <Text style={styles.water}>{c.water}</Text>}
                {c.bait && <Text style={styles.bait}>{c.bait}</Text>}
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CatchesDetailsScreen;

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
  sortButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    gap: 8,
  },
  sortSelector: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    alignItems: "center",
  },
  activeSort: {
    borderColor: Colors.primary,
  },
  sortText: {
    ...Typography.small,
    color: Colors.primary,
  },
  sortDirection: {
    padding: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },

  card: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 16,
    padding: 12,
    marginBottom: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // Shadow (Android)
    elevation: 4,
  },
  column1: { justifyContent: "flex-start", alignItems: "flex-start", gap: 4 },
  column2: { justifyContent: "space-between", alignItems: "flex-end", gap: 4 },
  date: { color: Colors.primary, ...Typography.button },
  length: { color: Colors.accent, ...Typography.button },
  weight: { color: Colors.accent, ...Typography.button },
  water: { color: Colors.secondary, ...Typography.small },
  bait: { color: Colors.secondary, ...Typography.small },
  species: {
    ...Typography.h3,
    color: Colors.primary,
  },
  detail: {
    ...Typography.body,
    color: Colors.secondary,
    marginTop: 4,
  },
  subInfo: {
    ...Typography.caption,
    color: Colors.secondary,
    marginTop: 4,
  },
  notes: {
    ...Typography.caption,
    marginTop: 6,
    fontStyle: "italic",
    color: Colors.accent,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 32,
    color: Colors.secondary,
    fontStyle: "italic",
  },
});
