import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";

const HomeScreen = ({ cards, profile }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.water}</Text>
      <Text style={styles.details}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        Willkommen, {profile?.firstname || profile?.username || "User"}!
      </Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>Keine Karten vorhanden.</Text>
        }
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
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
    fontSize: 16,
    fontWeight: "bold",
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
