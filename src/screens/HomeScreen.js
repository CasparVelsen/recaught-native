import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useMemo } from "react";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";
import { TimeFilter, WaterFilter } from "../components/filter/CardsFilters";
import CardItem from "../components/CardItem";

const HomeScreen = ({ cards = [], profile }) => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedWater, setSelectedWater] = useState("");

  const filteredByYear = useMemo(() => {
    return cards.filter((entry) => {
      return (
        !selectedYear ||
        new Date(entry.date).getFullYear().toString() === selectedYear
      );
    });
  }, [cards, selectedYear]);

  const filteredCards = useMemo(() => {
    return cards.filter((entry) => {
      const yearMatch =
        !selectedYear ||
        new Date(entry.date).getFullYear().toString() === selectedYear;

      const waterMatch = !selectedWater || entry.water === selectedWater;

      return yearMatch && waterMatch;
    });
  }, [cards, selectedYear, selectedWater]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.water}</Text>
      <Text style={styles.details}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <View>
            <Text style={styles.welcome}>Willkommen</Text>
            <Text style={styles.header}>
              {profile?.firstname || profile?.username || "User"}!
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
    backgroundColor: "#fff",
  },
  headerBlock: {
    marginBottom: 16,
    flexDirection: "row",
  },

  welcome: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 4,
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
    backgroundColor: "#f0f0f0",
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
