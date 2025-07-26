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
          <Text style={styles.label}>Datum *</Text>
          <DatePickerInput
            value={data.date}
            onChange={(v) => onChange({ date: v })}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Gewässer *</Text>
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
      <View style={styles.fieldRow}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Bisse insgesamt</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={data.bites?.toString() || ""}
            onChangeText={(v) => onChange({ bites: v })}
            placeholder="0"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Fische verloren</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={data.lost?.toString() || ""}
            onChangeText={(v) => onChange({ lost: v })}
            placeholder="0"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingVertical: 10,
  },
  title: {
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 26,
  },
  fieldRow: {
    flexDirection: "row",
    gap: 20,
  },
  inputGroup: {
    flex: 1,
    flexDirection: "column",
  },
  fullWidth: {},
  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    fontSize: 14,
    color: "#bbb",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
});
