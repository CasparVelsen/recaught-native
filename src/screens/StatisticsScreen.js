import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const StatisticsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>StatisticsScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default StatisticsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
