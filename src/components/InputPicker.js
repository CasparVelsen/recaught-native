import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { AnimatedDropdown } from "../animations/AnimatedDropdown";
import Colors from "../../assets/colors/Colors";

export default function InputPicker({ value, onChange, options = [], placeholder = "Ausw\u00e4hlen" }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable style={styles.input} onPress={() => setVisible(true)}>
        <Text style={styles.inputText}>{value || placeholder}</Text>
      </Pressable>
      <AnimatedDropdown
        visible={visible}
        onClose={() => setVisible(false)}
        options={options}
        onSelect={onChange}
        selectedValue={value}
        labelFallback={placeholder}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: Colors.gray,
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  inputText: {
    color: "#bbb",
  },
});
