import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useMemo, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { TimeFilter, WaterFilter } from "../components/filter/CardsFilters";
import CardItem from "../components/CardItem";

const API_BASE_URL = "http://10.116.131.241:3000";

const HomeScreen = ({ token, profile }) => {
  const [cards, setCards] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWater, setSelectedWater] = useState("");

  // Holt Karten beim Fokussieren des Screens
  useFocusEffect(
    useCallback(() => {
      const fetchCards = async () => {
        try {
          const res = await fetch(`${API_BASE_URL}/api/cards`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();

          if (!res.ok) {
            console.error("Fehler beim Laden der Karten:", data);
            return;
          }

          setCards(data);
        } catch (err) {
          console.error("Netzwerkfehler beim Laden der Karten:", err);
        }
      };

      fetchCards();
    }, [token])
  );

  const filteredByYear = useMemo(() => {
    return cards.filter((entry) => {
      return (
        !selectedYear ||
        new Date(entry.date).getFullYear().toString() === selectedYear
      );
    });
  }, [cards, selectedYear]);

  const filteredCards = useMemo(() => {
    return cards
      .filter((entry) => {
        const yearMatch =
          !selectedYear ||
          new Date(entry.date).getFullYear().toString() === selectedYear;
        const waterMatch = !selectedWater || entry.water === selectedWater;
        return yearMatch && waterMatch;
      })
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }, [cards, selectedYear, selectedWater]);

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
            filteredCardsByTime={filteredByYear}
            selectedWater={selectedWater}
            onChangeWater={setSelectedWater}
          />
        </View>
      </View>
      <View style={styles.container}>
        <FlatList
          data={filteredCards}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <CardItem data={item} />}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>
              Keine Einträge gefunden mit diesen Filtern.
            </Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 0,
    backgroundColor: "#fff",
  },
  headerBlock: {
    padding: 16,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    alignItems: "flex-end",
  },

  welcome: {
    ...Typography.subtitle,
    color: Colors.primary,
  },

  header: {
    ...Typography.h1,
    color: Colors.primary,
    flexShrink: 1, // erlaubt dem Text kleiner zu werden, wenn nötig
  },

  filterGroup: {
    flexDirection: "row",
    flexShrink: 1,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },

  list: {
    paddingBottom: 50,
  },
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  title: {
    ...Typography.h3,
  },
  details: {
    fontSize: 14,
    marginTop: 4,
  },
  empty: {
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
    color: "#888",
  },
});
