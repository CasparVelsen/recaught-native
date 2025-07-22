import { SafeAreaView, StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import Colors from "../../assets/colors/Colors";
import Typography from "../../assets/fonts/Typography";

const HomeScreen = ({ cards, profile }) => {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.water}</Text>
      <Text style={styles.details}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
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
            <Text style={styles.empty}>
              Du hast noch keine Einträge erstellt.
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
  header: {
    ...Typography.h2,
    marginBottom: 16,
    color: Colors.primary,
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
