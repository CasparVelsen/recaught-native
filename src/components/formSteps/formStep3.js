// components/formSteps/formStep3.js
import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Colors from "../../../assets/colors/Colors";
import Typography from "../../../assets/fonts/Typography";
import { selectionOptions } from "../../utils/selectionOptions";
import InputPicker from "../InputPicker";

export default function Step3({ data, onChange }) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Gewässerzustand:</Text>

      {/* Strecke + Wassertemperatur */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Gewässerabschnitt</Text>
        <TextInput
          style={styles.input}
          value={data.stretch || ""}
          onChangeText={(v) => onChange({ stretch: v })}
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wassertemperatur</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={String(data.watertemp || "")}
          onChangeText={(v) =>
            onChange({ watertemp: Number(v.replace(",", ".")) })
          }
          placeholder="°C"
        />
      </View>

      {/* Wasserfarbe */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wasserfarbe</Text>
        <InputPicker
          value={data.watercolor}
          onChange={(v) => onChange({ watercolor: v })}
          options={selectionOptions.watercolor}
          placeholder="Wasserfarbe auswählen"
        />
      </View>

      {/* Wasserstand */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Wasserstand</Text>
        <InputPicker
          value={data.waterlevel}
          onChange={(v) => onChange({ waterlevel: v })}
          options={selectionOptions.waterlevel}
          placeholder="Wasserstand auswählen"
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
    ...Typography.h2,
    color: Colors.primary,
    marginBottom: 26,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  inputGroup: {
    flex: 1,
    marginBottom: 20,
  },
  label: {
    ...Typography.body,
    color: Colors.primary,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    color: "#bbb",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    fontSize: 14,
  },
});
