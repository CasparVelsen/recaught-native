import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import DatePickerInput from "../DatePickerInput";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";

export default function Step1({ data, onChange }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Allgemeine Informationen:</Text>

      <View style={styles.fieldRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Datum</Text>
          <DatePickerInput
            value={data.date}
            onChange={(v) => onChange({ date: v })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gewässer</Text>
          <TextInput
            style={styles.input}
            value={data.water}
            onChangeText={(v) => onChange({ water: v })}
            maxLength={25}
            placeholder="Name des Gewässers"
          />
        </View>
      </View>

      <View style={[styles.inputGroup, styles.fullWidth]}>
        <Text style={styles.label}>Zielfisch</Text>
        <TextInput
          style={styles.input}
          value={data.target}
          onChangeText={(v) => onChange({ target: v })}
          maxLength={25}
          placeholder="Zielart"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    ...Typography.subtitle,
    color: Colors.primary,
    marginBottom: 20,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 20,
  },
  inputGroup: {
    flex: 1,
    flexDirection: "column",
  },
  fullWidth: {
    marginTop: 20,
  },
  label: {
    fontSize: 14,
    color: "#444",
    marginBottom: 6,
  },
  hint: {
    fontSize: 12,
    color: "#aaa",
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.accent,
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 6,
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
  },
});
