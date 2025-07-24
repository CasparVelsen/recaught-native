import React, { useState, useMemo, useCallback } from "react";
import { SafeAreaView, StyleSheet, View, Text, ScrollView } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { TimeFilter, WaterFilter } from "../components/filter/CardsFilters";
import AirPressure from "../components/stats/AirPressure";
import { getEnvironmentStats } from "../utils/stats";

const API_BASE_URL = "http://10.116.131.241:3000";

const StatsScreen = ({ token, profile }) => {
  const [cards, setCards] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWater, setSelectedWater] = useState("");
  const [stats, setStats] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const fetchCards = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/cards`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          if (res.ok) {
            setCards(data);
            setStats(getEnvironmentStats(data));
          } else {
            console.error("Fehler beim Laden:", data);
          }
        } catch (err) {
          console.error("Netzwerkfehler:", err);
        }
      };

      fetchCards();
    }, [token])
  );

  const filteredCards = useMemo(() => {
    return cards.filter((entry) => {
      const yearMatch =
        !selectedYear ||
        new Date(entry.date).getFullYear().toString() === selectedYear;
      const waterMatch = !selectedWater || entry.water === selectedWater;
      return yearMatch && waterMatch;
    });
  }, [cards, selectedYear, selectedWater]);

  const allCatches = useMemo(() => {
    return filteredCards.flatMap((card) => card.catches || []);
  }, [filteredCards]);

  const speciesStats = useMemo(() => {
    const map = {};
    allCatches.forEach((c) => {
      if (!c.species) return;
      map[c.species] = (map[c.species] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]); // meistgefangen oben
  }, [allCatches]);

  const baitStats = useMemo(() => {
    const map = {};
    allCatches.forEach((c) => {
      if (!c.bait) return;
      map[c.bait] = (map[c.bait] || 0) + 1;
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]);
  }, [allCatches]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerBlock}>
        <View>
          <Text style={styles.welcome}>Tight lines,</Text>
          <Text style={styles.header}>
            {profile?.firstname || profile?.username || "User"}
          </Text>
        </View>
        <View style={styles.filterGroup}>
          <TimeFilter
            profileCards={cards}
            selectedYear={selectedYear}
            onChangeYear={setSelectedYear}
          />
          <WaterFilter
            filteredCardsByTime={filteredCards}
            selectedWater={selectedWater}
            onChangeWater={setSelectedWater}
          />
        </View>
      </View>

      {stats && <AirPressure airpressureStats={stats.airpressure} />}

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Fänge nach Art</Text>
          {speciesStats.length > 0 ? (
            speciesStats.map(([species, count]) => (
              <Text key={species} style={styles.statItem}>
                {species}: {count}
              </Text>
            ))
          ) : (
            <Text style={styles.empty}>Keine Daten verfügbar.</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Top-Köder</Text>
          {baitStats.length > 0 ? (
            baitStats.map(([bait, count]) => (
              <Text key={bait} style={styles.statItem}>
                {bait}: {count}
              </Text>
            ))
          ) : (
            <Text style={styles.empty}>Keine Daten verfügbar.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StatsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerBlock: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
    alignItems: "flex-end",
  },
  welcome: {
    ...Typography.subtitle,
    color: Colors.primary,
  },
  header: {
    ...Typography.h1,
    color: Colors.primary,
    flexShrink: 1,
  },
  filterGroup: {
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 10,
  },
  statItem: {
    ...Typography.body,
    color: Colors.secondary,
    marginBottom: 6,
  },
  empty: {
    fontStyle: "italic",
    color: "#888",
  },
});
