import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";

const FormScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View>
        <Text>FormScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default FormScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
